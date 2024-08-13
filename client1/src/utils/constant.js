export const HOST= import.meta.env.VITE_SERVER_URL;

if (!HOST) {
    console.error('HOST is not defined. Check your .env file.');
  }
export const AUTH_ROUTES = 'api/auth';
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`

