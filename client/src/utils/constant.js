 
 // Ensure the .env file contains VITE_SERVER_URL
// VITE_SERVER_URL=https://example.com

export const HOST = import.meta.env.VITE_SERVER_URL;

if (!HOST) {
  console.error('HOST is not defined. Check your .env file.');
}

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${HOST}/${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${HOST}/${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${HOST}/${AUTH_ROUTES}/user-info `
