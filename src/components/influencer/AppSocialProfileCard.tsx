import React from 'react';
import AppBox from '../chakraOverrides/AppBox';
import AppCard from '../chakraOverrides/AppCard';
import AppFlex from '../chakraOverrides/AppFlex';
import AppImage from '../chakraOverrides/AppImage';
import AppText from '../chakraOverrides/AppText';
import AppStatsGrid, { AppStatsGridType } from '../AppStatsGrid';

interface SocialProfileCardType {
  logo: string;
  profileName: string;
  tagAt: string;
  score: string;
  socialStats: {
    head: string;
    value: string;
  }[];
}

const AppSocialProfileCard: React.FC<SocialProfileCardType> = ({
  logo = '',
  profileName = 'Profile name',
  tagAt = '@tag',
  score = '9.54',
  socialStats
}) => {
  return (
    <AppCard variant={undefined}>
      <AppFlex justifyContent="space-between">
        <AppFlex gap="0.7em" customStyles={{ pb: '2.5em' }} alignItems="center">
          <AppBox customStyles={{ border: '1px solid lightgrey', w: '25px', h: '25px' }}>
            <AppImage src={logo} alt={''} />
          </AppBox>
          <AppBox>
            <AppText size={'textmedium2'} color={'appBlack.800'}>
              {profileName}
            </AppText>
            <AppText size={'textlight3'} color={'appBlack.600'} customStyles={{ mt: '0.25rem' }}>
              {tagAt}
            </AppText>
          </AppBox>
        </AppFlex>
        <AppBox>
          <AppText
            size={'textlight3'}
            color={'appBlack.600'}
            customStyles={{ textAlign: 'center' }}
          >
            Score
          </AppText>
          <AppText size={'textmedium2'} color={'appBlack.800'}>
            {score}
          </AppText>
        </AppBox>
      </AppFlex>
      <AppStatsGrid
        stats={socialStats}
        childrenStyles={{
          head: {
            size: 'textlight3',
            color: 'appBlack.600'
          },
          value: {
            size: 'textmedium2',
            color: 'appBlack.800'
          }
        }}
      />
    </AppCard>
  );
};

export default AppSocialProfileCard;
