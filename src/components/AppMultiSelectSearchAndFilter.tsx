//@ts-nocheck
import React, { useCallback } from 'react'
import AppFlex from './chakraOverrides/AppFlex'
import AppIcon from './chakraOverrides/AppIcon'
import { IoSearch } from 'react-icons/io5'
import { Box, Flex, } from '@chakra-ui/react'
import { ChakraStylesConfig, Select } from 'chakra-react-select'
import { appColors } from '../theme/foundations/appColor'
import CustomAppSearch from './CustomAppSearch'
import { useNavigate } from 'react-router-dom'
import { SEARCH_PAGE } from '../navigation/routes/common-routes'

const AppMultiSelectSearchAndFilter = ({ toggle, h, searchPage = false, onButtonClick, onFocus, setFormState, formState, reactSelectStyles }: { toggle: () => void, h?: string; searchPage?: boolean, onButtonClick?: any, onFocus?: any, setFormState?: any, formState?: any, reactSelectStyles?: any }) => {
  const navigate = useNavigate();
  const options = [
    { label: "Influencer", value: "influencer" }, { label: "Agency", value: "agency" }, { label: "Brand", value: "brand" }
  ];

  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("userType");
  const text = queryParams.get("text");

  const getDefaultValue = () => {
    if (userType == "brand") {
      return options[2];
    } else if (userType == "agency") {
      return options[1];
    } else {
      return options[0];
    }
  }

  const handleBtnClick = () => {
    navigate({ pathname: SEARCH_PAGE, search: `?userType=${formState?.userTypeToSearch}&text=${formState.textToSearch}` });
    onButtonClick();
  }

  const handleTypeChange = (val) => {
    setFormState({ ...formState, userTypeToSearch: val?.value });
  };

  return (
    <AppFlex gap="1em" alignItems={"left"}>
      <Box height={["40px", "71px"]} flexBasis="100%" display="flex">
        <Select height={"100%"} onChange={(val) => handleTypeChange(val)} isSearchable={false} defaultValue={() => getDefaultValue()} options={options} chakraStyles={reactSelectStyles} />
        <CustomAppSearch onEnterPress={handleBtnClick} text={text} setFormState={setFormState} formState={formState} />
        <Flex height={"100%"} onClick={handleBtnClick} role={"button"} flexBasis={"100px"} background="#EBEDEF" justifyContent={"center"} alignItems={"center"} _hover={{ background: appColors.appPrimary[600], color: "white" }}>
          <AppIcon icon={IoSearch} customStyles={{ height: "20px", width: "20px" }} />
        </Flex>
      </Box>
    </AppFlex >

  )
}

export default AppMultiSelectSearchAndFilter