import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import { appColors } from '../../theme/foundations/appColor';

const TC = () => {
  const tcData = [
    {
      head: 'Account Registration',
      points: [
        '1.1 You must create an account to use the App. When registering, you agree to provide accurate and complete information.',
        '1.2 You are solely responsible for maintaining the confidentiality of your account and password. You must not disclose your login credentials to any third party.',
        '1.3 You are responsible for all activities that occur under your account. You must immediately notify HOTI of any unauthorized use of your account.'
      ]
    },
    {
      head: 'Platform Description',
      points: [
        '2.1 HOTI is an influencer platform that connects influencers, agencies, and brands to facilitate collaboration and partnerships.',
        '2.2 Users can search and filter clients based on their needs, engage in chat conversations, and create campaign cards after a successful deal is made.',
        '2.3 The App provides a platform for communication and collaboration but does not guarantee the success or outcome of any collaboration or partnership.'
      ]
    },
    {
      head: 'Integration with Phyllo',
      points: [
        '3.1 HOTI integrates with a third-party service called Phyllo, which acts as an API gateway to access creator and independent work platforms.',
        "3.2 Phyllo allows developers to access individuals' and creators' consented data from platforms such as YouTube, Instagram, Twitch, Tiktok, Shopify, Upwork, and more.",
        '3.3 The integration with Phyllo enables HOTI to retrieve social media status and relevant data to enhance the user experience.'
      ]
    },
    {
      head: 'User Obligations',
      points: [
        '4.1 Users agree to use the App in compliance with all applicable laws and regulations.',
        '4.2 Users must provide accurate and up-to-date information on their profiles and campaign cards.',
        '4.3 Users are solely responsible for their interactions, communications, and agreements with other users.',
        '4.4 Users must not engage in any fraudulent, misleading, or harmful activities on the App.',
        '4.5 Users agree not to access or use any data obtained through Phyllo for any unauthorized or illegal purposes.'
      ]
    },
    {
      head: 'Intellectual Property Rights',
      points: [
        '5.1 All content and materials on the App, including but not limited to logos, trademarks, text, graphics, images, and software, are the property of HOTI or its licensors.',
        '5.2 Users retain ownership of their own content uploaded or shared on the App.',
        '5.3 Users grant HOTI a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, and distribute their content on the App for promotional purposes.'
      ]
    },
    {
      head: 'Limitation of Liability',
      points: [
        '6.1 HOTI shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of the App.',
        '6.2 HOTI does not endorse or guarantee the accuracy, reliability, or quality of any content or information provided by users.',
        '6.3 HOTI does not assume any responsibility for any collaborations, agreements, or transactions entered into between users.'
      ]
    },
    {
      head: 'Privacy Policy',
      points: [
        "7.1 HOTI's Privacy Policy governs the collection, use, and disclosure of personal information provided by users. By using the App, you consent to the collection and processing of your personal information in accordance with the Privacy Policy."
      ]
    },
    {
      head: 'Modifications to the Agreement',
      points: [
        '8.1 HOTI reserves the right to modify or update this Agreement at any time. Users will be notified of any material changes.',
        '8.2 Continued use of the App after the modifications constitutes acceptance of the revised Agreement.'
      ]
    },
    {
      head: 'Termination',
      points: [
        '9.1 HOTI reserves the right to suspend or terminate user accounts for violations of this Agreement or any applicable laws.',
        '9.2 Users may terminate their account at any time by contacting HOTI.'
      ]
    },
    {
      head: 'Governing Law and Jurisdiction',
      points: [
        '10.1 This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction].',
        '10.2 Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].'
      ]
    }
  ];
  return (
    <Box>
      <Text
        p="20px 0px"
        borderBottom={`3px solid ${appColors.appPrimary[600]}`}
        fontWeight={600}
        fontSize="28px"
        color={appColors.appPrimary[600]}>
        Terms and Conditions
      </Text>
      <Box mt="30px">
        <Text variant={'tcPoints'}>
          Please read these Terms and Conditions ("Agreement") carefully before using the HOTI (Humans
          of the internet) mobile application ("App"). This Agreement sets forth the legally binding
          terms and conditions for your use of the App and its related services.
        </Text>
        <Text variant={'tcPoints'}>
          By accessing or using the App, you agree to be bound by this Agreement. If you do not agree
          with any part of this Agreement, you must not use the App.
        </Text>
      </Box>


      {tcData?.map((data) => (
        <Box my="60px" key={data?.head} >
          <Text variant={'tcHeader'}>
            {data?.head}
          </Text>
          <Box>
            {data?.points?.map((point) => (
              <Text key={point} variant={'tcPoints'}>
                {point}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TC;
