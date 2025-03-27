// @ts-nocheck
import React from 'react';
import AppBox from '../chakraOverrides/AppBox';
import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react';
import AppImage from '../chakraOverrides/AppImage';
import logo from '../../assets/common/logo.svg';
import AppFlex from '../chakraOverrides/AppFlex';
import {
  BoltIcon,
  ChatIcon,
  HomeIcon,
  SearchIcon,
} from '../../utils/customIcons';
import AppAvatar from '../chakraOverrides/AppAvatar';
import { appColors } from '../../theme/foundations/appColor';
import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { SEARCH_PAGE, CREATE_CAMPAIGN, LOG_IN_PAGE, COLLECTIONS_LIST_PAGE, MAKE_PROFILE_PAGE_URL, CHAT_LIST_PAGE, SETTINGS_PAGE } from '../../navigation/routes/common-routes';
import getCurrentUserData from '../../api/utils/getCurrentUserData';
import getUserToken from '../../api/utils/getUserToken';
import useAppStore from '../../store';
import getUserData from '../../utils/getUserData';
import AppText from '../chakraOverrides/AppText';
import { LOGOUT } from '../../api/url/common';
import { useQuery } from '@tanstack/react-query';
import makePostRequest from '../../api/utils/makePostRequest';
import { CometChat } from '@cometchat-pro/chat';
import Notification from '../Notification';
import { RxDotFilled } from 'react-icons/rx';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';

function AppLayout() {

  const [formState, setFormState] = React.useState({
    textToSearch: "",
    userTypeToSearch: "influencer"
  });

  const [webView, setWebView] = React.useState(false);


  const setUserAndToken = useAppStore((state: any) => state.setUserAndToken);
  const navigate = useNavigate();
  const userData = getUserData();
  const { chatNotification, unreadMessages } = useAppStore();
  const [apiUserData, setApiUserData] = React.useState({});
  const [cometChatLoading, setCometChatLoading] = React.useState(true);
  const iconStyles = (isActive?: boolean | undefined) => {
    return {
      display: 'block',
      color: isActive ? appColors.appPrimary[600] : appColors.appBlack[600],
      boxSize: 7,
      mx: 'auto'
    }
  };

  const { data: logout, refetch } = useQuery([LOGOUT], () => makePostRequest(LOGOUT), {
    enabled: false,
    onSuccess: (res) => {
      handleLogout();
    },
  });



  React.useLayoutEffect(() => {
    getCurrentUserData()
      .then(async (data: any) => {
        setApiUserData(data);
        const token = getUserToken();
        await setUserAndToken({
          token: token,
          name: data?.data?.username,
          id: data?.data?.id,
          type: data?.data?.user_type,
          verified_status: data?.data?.verified_status,
          email: data?.data?.email,
        });
      })
      .catch(() => {
        navigate(LOG_IN_PAGE);
        // removeUserToken();
      });
  }, []);

  React.useEffect(() => {
    if (apiUserData?.data?.id) {
      initializeCometChat();
    };

    if (localStorage.getItem("from_webview") == "true") {
      console.log("from_webview", localStorage.getItem("from_webview"));
      setWebView(true);
    }
  }, [apiUserData])

  const initializeCometChat = () => {
    const APP_SETTING = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(import.meta.env.VITE_COMET_REGION)
      .build();

    CometChat.init(import.meta.env.VITE_COMET_APP_ID, APP_SETTING)
      .then(() => {
        if (apiUserData.data !== undefined) {
          loginNewUser();
        }
      })
      .catch((err) => {
        console.log('Error in initialization', err);
      });
  };

  const loginNewUser = () => {
    CometChat.login(
      apiUserData?.data?.id,
      import.meta.env.VITE_COMET_AUTH_KEY,
    ).then(
      (user) => {
        console.log('Login Successful:', { user });
        setCometChatLoading(false);
      },
      (error) => {
        console.log('Login failed with exception:', { error });
      },
    );
  };

  const handleLogout = () => {
    localStorage?.removeItem("token");
    localStorage?.removeItem("user_data");
    window.location.reload();
  }

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userType = queryParams.get('userType');
    if (userType == 'brand') {
      setFormState({ ...formState, userTypeToSearch: 'brand' });
    } else if (userType == 'agency') {
      setFormState({ ...formState, userTypeToSearch: 'agency' });
    } else {
      setFormState({ ...formState, userTypeToSearch: 'influencer' });
    }
  }, [])

  const resetState = () => {
    setFormState({
      textToSearch: "",
      userTypeToSearch: "influencer"
    })
  };

  console.log("webview", webView)


  return (
    <AppBox>
      {/*  --- NAVBAR ----- */}
      <AppFlex
        alignItems="center"
        justifyContent="space-between"
        customStyles={{ as: 'nav', height: '50px', px: '16px', position: "sticky", top: "0px", background: "white", zIndex: 99, display: webView ? "none" : "flex" }}>
        <AppImage src={logo} customStyles={{ width: '100px' }} alt={''} />
        <AppFlex customStyles={{ mr: "10px" }} gap={12} alignItems="center">
          {/* <Box cursor={'pointer'}>
            <ChatIcon {...iconStyles()} />
          </Box> */}
          <Box cursor={'pointer'}>
            <Notification cometChatLoading={cometChatLoading} />
          </Box>

          <Menu>
            <MenuButton>
              <Box>
                <AppAvatar customStyles={{ boxShadow: "0px 0px 6px -3px black" }} name={apiUserData?.data?.first_name || apiUserData?.data?.agency?.agency_name || apiUserData?.data?.brand?.company_name} src={apiUserData?.data?.profile_image} size={'md'} />
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<MdOutlineAccountCircle fontSize={"22px"} />} onClick={() => navigate(MAKE_PROFILE_PAGE_URL(userData.user_type, userData.user_id))} >
                <AppText customStyles={{ padding: "10px 10px" }}>My Profile</AppText>

              </MenuItem >
              <MenuItem icon={<TbLogout fontSize={"22px"} />} onClick={() => refetch()}>
                <AppText customStyles={{ padding: "10px 10px" }}>Logout</AppText>
              </MenuItem>
            </MenuList>
          </Menu>
        </AppFlex>
      </AppFlex>

      <AppFlex>
        {/* ---- SIDEBAR ----- */}
        <AppBox customStyles={{ as: 'aside', w: '50px', minHeight: '100vh', top: "50px", position: "fixed", background: "white", display: ["none", "block"] }}>
          <Flex h="90vh" flexFlow={"column"} justifyContent={"space-between"}>
            <Stack gap={6} mt={5}>
              <NavLink onClick={() => resetState()} to={'.'} end>
                {({ isActive, isPending }) => (<Box>
                  <HomeIcon {...iconStyles(isActive)} />
                </Box>
                )}
              </NavLink>
              <NavLink onClick={() => resetState()} to={SEARCH_PAGE}>
                {({ isActive, isPending }) => (<Box>
                  <SearchIcon {...iconStyles(isActive)} />
                </Box>
                )}
              </NavLink>
              <NavLink to={CHAT_LIST_PAGE}>
                {({ isActive, isPending }) => (<Box position={"relative"}>
                  <ChatIcon {...iconStyles(isActive)} />
                  {unreadMessages > 0 ? <Flex justifyContent={"center"} alignItems="center" height={"15px"} width={"15px"} borderRadius={"25px"} position="absolute" bg={appColors.appPrimary[600]} fontSize="25px" top="-5px" right="9px">
                    <Box lineHeight={"12px"} fontSize="9px" color={"white"}>{unreadMessages}</Box>
                  </Flex> : ""}
                </Box>
                )}
              </NavLink>
              <NavLink to={COLLECTIONS_LIST_PAGE}>
                {({ isActive, isPending }) => (<Box>
                  <BoltIcon {...iconStyles(isActive)} />
                </Box>
                )}
              </NavLink>
            </Stack>
            <Flex justifyContent={"center"}>
              <NavLink style={{ padding: "20px" }} to={SETTINGS_PAGE}>
                {({ isActive, isPending }) => (<Box>
                  <IoSettingsOutline color={!isActive ? "black" : appColors.appPrimary[600]} fontSize="18px" />
                </Box>
                )}
              </NavLink>
            </Flex>

          </Flex>
        </AppBox>

        {/* Mobile navbar */}
        <AppBox customStyles={{ w: '100%', bottom: "0px", position: "fixed", background: "white", zIndex: 99, display: webView ? "none" : ["block", "none"] }}>
          <Flex justifyContent={"center"} gap={"38px"}>
            <Flex justifyContent={"center"} gap={"38px"}>
              <NavLink style={{ padding: "20px" }} to={'.'} end>
                {({ isActive, isPending }) => (<Box>
                  <HomeIcon {...iconStyles(isActive)} />
                </Box>
                )}
              </NavLink>
              <NavLink style={{ padding: "20px" }} to={SEARCH_PAGE}>
                {({ isActive, isPending }) => (<Box>
                  <SearchIcon {...iconStyles(isActive)} />
                </Box>
                )}
              </NavLink>
              <NavLink style={{ padding: "20px" }} to={CHAT_LIST_PAGE}>
                {({ isActive, isPending }) => (<Box position={"relative"}>
                  <ChatIcon {...iconStyles(isActive)} />
                  {unreadMessages > 0 ? <Flex justifyContent={"center"} alignItems="center" height={"15px"} width={"15px"} borderRadius={"25px"} position="absolute" bg={appColors.appPrimary[600]} fontSize="25px" top="-5px" right="9px">
                    <Box lineHeight={"12px"} fontSize="9px" color={"white"}>{unreadMessages}</Box>
                  </Flex> : ""}
                </Box>
                )}
              </NavLink>

              <NavLink style={{ padding: "20px" }} to={COLLECTIONS_LIST_PAGE}>
                {({ isActive, isPending }) => (<Box>
                  <BoltIcon {...iconStyles(isActive)} />
                </Box>
                )}
              </NavLink>
            </Flex>


          </Flex>
        </AppBox>

        {/* ----  MAIN CONTAINER ---- */}
        <AppBox customStyles={{ as: 'main', bg: '#EDEEEF', flexBasis: '100%', paddingLeft: ["0px", "50px"], paddingBottom: webView ? "0px" : ["58px", "0px"] }}>
          <Outlet context={{ cometChatLoading, setFormState, formState, webView }} />
        </AppBox>
      </AppFlex >

      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      />

    </AppBox >
  );
}

export default AppLayout;
