export const IS_JEST = !window && (process && process).env ? process.env.JEST_WORKER_ID !== undefined : false;
