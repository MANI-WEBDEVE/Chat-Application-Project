 
 // Ensure the .env file contains VITE_SERVER_URL
// VITE_SERVER_URL=https://example.com

export const HOST = import.meta.env.VITE_SERVER_URL;

if (!HOST) {
  console.error('HOST is not defined. Check your .env file.');
}

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info `
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const UPDATE_PROFILE_IMAGE = `${AUTH_ROUTES}/add-profile-image` 
export const DELETED_PROFILE_IMAGE = `${AUTH_ROUTES}/remove-profile-image` 
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout-user`
//? contact search Routes

export const CONTACT_ROUTE = "/api/contact";
export const  SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTE}/search`;
export const DM_CONTACT_LIST = `${CONTACT_ROUTE}/get-contact-dm-list`
export const GET_ALL_CONTACT_ROUTE = `${CONTACT_ROUTE}/get-all-contact`

//? Get user and reciver messages Router;
export const MESSAGES_ROUTE = 'api/messages' 
export const GET_ALL_MESSAGES =`${MESSAGES_ROUTE}/get-messages`
export const UPLOADS_FILES_ROUTES =`${MESSAGES_ROUTE}/upload-file`


// Channel Routes

export const CHANNEL_ROUTE = "api/channel";
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/create-channel`;