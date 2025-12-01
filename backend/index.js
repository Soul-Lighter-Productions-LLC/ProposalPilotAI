/**
 * Cloudflare Worker entry point for the ProposalPilot viability scan API proxy.
 * Mirrors the MVP logic: validates the payload, forwards it to the viability
 * engine, and normalizes the response for downstream consumers.
 */
export default {
  async fetch(request, env, ctx) {
    try {
      assertMethod(request);
      const payload = await parsePayload(request);
      const viabilityResponse = await forwardToViabilityScan(payload, env, ctx);
      return respondSuccess(viabilityResponse);
    } catch (error) {
      return respondError(error);
    }
  },
};

const assertMethod = (request) => {
  if (request.method !== "POST") {
    throw new WorkerError("Only POST is supported for viability scans.", 405);
  }
};

const parsePayload = async (request) => {
  try {
    const body = await request.json();
    if (!body?.projectSummary) {
      throw new WorkerError("Missing required field: projectSummary", 400);
    }

    return {
      projectSummary: body.projectSummary,
      targetMarket: body.targetMarket ?? null,
      constraints: body.constraints ?? [],
    };
  } catch (error) {
    if (error instanceof WorkerError) throw error;
    throw new WorkerError("Invalid JSON payload.", 400, error);
  }
};

const forwardToViabilityScan = async (payload, env, ctx) => {
  const endpoint =
    env.VIABILITY_SCAN_API ??
    "https://api.proposalpilot.ai/v1/viability/scan";
  const apiKey = env.VIABILITY_SCAN_API_KEY;

  if (!apiKey) {
    throw new WorkerError(
      "Missing VIABILITY_SCAN_API_KEY binding in wrangler.toml",
      500
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await safeJson(response);
    throw new WorkerError("Viability scan request failed.", response.status, {
      endpoint,
      errorBody,
    });
  }

  return safeJson(response);
};

const respondSuccess = (data) =>
  new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

const respondError = (error) => {
  const status = error instanceof WorkerError ? error.status : 500;
  const message =
    error instanceof WorkerError ? error.message : "Internal Server Error";

  const details =
    error instanceof WorkerError && error.meta ? { meta: error.meta } : {};

  return new Response(
    JSON.stringify({
      success: false,
      message,
      ...details,
    }),
    {
      status,
      headers: { "content-type": "application/json" },
    }
  );
};

const safeJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

class WorkerError extends Error {
  constructor(message, status = 500, meta) {
    super(message);
    this.status = status;
    this.meta = meta;
  }
}

