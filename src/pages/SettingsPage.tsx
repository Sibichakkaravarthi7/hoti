import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { BiChevronLeft, BiLeftArrow } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, NavLink, useParams } from 'react-router-dom';
import getCurrentUserData from '../api/utils/getCurrentUserData';
import AppLayout from '../components/layout/AppLayout';
import Help from '../components/SettingsTabs/Help';
import PrivacyPolicy from '../components/SettingsTabs/PrivacyPolicy';
import ResetEmail from '../components/SettingsTabs/ResetEmail';
import ResetPassword from '../components/SettingsTabs/ResetPassword';
import TC from '../components/SettingsTabs/TC';
import {
  HELP,
  PRIVACY_POLICY,
  RESET_EMAIL,
  RESET_PASSWORD,
  SETTINGS_PAGE,
  TERMS_AND_CONDITIONS
} from '../navigation/routes/common-routes';
import { appColors } from '../theme/foundations/appColor';

const SettingsPage = () => {
  const [userData, setUserData] = React.useState({});

  React.useLayoutEffect(() => {
    getCurrentUserData()
      .then(async (data: any) => {
        setUserData(data);
      })
      .catch((err) => {
        console.log('error', err);
        // removeUserToken();
      });
  }, []);

  const { tab } = useParams();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const tabs = [
    {
      comp: <ResetPassword userData={userData} />
    },
    {
      comp: <ResetEmail userData={userData} />
    },
    {
      comp: <PrivacyPolicy />
    },
    {
      comp: <TC />
    },
    {
      comp: <Help />
    }
  ];

  React.useEffect(() => {
    if (tab == 'reset-password') {
      setSelectedTab(0);
    } else if (tab == 'reset-email') {
      setSelectedTab(1);
    } else if (tab == 'privacy-policy') {
      setSelectedTab(2);
    } else if (tab == 'terms-and-conditions') {
      setSelectedTab(3);
    } else if (tab == "help") {
      setSelectedTab(4);
    } else {
      setSelectedTab(0);
    }
  }, [tab]);

  const settingsTab = [
    {
      link: RESET_PASSWORD,
      label: 'Reset Password'
    },
    {
      link: RESET_EMAIL,
      label: 'Reset Email'
    },
    {
      link: PRIVACY_POLICY,
      label: 'Privacy Policy'
    },
    {
      link: TERMS_AND_CONDITIONS,
      label: 'Terms and Conditions'
    },
    {
      link: HELP,
      label: 'Help'
    }
  ];
  return (
    <Box minH={'88vh'} bg="white" m={['0px', '1em']}>
      <Text bg="#eb752f" color="white" display={["block", "none"]} p={["20px 30px 20px 30px"]} fontWeight={600} fontSize="28px">
        Settings
      </Text>
      <Flex h="88vh" display={['none', 'flex']}>

        <Box flexBasis={"25%"} borderRight={['none', '2px solid #e2e2e2']}>
          <Flex bg="#eb752f" p={["20px 30px 10px 30px", '20px 30px']} alignItems={"center"}>
            <IoSettingsOutline color='white' fontSize={"28px"} />

            <Text ml="10px" color="white" fontWeight={600} fontSize="28px">
              Settings
            </Text>
          </Flex>
          <Flex mt="26px" flexFlow={'column'}>
            {settingsTab?.map((data, ind) => (
              <NavLink key={data?.link} to={data?.link}>
                {({ isActive, isPending }) => (
                  <Text _hover={{ bg: "#eb752f12" }} variant={selectedTab == ind ? 'settingsListSelected' : 'settingsList'}>
                    {data?.label}
                  </Text>
                )}
              </NavLink>
            ))}
          </Flex>
        </Box>

        <Box
          p={'0px 40px 20px 40px'}
          flexBasis="80%"
          // pt="80px"
          overflow={"auto"}>
          {tabs[selectedTab]?.comp}
        </Box>
      </Flex>

      {/* mobile settings */}
      <Box display={['block', 'none']}>
        {tab !== undefined &&
          <Link to={SETTINGS_PAGE}>
            <Text mt="20px" color="#151515" p={['00px 20px']} fontWeight={500} fontSize="20px">
              <Flex alignItems={'center'}>
                <BiChevronLeft /> Back
              </Flex>
            </Text>
          </Link>
        }
        {tab == undefined ? (
          <Flex mt="20px" flexFlow={'column'}>
            {settingsTab?.map((data, ind) => (
              <NavLink key={data?.link} to={data?.link}>
                {({ isActive, isPending }) => (
                  <Text variant={selectedTab == ind ? 'settingsListSelected' : 'settingsList'}>
                    {data?.label}
                  </Text>
                )}
              </NavLink>
            ))}
          </Flex>
        ) : (
          <Box p={'20px 20px'}>
            {tabs[selectedTab]?.comp}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SettingsPage;
