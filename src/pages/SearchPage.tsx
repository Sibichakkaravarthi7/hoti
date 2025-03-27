//@ts-nocheck
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import AppFlex from '../components/chakraOverrides/AppFlex';
import AppHeroSectionSearchBar from '../components/AppHeroSectionSearchBar';
import makeGetRequest from '../api/utils/makeGetRequest';
import { GET_LOCATION_META, POST_DATA_TO_SEARCH, SIGNUP_META } from '../api/url/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import useIsUserVerified from '../utils/hooks/useIsUserVerified';
import makePostRequest from '../api/utils/makePostRequest';
import AppShortcutPopOver from '../components/AppShortcutPopover';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AppIcon from '../components/chakraOverrides/AppIcon';
import { IoFilter } from 'react-icons/io5';
import reactSelectStyles from "../styles/dropdownStyles";
import { SEARCH_PAGE } from '../navigation/routes/common-routes';
import { useDebounce } from 'use-debounce';
import FilterContainer from '../components/FilterContainer';
import { motion } from 'framer-motion';
import SearchResultBody from '../components/SearchResultBody';
import { useFormContext } from 'react-hook-form';


function SearchPage() {
  //@ts-ignore
  const { formState, setFormState } = useOutletContext();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const {
    watch,
    setValue,
  } = useFormContext();

  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get('userType');
  const text = decodeURIComponent(queryParams.get('text') || '');

  const { isUserVerified } = useIsUserVerified();
  const [locationText, setLocationText] = React.useState("");
  const [locationValue] = useDebounce(locationText, 160);
  const [filters, setFilters] = React.useState({})

  React.useEffect(() => {
    isUserVerified();
  }, []);


  const {
    data: searchResult,
    mutate,
    isLoading: searchDataIsLoading,
    isError: searchDataIsError
  } = useMutation((body) => makePostRequest(POST_DATA_TO_SEARCH(formState.userTypeToSearch), body));

  const { data: category_meta } = useQuery([SIGNUP_META], () => makeGetRequest(SIGNUP_META));

  React.useEffect(() => {
    initiateSearch();
  }, [userType, text, mutate]);

  const { data: locationMetaData } = useQuery(["locationMeta", locationValue], () => makeGetRequest(GET_LOCATION_META(locationValue || '')));

  const resetFilter = () => {
    if (formState.userTypeToSearch == "influencer") {
      setValue('location', []);
      setValue('content_category', []);
      setFilters({ content_category: [], gender: [], location: [], age: [] });
    } else {
      setValue('content_category', []);
      setValue('location', []);
      setFilters({ content_category: [], location: [] })
    }
  }


  const initiateSearch = () => {
    setValue('location', []);
    setValue('content_category', []);
    if (filters?.location?.length > 0) {
      const filterLoc = filters?.location?.map((loc: any) => {
        return loc.value;
      });
      setValue('location', filterLoc);
    }
    if (filters?.content_category?.length > 0) {
      const filterCat = filters?.content_category?.map((loc: any) => {
        return loc.value;
      });
      setValue('content_category', filterCat);
    }
    if (formState.textToSearch == null) {
      setFormState({ ...formState, textToSearch: "" })
    }

    const requestData = {
      profile: text,
      ...filters,
      ...watch(),
    };
    //@ts-ignore
    mutate(requestData);
    // console.log("requestData", requestData);

    if (watch('location')?.length > 0 && watch('content_category')?.length > 0) {
      setValue('location', []);
      setValue('content_category', []);
    }
  };

  React.useEffect(() => {
    if (text) {
      setFormState({ ...formState, textToSearch: text });
    }
  }, [text]);

  React.useEffect(() => {
    setFilters({ content_category: [], location: [] })
  }, [formState.userTypeToSearch])

  const handleBtnClick = () => {
    resetFilter();
    navigate({ pathname: SEARCH_PAGE, search: `?userType=${formState?.userTypeToSearch}&text=${formState.textToSearch}` });
  }


  return (
    <>
      <motion.div className="page-layout"
        initial={{ opacity: 0, scale: "99%" }}
        animate={{ opacity: 1, scale: "100%" }}
      // transition={{ duration: 1 }}
      >
        <AppHeroSectionSearchBar
          reactSelectStyles={reactSelectStyles}
          setFormState={setFormState}
          formState={formState}
          onButtonClick={() => handleBtnClick()}
          onToggle={onToggle}
          h={'72px'}
        />

        {/* Mobile Filter */}
        <Box display={["block", "none"]} bg="white" mt="-15px" p="0px 15px" pb={"15px"}>
          <Menu as={Button}>
            <MenuButton>
              <Flex alignItems={"center"} gap="10px">
                <Text fontWeight={"semibold"}>Filters</Text>
                <AppIcon icon={IoFilter} boxSize={7} />
              </Flex>
            </MenuButton>
            <MenuList>
              <Box w="100%" maxW={['300px']}>
                <FilterContainer initiateSearch={initiateSearch} resetFilter={resetFilter} formState={formState} category_meta={category_meta} locationMetaData={locationMetaData?.data} filters={filters} setFilters={setFilters} setLocationText={setLocationText} />
              </Box>
            </MenuList>
          </Menu>
        </Box>

        <AppFlex
          gap="2em"
          customStyles={{
            p: ['8px', '16px'],
            bg: '#fff',
            mt: '1em',
            alignItems: 'flex-start',
            minH: '100vh'
          }}
          justifyContent="flex-end">

          {/* -- desktop filter  --- */}
          <Box display={["none", "block"]} pos={'sticky'} top="70px" flexBasis={['300px']}>
            <FilterContainer initiateSearch={initiateSearch} resetFilter={resetFilter} formState={formState} category_meta={category_meta} locationMetaData={locationMetaData?.data} filters={filters} setFilters={setFilters} setLocationText={setLocationText} />
          </Box>

          {/* -- display results ----- */}
          <SearchResultBody searchDataIsLoading={searchDataIsLoading} searchResult={searchResult} />
        </AppFlex>
      </motion.div>
      <AppShortcutPopOver />
    </>
  );
}

export default SearchPage;
