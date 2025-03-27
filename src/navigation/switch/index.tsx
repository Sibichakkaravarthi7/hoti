import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import AppProfileLayout from '../../components/layout/AppProfileLayout';
import AppLayout from '../../components/layout/AppLayout';
import BrandProfile from '../../pages/brandPages/BrandProfile';
import CampaignPage from '../../pages/influencerPages/campaignPage';
import InfluencerProfile from '../../pages/influencerPages/InfluencerProfile';
import SearchPage from '../../pages/SearchPage';
import SignUp from '../../pages/sign-up';
import WelcomePage from '../../pages/welcomePage';
import { COLLECTIONS_LIST_PAGE, CREATE_CAMPAIGN, HOME, INDIVDUAL_COLLECTION_PAGE, LOG_IN_PAGE, SEARCH_PAGE, SIGN_UP_PAGE, SIGN_UP_PAGE_WITH_CODE, LIST_ALL_CAMPAIGNS_PAGE, FORGOT_PASSWORD, SHARED_LIST_VIEW, CHAT_LIST_PAGE, INDIVIDUAL_CHAT_PAGE, SETTINGS_PAGE, RESET_PASSWORD, RESET_EMAIL, PRIVACY_POLICY, TERMS_AND_CONDITIONS, HELP, SETTINGS_WITH_TAB } from '../routes/common-routes';
import {
  INFLUENCER_CAMPAIGNS_PAGE,
  BRAND_PROFILE_PAGE,
  // BRAND_DASHBOARD_PAGE,
  // BRAND_CAMPAIGNS_PAGE,
  INFLUENCER_PROFILE_PAGE,
} from '../routes/';
import CollectionsPage from '../../pages/influencerPages/collectionsPage';
import SingleCollectionPage from '../../pages/influencerPages/singleCollectionPage';
import LoginPage from '../../pages/LoginPage';
import CreateCampaignPage from '../../pages/CreateCampaignPage';
import Dashboard from '../../pages/Dashboard';
import AgencyProfile from '../../pages/agencyPages/AgencyProfile';
import { AGENCY_PROFILE_PAGE } from '../routes/agency-routes';
import getCurrentUserData from '../../api/utils/getCurrentUserData';
import getUserToken from '../../api/utils/getUserToken';
import useAppStore from '../../store';
import ForgotPassword from '../../pages/ForgotPassword';
import SharedListView from '../../pages/SharedListView';
import ChatPage from '../../pages/ChatPage';
import SettingsPage from '../../pages/SettingsPage';


function AppRouterRoutes() {
  return (
    <>

      {/* <Route path={'/'} element={<Navigate to={HOME} />} /> */}
      <Route path={'welcome'} element={<WelcomePage />} />

      <Route path={LOG_IN_PAGE} element={<LoginPage />} />
      <Route path={SIGN_UP_PAGE} element={<SignUp />} />
      <Route path={SIGN_UP_PAGE_WITH_CODE} element={<SignUp />} />
      <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={SHARED_LIST_VIEW} element={<SharedListView />} />

      <Route path={HOME} element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path={SEARCH_PAGE} element={<SearchPage />} />



        <Route path={INFLUENCER_PROFILE_PAGE} element={<InfluencerProfile />} />
        <Route path={BRAND_PROFILE_PAGE} element={<BrandProfile />} />
        <Route path={AGENCY_PROFILE_PAGE} element={<AgencyProfile />} />


        <Route path={LIST_ALL_CAMPAIGNS_PAGE} element={<CampaignPage />} />
        <Route path={COLLECTIONS_LIST_PAGE} element={<CollectionsPage />} />
        <Route path={INDIVDUAL_COLLECTION_PAGE} element={<SingleCollectionPage />} />
        <Route path={CREATE_CAMPAIGN} element={<CreateCampaignPage />} />

        <Route path={CHAT_LIST_PAGE} element={<ChatPage />} />
        <Route path={INDIVIDUAL_CHAT_PAGE} element={<ChatPage />} />
        
        <Route path={SETTINGS_PAGE} element={<SettingsPage />} />
        <Route path={SETTINGS_WITH_TAB} element={<SettingsPage />} />
        {/* <Route path={RESET_EMAIL} element={<SettingsPage />} />
        <Route path={PRIVACY_POLICY} element={<SettingsPage />} />
        <Route path={TERMS_AND_CONDITIONS} element={<SettingsPage />} />
        <Route path={HELP} element={<SettingsPage />} />  */}

      </Route>

    </>
  );
}

export default AppRouterRoutes;
