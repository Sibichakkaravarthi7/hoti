export const SIGN_UP_PAGE = '/signup';
export const SIGN_UP_PAGE_WITH_CODE = '/signup/?code';
export const FORGOT_PASSWORD = '/forgot-password'
export const LOG_IN_PAGE = '/login';
export const HOME = '/';
export const SEARCH_PAGE = '/search/';
export const CREATE_CAMPAIGN = '/create-campaign'
export const COLLECTIONS_LIST_PAGE = '/collections'
export const INDIVDUAL_COLLECTION_PAGE = '/collections/:collectionId';
export const LIST_ALL_CAMPAIGNS_PAGE = '/:user_type/:id/campaigns';
export const SHARED_LIST_VIEW = '/shared-list/:listId';
export const CHAT_LIST_PAGE = '/chat';
export const INDIVIDUAL_CHAT_PAGE = '/chat/:profileId';
export const SETTINGS_PAGE = '/settings/';
export const RESET_PASSWORD = '/settings/reset-password';
export const SETTINGS_WITH_TAB = '/settings/:tab';
export const RESET_EMAIL = '/settings/reset-email';
export const PRIVACY_POLICY = '/settings/privacy-policy';
export const TERMS_AND_CONDITIONS = '/settings/terms-and-conditions';
export const HELP = '/settings/help';


export const MAKE_PROFILE_PAGE_URL = (userType: string | undefined, id: string | number | undefined) => `/${userType}/${id}`;
export const MAKE_LIST_ALL_CAMPAIGNS_PAGE = 'campaigns';
export const MAKE_INDIVDUAL_COLLECTION_PAGE = (collectionId: string | number) => `/collections/${collectionId}`;
export const MAKE_INDIVDUAL_CHAT_PAGE = (profileId: string | number) => `/chat/${profileId}`;
