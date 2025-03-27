import { Box, Flex } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { GET_SEARCH_META } from '../api/url/common';
import makeGetRequest from '../api/utils/makeGetRequest';
import { SEARCH_PAGE } from '../navigation/routes/common-routes';

const CustomAppSearch = ({ setFormState, formState, text, onEnterPress }: { setFormState: any, formState: any, text: any, onEnterPress: any }) => {
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate();
    const [value] = useDebounce(formState.textToSearch, 200);
    const [type] = useDebounce(formState.userTypeToSearch, 200);

    const { data: metaData, isLoading, isError, refetch } = useQuery(["search", type, value], () => makeGetRequest(GET_SEARCH_META(type, value || '')));

    useEffect(() => {
        refetch();
    }, [type, value, refetch]);


    const handleOptionClick = async (opt: string) => {
        await setFormState({ ...formState, textToSearch: opt })
        navigate({ pathname: SEARCH_PAGE, search: `?userType=${formState?.userTypeToSearch}&text=${opt}` });
        // setShow(false);
    }
    const handleBlur = () => {
        setTimeout(() => {
            setShow(false);
        }, 200)
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            onEnterPress();
            setShow(false);
        }
    };
    return (
        <Box w="100%" height={"100%"} position={"relative"}>

            <Input onKeyDown={(e) => handleKeyPress(e)} py="0px" _focusVisible={{ bg: "" }} height={"100%"} autoComplete="off" name="searchbox" value={formState?.textToSearch} onChange={(e) => setFormState({ ...formState, textToSearch: e.target.value })} onFocus={() => setShow(true)} onBlur={() => handleBlur()} _focus={{ border: "2px solid transparent" }} type={"text"} placeholder="Search for influencers, brands and agencies" w={"100%"} />
            <label htmlFor='searchbox'>
                {show ? <Flex zIndex={9} w="100%" flexFlow={"column"} pos={"absolute"}>
                    {metaData?.full_names?.map((opt: string, ind: number) => <Box onClick={() => handleOptionClick(opt)} role={"button"} _hover={{ bg: "#efefef" }} bg="white" p="10px 20px" fontWeight={400} fontSize="18px" textAlign={"left"} w="100%" key={opt + ind}>{opt}</Box>)}
                </Flex> : ""}
            </label>
        </Box>
    )
}

export default CustomAppSearch