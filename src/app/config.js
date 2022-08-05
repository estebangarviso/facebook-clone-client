// export const BACKEND_URL = 'http://localhost:3002';
// export const TOKEN_EXPIRATION_WARN_TIME_MILISECONDS = 180000; // Watch out for this value, it's used in the frontend to warn the user about the token expiration need to be lower than server the token expiration time
// export const WS_URL = 'ws://localhost:3002';
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002';
export const TOKEN_EXPIRATION_WARN_TIME_MILISECONDS =
  process.env.REACT_APP_TOKEN_EXPIRATION_WARN_TIME_MILISECONDS || 180000;
export const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3002';
export const ENV = process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';
