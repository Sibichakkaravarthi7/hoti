import React from 'react';
import AppButton from '../chakraOverrides/AppButton';
import AppCard from '../chakraOverrides/AppCard';
import AppText from '../chakraOverrides/AppText';
import AppFlex from '../chakraOverrides/AppFlex';
import AppTag from '../chakraOverrides/AppTag';
import AppBox from '../chakraOverrides/AppBox';
import AppImage from '../chakraOverrides/AppImage';
import AppArrowIcon from '../AppArrowIcon';
import { Box, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import AppTagWrapper from '../AppTagWrapper';
import AppModal from '../Modal/AppModal';
import InviteToHOTI from '../Modal/InviteToHOTI';
import AppCampaignDetailModal from '../Modal/AppCampaignDetailModal';

// customStyles={{ border: "1px solid blue" }}
interface CampaignCardType {
  name: string;
  date: string;
  link: string;
  logo?: string;
  description: string;
  tags?: any;
  onHandleClick?: () => void;
  status?: boolean;
  data: any;
}

const AppCampaignCard: React.FC<CampaignCardType> = ({
  name,
  tags,
  date,
  description,
  logo,
  link,
  onHandleClick,
  status,
  data,
}) => {
  // console.log("obj", data);
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  return (
    <AppCard variant={undefined} position="relative" >
      <Stack pos="relative">
        <AppFlex>
          <AppBox customStyles={{ flexBasis: '75%' }}>
            <AppText size="textmedium2" color="appBlack.800">
              {name}
            </AppText>
            <AppText size="textlight3" color="appBlack.600">
              {date}
            </AppText>
          </AppBox>
          {data?.associated_brands?.profile_image &&
            <AppBox customStyles={{ flexBasis: '25%', border: '1px solid lightgray' }}>
              <AppImage src={data?.associated_brands?.profile_image} alt={''} />
            </AppBox>}
        </AppFlex>

        <AppTagWrapper>
          {data?.content_category?.map((each: any) => (
            <AppTag key={each.content_category}>{each.content_category}</AppTag>
          ))}
        </AppTagWrapper>

        <AppText size="body3" color="appBlack.600" customStyles={{ py: '0.5em' }}>
          {description}
        </AppText>

        <AppButton
        customStyles={{ fontSize: "12px" }}
          variant="onlyBorderBlack"
          size="sm"
          rightIcon={<AppArrowIcon />}
          onClick={onOpen}>
          Know More
        </AppButton>
      </Stack>
      {
        status && <VStack
          width="20%"
          height="25px"
          backgroundColor="appPrimary.600"
          pos="absolute"
          top="0"
          right="10px"

        >
          <AppText color="appWhite.900" size="textdark3" customStyles={{ lineHeight: "2em" }}>
            Ongoing
          </AppText>
        </VStack>
      }
      <AppModal iconColor='' isOpen={isOpen} onClose={onClose} maxWidth="918px" px={"30px"} py={"30px"} title={""}>
        <AppCampaignDetailModal data={data} />
      </AppModal>
    </AppCard >
  );
};

export default AppCampaignCard;
