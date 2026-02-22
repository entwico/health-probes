import type { ProbePaths } from './types.js';

/**
 * Kubernetes-style paths with `z` suffix.
 * This is the default path style.
 */
export const K8sPaths: Required<ProbePaths> = {
  live: '/livez',
  startup: '/startupz',
  ready: '/readyz',
  health: '/healthz',
};

/**
 * Simple paths without suffix.
 */
export const SimplePaths: Required<ProbePaths> = {
  live: '/live',
  startup: '/startup',
  ready: '/ready',
  health: '/health',
};
