// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Box, HStack, InputGroup, InputLeftElement, InputRightElement, SelectProps } from '@chakra-ui/react';
import { ControlProps, InputProps } from 'chakra-react-select';
import React, { ReactNode } from 'react'
import { Control, FieldValues, RegisterOptions } from 'react-hook-form';
import { SearchIcon } from '../utils/customIcons';
import AppInput from './chakraOverrides/AppInput';
import AppBox from './chakraOverrides/AppBox';
import AppMultiSelect from './chakraOverrides/AppMultiSelect';

// ----props---- 
// isMulti - to enable multiselect feature using chakra-react-select
// options - array of options to pass in multiselect
// control, name - props must  be passsed when using isMulti and decided to use react hook form pass this prop
// default(no isMulti) - input field with search type 
// {...register()} - if decided to manage state using react hook form
// icon to the left or right  can be added  using <AppIcon />


// ---- limitation that can be fixed ---
// this component isn't capable of using inline styles of chakra ui
// all chakra-react-select's Select component props are not exposed to AppSearch props 
// typescript - conditional type needs to applied
// not flexible enough right now to pass state or setState to handle state without react-hook-form
// ui styles are customized at two place AppMultiselect when using multiselect and in theme -> components input and (or) select styles , So no single source of truth for styles

interface commonType {
    placeholder?: string;
    value?: InputProps['value'] | SelectProps['value'];
    defaultValue?: InputProps['value'] | SelectProps['value'];
    onChange?: (e: any) => any;
    onInputChange?: (e: any) => any;
    onFocus?: (e: any) => any;
    onWheel?: (e: any) => any;
    id?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    variant?: string;
    ref?: React.Ref<any>;
    size?: InputProps['size'] | SelectProps['size'];
    isInvalid?: boolean;
    onKeyPress?: (e: any) => any;
    name: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    bgColor?: string;
    fs?: string,
    bg?: string,
    p?: string,
    h?: string,
}

interface AppInputSearchType extends commonType {
    register?: any;
    label?: string;
    customStyles?: InputProps;
    isMulti?: boolean;
}

interface AppMultiSelectType extends commonType {
    isMulti?: boolean;
    dropDownIndicator?: boolean,
    options: {
        label: string;
        value: string;
    }[];
    control?: Control<FieldValues, any> | undefined;
}

type GeneralType = AppInputSearchType | AppMultiSelectType;


const AppSearch = (props: GeneralType) => {
    let comp;
    if (props?.isMulti) {
        comp = <AppMultiSelect
            width="100%"
            options={props.options}
            control={props?.control}
            name={props.name}
            h={props?.h}
            onChange={props?.onChange}
            onInputChange={props?.onInputChange}
            onFocus={props?.onFocus}
        />
    } else {
        comp = <AppInput
            size={props.size}
            type="search"
            variant={props.variant}
            customStyles={{ pl: props?.iconLeft ? "2.5em" : "1em", pr: props?.iconRight ? "2.5em" : "1em", }}
            {...props?.register}
            name={props.name}
            label={props.label}
        />;
    }




    if (props?.isMulti) {
        if (props.iconLeft) {
            return (
                <HStack bg={props.bgColor} gap="0" pl="10px">
                    <HStack flexBasis="1%" justifyContent={"center"}>
                        <SearchIcon boxSize={6} />
                    </HStack>
                    <AppBox customStyles={{ flexBasis: "97%" }}>
                        {comp}
                    </AppBox>
                    
                </HStack>
            )
        }

        return comp;
    }

    if (props.iconLeft || props.iconRight) {
        return <InputGroup>
            {props.iconLeft && <InputLeftElement pointerEvents='none' h="100%" w="10%" px="1em" color="appBlack.600">{props.iconLeft}</InputLeftElement>}
            {comp}
            {props.iconRight && <InputRightElement>{props.iconRight}</InputRightElement>}
        </InputGroup>
    }

    return comp;
}

export default AppSearch

