/**
 * Custom path configuration for probe endpoints.
 */
export interface ProbePaths {
  live?: string | undefined;
  startup?: string | undefined;
  ready?: string | undefined;
  health?: string | undefined;
}

/**
 * Server configuration options.
 */
export interface HealthServerOptions {
  /**
   * Host to bind the health server to.
   * Falls back to `HEALTH_HOST` env var, then `'127.0.0.1'`.
   * @default '127.0.0.1'
   */
  host?: string | undefined;

  /**
   * Port to bind the health server to.
   * Falls back to `HEALTH_PORT` env var, then `9090`.
   * @default 9090
   */
  port?: number | undefined;

  /**
   * Custom paths for the probe endpoints.
   * @default K8sPaths
   */
  paths?: ProbePaths | undefined;
}

/**
 * Health check definition.
 */
export interface HealthCheck {
  /**
   * Unique name for this health check.
   */
  name: string;

  /**
   * Function that performs the health check.
   * Return HealthCheckResult or throw an error to indicate status.
   * Returning void or completing without error means healthy.
   */
  check: () => Promise<HealthCheckResult | void> | HealthCheckResult | void;

  /**
   * Whether this check is optional.
   * Optional checks don't affect the ready endpoint.
   * @default false
   */
  optional?: boolean | undefined;

  /**
   * Maximum time in ms for the check to complete.
   * @default 5000
   */
  timeout?: number | undefined;
}

/**
 * Result of a single health check.
 */
export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  latency?: number | undefined;
  error?: string | undefined;
}

/**
 * Result of a probe query.
 */
export interface HealthProbeResult {
  passing: boolean;
}

/**
 * Full health status including all checks.
 */
export interface HealthResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  probes: {
    live: boolean;
    startup: boolean;
    ready: boolean;
  };
  checks: Record<string, HealthCheckResult>;
}

/**
 * Single probe interface (live, startup, ready).
 */
export interface HealthProbe {
  /**
   * Enable this probe (will return 200 when called).
   */
  enable(): void;

  /**
   * Disable this probe (will return 503 when called).
   */
  disable(): void;

  /**
   * Get the current probe result.
   */
  get(): Promise<HealthProbeResult>;

  /**
   * Get a Response object for this probe.
   */
  response(): Promise<Response>;
}

/**
 * Health status probe interface (always returns data, used for debugging).
 */
export interface HealthStatusProbe {
  /**
   * Get the full health status.
   */
  get(): Promise<HealthResult>;

  /**
   * Get a Response object with JSON health data.
   */
  response(): Promise<Response>;
}
