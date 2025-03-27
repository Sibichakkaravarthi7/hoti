import { useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import AppHeroSectionSearchBar from '../components/AppHeroSectionSearchBar';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DASHBOARD_DATA } from '../api/url/common';
import makeGetRequest from '../api/utils/makeGetRequest';
import { useNavigate, useOutletContext } from 'react-router';
import DashboardListingComponent from '../components/DashboardListingComponent';
import SearchBodyComponent from '../components/SearchBodyComponent';
import makePostRequest from '../api/utils/makePostRequest';
import useIsUserVerified from '../utils/hooks/useIsUserVerified';
import { ChakraStylesConfig } from 'chakra-react-select';
import { SEARCH_PAGE } from '../navigation/routes/common-routes';
import { motion } from 'framer-motion';
import AppShortcutPopOver from '../components/AppShortcutPopover';

function Dashboard() {

  const navigate = useNavigate();
  const { data: dashboardData } = useQuery([DASHBOARD_DATA], () => makeGetRequest(DASHBOARD_DATA));

  const { isOpen, onToggle } = useDisclosure();

  const { isUserVerified } = useIsUserVerified();
  React.useEffect(() => {
    isUserVerified();
  }, []);

  const reactSelectStyles: ChakraStylesConfig = {
    control: (provided, state) => ({
      ...provided,
      textAlign: "left",
      padding: '0px',
      borderRadius: '0',
      fontWeight: 500,
      fontSize: '18px',
      height: "100%",
      width: "150px",
      color: "white",
      backgroundColor: "#EB752F",
      cursor: "pointer",
      _hover: {
        backgroundColor: "#EB752F",
        outline: "none",
      },
      _focus: {
        backgroundColor: "#EB752F",
        outline: "none",
        border: "none",
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      fontSize: 'inherit',
      color: 'appBlack.600',
      background: 'appTag.200',
      fontWeight: '10px',
      padding: "5px",
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      fontSize: 'inherit'
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      fontSize: '10px',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      backgroundColor: "inherit",
      padding: "0px 10px 0px 0px"
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '20px',
      backgroundColor: state.isSelected ? "#EB752F" : "white",
    }),
  };

  //@ts-ignore
  const { formState, setFormState } = useOutletContext();

  const handleBtnClick = () => {
    navigate({ pathname: SEARCH_PAGE, search: `?userType=${formState?.userTypeToSearch}&text=${formState.textToSearch}` });
  }

  return (
    <>
      <motion.div className="page-layout"
        initial={{ opacity: 0, scale: "99%" }}
        animate={{ opacity: 1, scale: "100%" }}
        // transition={{ duration: 0.5 }} 
        >
        <AppHeroSectionSearchBar reactSelectStyles={reactSelectStyles} setFormState={setFormState} formState={formState} onButtonClick={() => handleBtnClick()} onToggle={onToggle} h={'72px'} />
        <DashboardListingComponent dashboardData={dashboardData} />
      </motion.div>
      <AppShortcutPopOver />
    </>

  );
}

export default Dashboard;
