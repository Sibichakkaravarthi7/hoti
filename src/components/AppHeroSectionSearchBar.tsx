import { Stack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import AppBox from './chakraOverrides/AppBox';
import AppFlex from './chakraOverrides/AppFlex';
import AppText from './chakraOverrides/AppText';
import AppMultiSelect from './chakraOverrides/AppMultiSelect';
import ProfileHeroBg from '../assets/common/hero-bg-gradient.png'
import AppMultiSelectSearchAndFilter from './AppMultiSelectSearchAndFilter';
import FilteredDataAsTags from './FilteredDataAsTags';

function AppHeroSectionSearchBar({onToggle, h, searchPage, onButtonClick, onFocus, setFormState, formState, reactSelectStyles }:{onToggle: any, h?: string | undefined, searchPage?: boolean, onButtonClick: any, onFocus?: any, setFormState?: any, formState?: any, reactSelectStyles: any}, ) {
  return (
    <AppBox className='app-border-radius' customStyles={{ background: "white", width: "100%", textAlign: "center", padding: "20px" }}>
        <AppText customStyles={{ fontWeight: 'bold', color: '#151515', fontSize: ['1.5em', '2.8em'], pb: "20px" }}>
          Search from the Largest Database of Influencers
        </AppText>
        <AppBox customStyles={{ pb: "20px"}}>
          <AppMultiSelectSearchAndFilter reactSelectStyles={reactSelectStyles} setFormState={setFormState} formState={formState} onFocus={onFocus} onButtonClick={onButtonClick} h={h} toggle={onToggle} searchPage={searchPage} />
        </AppBox>
    </AppBox>
  );
}

export default AppHeroSectionSearchBar;
