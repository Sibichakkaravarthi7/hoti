import { Box, CloseButton, Divider, Flex, Image, SimpleGrid, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { appColors } from '../../theme/foundations/appColor';
import AppStatsGrid from '../AppStatsGrid';
import AppTagWrapper from '../AppTagWrapper';
import AppBox from '../chakraOverrides/AppBox';
import AppFlex from '../chakraOverrides/AppFlex';
import AppImage from '../chakraOverrides/AppImage';
import AppTag from '../chakraOverrides/AppTag';
import AppText from '../chakraOverrides/AppText';

// const StatsGrid = ({ stats }: { stats: { title: string; value: string }[] }) => {
//     return (
//         <SimpleGrid columns={3} gap={4}>
//             {stats.map((each: { title: string; value: string }) =>
//                 <AppBox>
//                     <AppText>{each.title}</AppText>
//                     <AppText>{each.value}</AppText>
//                 </AppBox>
//             )}
//         </SimpleGrid>
//     )
// }

function AppCampaignDetailModal({ data }: { data: any }) {
  const getProperContentCategory = (tagList: { id: number; content_category: string }) => {
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
    tagList?.map((obj) => (tagString = tagString + ', ' + obj?.content_category));
    return `${tagString} & ${lastTag?.content_category}`;
  };

  const campaignStats = React.useMemo(
    () => [
      {
        head: 'Client',
        value: data?.associated_brands?.company_name
      },
      {
        head: 'Campaign Name',
        value: data?.campaign_name
      },
      {
        head: 'Campaign Period',
        value: data?.campaign_period
      },
      {
        head: 'Deliverables',
        value: data?.deliverables
      },
      {
        head: 'Status',
        value: data?.status
      },
      {
        head: 'Category',
        value: getProperContentCategory(data?.content_category)
      }
    ],
    []
  );

  const [mediaToView, setMediaToView] = React.useState("");

  // const campaignStatsSecond = React.useMemo(
  //   () => [
  //     {
  //       head: 'Total Cost',
  //       value: 'Rs. 20,000/-'
  //     },
  //     {
  //       head: 'Likes',
  //       value: '32k'
  //     },
  //     {
  //       head: 'Comments',
  //       value: '7,886'
  //     },
  //     {
  //       head: 'Video Views',
  //       value: '2M'
  //     },
  //     {
  //       head: 'CPE',
  //       value: 'Rs. 0.5'
  //     },
  //     {
  //       head: 'CPV',
  //       value: 'Rs. 0.01'
  //     }
  //   ],
  //   []
  // );
  //  <AppBox>
  //       <AppText customStyles={{ mb: '1em' }} color={''} size={'h3'}>
  //         Campaign Performance
  //       </AppText>
  //       <AppStatsGrid stats={campaignStatsSecond} {...statsGridProps} />
  //     </AppBox>
  //     <Divider />

  const statsGridProps = {
    columns: ['repeat(2, 1fr)', 'repeat(3, 1fr)'],
    gap: '3rem',
    childrenStyles: {
      head: {
        size: 'textlight2',
        color: 'appBlack.600'
      },
      value: {
        size: 'textdark2',
        color: 'appBlack.800'
      }
    }
  };
  // console.log("mediaToView", mediaToView)
  return (
    <Stack gap={5}>
      <AppBox>
        <AppBox customStyles={{ width: '55px', height: '55px', mb: '1em' }}>
          <AppImage src={data?.associated_brands?.profile_image} />
        </AppBox>
        <AppText size="h2" color="appBlack.800">
          {data?.campaign_name}
        </AppText>
        <AppText size="textmedium2" color="appBlack.600">
          {data?.start_date}
        </AppText>
        <AppTagWrapper customStyles={{ my: '0.75em' }}>
          {data?.content_category?.map((tag: any) => (
            <AppTag key={tag?.content_category}>{tag?.content_category}</AppTag>
          ))}
        </AppTagWrapper>
        <AppText size="body1" color="appBlack.600">
          {data?.description}
        </AppText>

      </AppBox>

      {mediaToView.length > 3 ? (
        <Box position={"relative"}>
          <CloseButton zIndex={99} onClick={() => setMediaToView('')} position={"absolute"} left="5px" top="5px" bg={appColors.appPrimary[600]} w="30px" h="30px" borderRadius="100%" display="inline-block" fontSize={"12px"} color="white" />
          {!mediaToView.endsWith(".mp4") ? (
            <img width={"100%"} className="image-view-modal" src={mediaToView} alt="Selected Image" />
          ) : (
            <Flex h="100%" position={"relative"}  >
              <BsFillPlayFill style={{ position: "absolute", color: "white", fontSize: "22px", left: "8px", top: "8px" }} />
              <video
                className="image-view-modal"
                style={{ height: '100%', width: "100%" }}
                src={mediaToView}
                controls
                controlsList="nodownload"></video>
            </Flex>
          )}
        </Box>
      ) : (
        <>
          <AppStatsGrid stats={campaignStats} {...statsGridProps} />

          <SimpleGrid gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} columns={4} spacing={'30px'} w="100%">
            {data?.campaign_files?.map((obj: any) => (
              <Box
                role={'button'}
                onClick={() =>
                  setMediaToView(obj.media_file.media_file)
                }
                key={obj?.media_file?.media_file}
                border={'1px solid #ddd'}
                maxW="191px"
                height={'190px'}
                bg="black"
              >
                {/* {JSON.stringify( obj?.media_file?.media_file)} */}
                {/* <img
                  height={'100%'}
                  width={'100%'}
                  style={{ objectFit: 'cover', height: '100%' }}
                  src={obj?.media_file?.media_file} */}
                {/* /> */}
                {obj?.media_file?.file_type == 'image' ? (
                  <Image src={obj?.media_file?.media_file} objectFit="cover" h="100%" w="100%" />
                ) : (
                  <Flex h="100%" position={"relative"}  >
                    <BsFillPlayFill style={{ position: "absolute", color: "white", fontSize: "22px", left: "8px", top: "8px" }} />
                    <video
                      style={{ height: '100%', width: "100%" }}
                      src={obj?.media_file?.media_file}
                      // controls
                      controlsList="nodownload"></video>
                  </Flex>

                )}
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </Stack>
  );
}

export default AppCampaignDetailModal;
