import { Divider, Stack } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppProfileHeroTemplate from '../AppProfileHeroTemplate';
import heroDummy from '../../assets/common/dummy-profile-hero.png';
import ProfileImage from '../../assets/common/profile-image-dummy.png';

function AppProfileLayout() {
    return (
        <Stack mx="auto" w="98.5%" bg="#fff" my="1em">
            {/* <AppProfileHeroTemplate
                name={'Kalyani Priyadarshan'}
                bio={' 29, Chennai'}
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,'}
                tags={['Entertainment', 'Food & Travel', 'Movies', 'Fashion', 'Art']}
                profileImg={ProfileImage}
                profileBanner={heroDummy} isCurrentUser={false} currUserType={''} profileData={undefined} />
            <Divider />
            <Outlet context={{data: ["1", "2"]}} /> */}
        </Stack>
    );
}

export default AppProfileLayout;
