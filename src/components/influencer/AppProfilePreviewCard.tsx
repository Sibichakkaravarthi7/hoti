import React from 'react';
import AppBox from '../chakraOverrides/AppBox';
import AppCard from '../chakraOverrides/AppCard';
import AppFlex from '../chakraOverrides/AppFlex';
import AppIcon from '../chakraOverrides/AppIcon';
import AppImage from '../chakraOverrides/AppImage';
import { BsBookmark } from 'react-icons/bs';
import { HStack, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MAKE_PROFILE_PAGE_URL } from '../../navigation/routes/common-routes';
import ProfileImageDummy from '../../assets/common/profile-image-dummy.png';
import AppModal from '../Modal/AppModal';
import AppAddToListModal from '../Modal/AppAddToListModal';
import { motion } from 'framer-motion';
import { ContentCategoryI, PreviewCardI } from '../../Types';

function AppProfilePreviewCard({
  variant,
  cardData,
  hideTags = false,
  profile_id,
  noSaveOption = false,
  noShadow = false,
}: {
  variant: string;
  cardData: PreviewCardI;
  hideTags?: boolean;
  profile_id: number;
  noSaveOption?: boolean;
  noShadow?: boolean;
}) {
  const { profile_image, profile_name, user_type, username } = cardData;

  const getProperContentCategory = (tagList: ContentCategoryI[]) => {
    if (!Array?.isArray(tagList)) {
      return '';
    }
    if (tagList?.length === 0) {
      return '';
    }
    if (tagList?.length === 1) {
      return tagList[0]?.content_category;
    }
    const lastTag = tagList?.pop();
    let tagString = '';
    tagList?.map((obj, ind: number) => {
      tagString = tagString + (ind == 0 ? '' : ', ') + obj?.content_category;
    });
    // console.log("tag string", `${tagString} & ${lastTag?.content_category}`);
    return `${tagString} & ${lastTag?.content_category}`;
  };

  // console.log("cardData", cardData);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <motion.div
      className={noShadow ? "" : "profile-hover-sm"}
      style={{ height: "100%", borderRadius: "8px" }}
      initial={{ opacity: 0, transform: "translateY(2%)" }}
      whileInView={{ opacity: 1, transform: "translateY(0%)" }}
      // transition={{ delay: .1 }}
      >
      <AppCard variant={variant === 'profilePreviewWithStats' ? 'removeDefault' : 'profilePreview'}>
        <Stack pos="relative">
          {/*  --- image -- */}{' '}
          <Link to={MAKE_PROFILE_PAGE_URL(user_type, profile_id)} style={{ width: '100%' }} relative="path">
            <AppBox customStyles={{ margin: '0px', overflow: "hidden" }} variant={variant}>
              <AppImage
                className='preview-img'
                customStyles={{ height: '100%', width: '100%', objectFit: 'cover' }}
                src={profile_image || ProfileImageDummy}
                alt={profile_name}
              />
            </AppBox>
          </Link>
          {/* -- about -- */}
          <AppFlex justifyContent="space-between" customStyles={{ px: '0.2em', pt: '0.3em' }}>
            <Link to={MAKE_PROFILE_PAGE_URL(user_type, profile_id)} style={{ width: '80%' }} relative="path">

              <AppBox>
                {!hideTags && <Text size={'textlight3'} fontSize="11px" color={'appBlack.600'} mb='0.2em'>
                  {getProperContentCategory(cardData?.content_category)}
                </Text>}
                <Text
                  size={variant === 'profilePreviewWithStats' ? 'textdark1' : 'textmedium2'}
                  fontSize={variant === 'profilePreviewWithStats' ? '18px' : '14px'}
                  color={'appBlack.800'}>
                  {profile_name || cardData.username}
                </Text>
                {/* <Text>{username}</Text> */}
                {username && (
                  <Text fontSize={"10px"} size={'textlight3'} color={''}>
                    {username}
                  </Text>
                )}
              </AppBox>
            </Link>

            {!noSaveOption && <AppIcon
              onClick={() => onOpen()}
              customStyles={{ height: '17px', width: '17px' }}
              icon={BsBookmark}
              boxSize={4}
            />}
          </AppFlex>
        </Stack>
      </AppCard>
      <AppModal
        maxWidth={'585px'}
        px="20px"
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        title={`Add ${cardData.profile_name} to`}>
        <AppAddToListModal profileToAddId={profile_id} />
      </AppModal>
    </motion.div>
  );
}

export default AppProfilePreviewCard;
