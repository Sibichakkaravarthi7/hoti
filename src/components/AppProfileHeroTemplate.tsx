import { Alert, AlertIcon, Box, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AppBox from './chakraOverrides/AppBox';
import AppButton from './chakraOverrides/AppButton';
import AppFlex from './chakraOverrides/AppFlex';
import AppTag from './chakraOverrides/AppTag';
import AppText from './chakraOverrides/AppText';
import { BsBookmark } from 'react-icons/bs';
import { CgBookmark } from 'react-icons/cg';
import AppIcon from './chakraOverrides/AppIcon';
import { BsTelephone } from 'react-icons/bs';
import AppImage from './chakraOverrides/AppImage';
import AppAvatar from './chakraOverrides/AppAvatar';
import AppTagWrapper from './AppTagWrapper';
import { TbWorld } from 'react-icons/tb';
import AppModal from './Modal/AppModal';
import EditProfileModal from './Modal/EditProfileModal';
import { ChatIcon, PencilIcon } from '../utils/customIcons';
import HeroProfilePlaceholder from "../assets/common/hoti-hero-placeholder.png"
import FileUploadOverlay from './FileUploadOverlay';
import { BiPencil } from 'react-icons/bi';
import { UPDATE_PROFILE_IMAGE } from '../api/url/common';
import makePutRequest from '../api/utils/makePutRequest';
import { useMutation } from '@tanstack/react-query';
import AppAddToListModal from './Modal/AppAddToListModal';
import { useNavigate } from 'react-router-dom';
import { MAKE_INDIVDUAL_CHAT_PAGE } from '../navigation/routes/common-routes';
import AppAlert from './chakraOverrides/AppAlert';

interface AppProfileHeroTemplate {
  name: string;
  bio: string;
  description: string;
  tags: any;
  isBrand?: boolean;
  profileImg: any;
  profileBanner: any;
  isCurrentUser: boolean;
  currUserType: string;
  profileData: any;
  refetch: any;
  metaData: any;
}


const AppProfileHeroTemplate: React.FC<AppProfileHeroTemplate> = ({ name, bio, description, tags, isBrand, profileBanner, profileImg, isCurrentUser, currUserType, profileData, refetch, metaData }) => {
  const { isLoading: updateProfileIsLoading, error: updateProfileError, mutate: updateProfile
  } = useMutation((body) => makePutRequest(UPDATE_PROFILE_IMAGE, body), {
    onSuccess: () => {
      setTimeout(() => {
        closeModal();
      }, 1300);
      refetch();
      onSuccessOnOpen();
    },
    onError: () => {
      onErrorOnOpen();
      setTimeout(() => {
        onOnErrorOnClose();
      }, 1700);
    }
  });

  const {
    onToggle: onSuccessToggle,
    isOpen: onSuccessIsOpen,
    onClose: onSuccessOnClose,
    onOpen: onSuccessOnOpen
  } = useDisclosure();

  const {
    onToggle: onErrorToggle,
    isOpen: onErrorIsOpen,
    onClose: onOnErrorOnClose,
    onOpen: onErrorOnOpen
  } = useDisclosure();

  const closeModal = () => {
    onOnErrorOnClose();
    onSuccessOnClose();
  };

  const handleProfileUpdate = (e: any, type: string) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(type, file);
    //@ts-ignore
    updateProfile(formData);
  };

  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: addIsOpen, onClose: addOnClose, onOpen: addOnOpen } = useDisclosure();

  const handleWebsiteClick = (link: string) => {
    if (link?.includes("http")) {
      window.open(link);
    } else {
      window.open("https://" + link);
    }
    console.log("link", link);
  }
  const navigate = useNavigate();
  return (
    <AppBox customStyles={{ p: '16px' }}>
      {/* ---  hero image --- */}
      <Box h={["107px", "265px"]} maxH="265px" mb="35px" pos="relative" >
        {isCurrentUser && <FileUploadOverlay
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate(e, "background_image")}
          name="background_image"
          id="hero-bg"
          text="Edit"
          icon={<BiPencil />}
          iconDirection="right"
          customStyles={{}}
        />}
        <AppImage src={profileData?.background_image || HeroProfilePlaceholder} alt={''} fit="cover" customStyles={{ height: "100%", width: "100%" }} />
        <Box pos="absolute" bottom={["-73px", "-55px"]} left={["13px", "28px"]} >
          <Box position={"relative"}>
            <AppAvatar name={''} src={profileData?.profile_image || profileImg} customStyles={{ boxShadow: "0px 0px 9px -5px black", width: ["104px", "196px"], height: ["104px", "196px"] }} />
            {isCurrentUser && <FileUploadOverlay
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProfileUpdate(e, "profile_image")}
              name="profile_image"
              id="dp-bg"
              text="Edit"
              icon={<BiPencil />}
              iconDirection="right"
              customStyles={{ borderRadius: "100px" }}
            />}
          </Box>

        </Box>
      </Box>

      <AppFlex>
        {/* --- left section overview about the person ----  */}
        <Stack flexBasis={["100%", "50%"]} mt="50px">
          <AppText color={'appBlack.800'} size={'h2'}>
            {name}
          </AppText>
          <AppText color={'appBlack.800'} size={'textlight2'}>
            {profileData?.username}
          </AppText>
          <AppText color={'appBlack.800'} size={'textlight1'}>
            {bio}
          </AppText>
          <AppText color={'appBlack.800'} size={'body1'} customStyles={{ pb: '0.75em', wordBreak: "break-all" }}>
            {description}
          </AppText>
          <AppTagWrapper customStyles={{ maxW: '380px' }}>
            {tags?.map((each: any) => <AppTag size={'base'} key={each?.id}>{each?.content_category}</AppTag>)}
          </AppTagWrapper>
          <AppFlex customStyles={{ flexBasis: '50%', justifyContent: ['flex-start', 'flex-end'], height: "100%", display: ["flex", "none"], paddingTop: "20px" }}>
            {/* --- two buttons in the right section */}
            <AppFlex gap="1em" alignItems={"center"}>

              {!isCurrentUser ?
                <><AppButton onClick={() => navigate(MAKE_INDIVDUAL_CHAT_PAGE(profileData?.id))} customStyles={{ p: "4px 10px", fontSize: "15px", borderRadius: "4px" }} variant="fillBrandColor" size="md" leftIcon={<AppIcon icon={ChatIcon} />}>
                  Chat
                </AppButton>
                  {["agency", "brand"].includes(currUserType) ? <AppButton customStyles={{ p: "4px 10px", fontSize: "15px", borderRadius: "4px" }} variant="onlyBorderPrimary" size="md" onClick={() => handleWebsiteClick(profileData?.website)} leftIcon={<AppIcon icon={TbWorld} />}>
                    Visit website
                  </AppButton> : ""}

                  <AppButton customStyles={{ p: "4px 10px", fontSize: "15px", borderRadius: "4px" }} variant="onlyBorderBlack" size="md" leftIcon={<AppIcon icon={CgBookmark} />} onClick={() => addOnOpen()}>
                    Add to List
                  </AppButton>
                </> :
                <AppButton customStyles={{ p: "4px 10px", fontSize: "15px", borderRadius: "4px" }} variant="fillBrandColor" size="md" onClick={() => onOpen()} leftIcon={<PencilIcon mt={"4px"} />}>
                  Edit
                </AppButton>}
            </AppFlex>
          </AppFlex>
        </Stack>

        <AppFlex customStyles={{ flexBasis: '50%', justifyContent: 'flex-end', height: "100%", display: ["none", "flex"] }}>
          {/* --- two buttons in the right section */}
          <AppFlex gap="1em" alignItems={"center"}>

            {!isCurrentUser ?
              <>
                {["agency", "brand"].includes(currUserType) ? <AppButton variant="onlyBorderPrimary" size="md" onClick={() => handleWebsiteClick(profileData?.website)} leftIcon={<AppIcon icon={TbWorld} />}>
                  Visit website
                </AppButton> : ""}
                <AppButton variant="fillBrandColor" size="md" onClick={() => navigate(MAKE_INDIVDUAL_CHAT_PAGE(profileData?.id))} leftIcon={<AppIcon customStyles={{ width: "13px", height: "13px", strokeWidth: "0.5" }} icon={ChatIcon} />}>
                  Chat
                </AppButton>
                <AppButton variant="onlyBorderBlack" size="md" leftIcon={<AppIcon icon={CgBookmark} />} onClick={() => addOnOpen()}>
                  Add to List
                </AppButton>
              </> :
              <AppButton variant="fillBrandColor" size="md" onClick={() => onOpen()} leftIcon={<PencilIcon mt={"4px"} />}>
                Edit
              </AppButton>}
          </AppFlex>
        </AppFlex>
      </AppFlex>
      <AppModal isOpen={isOpen} px="22px" onClose={onClose} maxWidth={"806px"} title={"Edit Details"}>
        <EditProfileModal metaData={metaData} refetch={refetch} userType={currUserType} profileData={profileData} onClose={onClose} />
      </AppModal>
      {onSuccessIsOpen && <AppAlert status='success' message='Profile Updated Successfully!' />}
      {onErrorIsOpen && <AppAlert status='error' message='An Error Occured!' />}
      <AppModal
        maxWidth={'585px'}
        px="20px"
        isOpen={addIsOpen}
        onClose={addOnClose}
        size="2xl"
        title={`Add ${name} to`}>
        <AppAddToListModal profileToAddId={profileData?.id} />
      </AppModal>
    </AppBox>
  );
}

export default AppProfileHeroTemplate;
