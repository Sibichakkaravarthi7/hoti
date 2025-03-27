export const LOGIN_API = '/custom-auth/';
export const SIGNUP_API = '/users/create/';
export const SIGNUP_META = '/master/get-master-list/';
export const DASHBOARD_DATA = '/accounts/listusers';
export const GET_CURRENT_USER_DATA = '/accounts/user-detail/';
export const UPDATE_PROFILE_IMAGE = '/users/upload-image/';
export const GET_FILE_ID = '/accounts/upload-file/';
export const CREATE_CAMPAIGN_API = '/accounts/campaigns/';
export const UPDATE_PROFILE_DATA = `/accounts/user-update/`;
export const GET_LOGGEDIN_USER_CAMPAIGNS = '/accounts/campaignlist/';
export const POST_DATA_TO_SEARCH = (userType: string | null) => `/accounts/users-profile-search/${userType}/`
export const GET_SEARCH_META = (userType: string | null, text: string | null) => `accounts/users-profile-meta-search/${userType}/${text}`
export const GET_LOCATION_META = (text: string) => `/accounts/city-search/?q=${text}`;
export const GET_ALL_WISHLISTS = '/accounts/wishlist/';
export const CREATE_WISHLIST = '/accounts/createwishlist/';
export const ADD_TO_LISTS = '/accounts/wishlistitems/';
export const REMOVE_FROM_WISHLIST = '/accounts/deletewishlistitems/';
export const DELETE_WISHLIST = '/accounts/deletewishlist/';
export const RENAME_LIST = '/accounts/renamewishlist/';

export const GET_SHARE_WISHLIST = (listId: number | string) => `/accounts/wishlist-by-list-id/${listId}`;


export const GET_INSTAGRAM_ACCESS_TOKEN = 'https://api.instagram.com/oauth/access_token';

export const GET_INFLUENCER_DATA = (id: string | undefined) => `/accounts/user-detail-by-id/${id}`;
export const PROFILE_DATA = (id: string | undefined, userType: string | undefined) => `/accounts/user-${userType}-detail-by-id/${id}`;
export const GET_USERS_LIST = (userType: string) => `/accounts/get-userlist-meta-by-type/${userType}`;

export const SEND_OTP_TO_EMAIL = '/accounts/send-email-otp/';
export const VERIFY_OTP = 'accounts/verify-email-otp/';

export const FORGOT_PASSWORD_SEND_OTP = '/accounts/verify-email-send-otp/';
export const POST_OTP_AND_PASSWORD = '/accounts/verify-otp-change-password/';
export const POST_OTP_AND_EMAIL = '/accounts/verify-otp-change-email/';

export const LOGOUT = '/api/logout/';
