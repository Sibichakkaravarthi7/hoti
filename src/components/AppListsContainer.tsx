import { HStack, SimpleGrid, SimpleGridProps, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { appColors } from '../theme/foundations/appColor';
import AppArrowIcon from './AppArrowIcon';
import AppBox from './chakraOverrides/AppBox';
import AppFlex from './chakraOverrides/AppFlex';
import AppText from './chakraOverrides/AppText';

function AppListsContainer({
  heading,
  children,
  gridColumns = 4,
  linkTo,
  rightButton,
  isLoading,
  gridTemplateColumns,
  customWidth = ["100vw", "100%"],
}: {
  heading?: string;
  children: React.ReactNode;
  gridColumns?: number;
  isCampaign?: boolean;
  linkTo?: { name: string, link: string };
  rightButton?: { name: string, action: any };
  isLoading?: boolean;
  gridTemplateColumns?: any;
  customWidth?: any;
}) {
  return (
    <AppBox customStyles={{ p: '16px', bg: '#fff', width: customWidth, mx: "auto", borderRadius: "8px" }}>
      <AppFlex alignItems={"start"} justifyContent={'space-between'}>
        {heading && <><Skeleton endColor='#fff4ee' isLoaded={!isLoading} mb="8px"><AppText size="h3" color="appBlack.800" customStyles={{ mb: '1rem' }}>
          {heading}
        </AppText></Skeleton></>}
        {linkTo && <Link
          to={linkTo.link}
          style={{ height: "fit-content" }}
          preventScrollReset={true}
        >
          <HStack>
            <Text width={["86px", "100%"]} color='appPrimary.600' size='textmedium2'>
              {linkTo.name}
            </Text>
            <AppArrowIcon boxSize={6} color="appPrimary.600" />
          </HStack>
        </Link>}
        {rightButton &&
          <HStack role="button" mr={["17px"]}>
            <AppText onClick={rightButton?.action} color='appPrimary.600' size='textmedium2'>
              {rightButton?.name}
            </AppText>
          </HStack>}
      </AppFlex>

      <Skeleton endColor='#fff4ee' isLoaded={!isLoading}><SimpleGrid className='grid-container-parent' py="10px" overflow={"auto"} columns={gridColumns} gridTemplateColumns={gridTemplateColumns} gap="2em" justifyItems={'center'}>
        {children}
      </SimpleGrid>
      </Skeleton>
    </AppBox >
  );
}

export default AppListsContainer;
