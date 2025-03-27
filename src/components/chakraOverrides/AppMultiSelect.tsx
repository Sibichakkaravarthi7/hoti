import React from 'react';
import { ChakraStylesConfig, CreatableSelect, Select } from 'chakra-react-select';
import { Control, Controller, FieldValues, } from 'react-hook-form';
import { appColors } from '../../theme/foundations/appColor';

interface MultiSelectType {
  fs?: string,
  fw?: number | string;
  bg?: string,
  p?: string,
  h?: string,
  placeholder?: string,
  dropDownIndicator?: boolean,
  options: {
    label: string;
    value: string;
  }[];
  control?: Control<FieldValues, any> | undefined;
  name: string;
  otherProps?: any;
  isError?: boolean;
  onChange?: any
  onInputChange?: any;
  onFocus?: any;
  optionFs?: any;
  controlled?: boolean;
  value?: any;
  normalSelect?: boolean;
  isSearchable?: boolean;
  defaultValue?: any;
  required?: boolean;
}

const AppMultiSelect: React.FC<MultiSelectType> = ({ options, value, bg, dropDownIndicator, placeholder, control, fs, p, h, name, otherProps, fw, isError = false, onChange, onInputChange, onFocus, optionFs, controlled = false, normalSelect = false, defaultValue, required = false, isSearchable = true, ...restProps }) => {

  const reactSelectStyles: ChakraStylesConfig = {
    control: (provided, state) => ({
      ...provided,
      textAlign: "left",
      padding: p || '0.25em',
      backgroundColor: bg || '#EDEEEF',
      borderRadius: '0',
      fontWeight: fw || 400,
      fontSize: fs || '18px',
      height: h ? h : "auto",
      width: "100%",
      outline: isError ? "2px solid rgb(252, 129, 129)" : "none",
      _focus: {
        borderColor: "transparent",
        background: bg || "appGrey.200",
      },
      _hover: {
        backgroundColor: bg || "appGrey.200"
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      fontSize: 'inherit',
      color: 'appBlack.600',
      backgroundColor: appColors.appTag[200],
      fontWeight: '10px',
      padding: "5px",
    }),
    valueContainer:(provided, state)=>({
      ...provided,
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
      display: dropDownIndicator ? "initial" : "none",
      backgroundColor: "inherit",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: optionFs || '20px',
      backgroundColor: 'appGrey.200',
      color: "black",
      _active:{
        background: appColors.appPrimary[600],
        color: "white",
      }
    }),
  };

  if (normalSelect) {
    return (
      <Select
        options={options}
        placeholder={placeholder ?? "select"}
        chakraStyles={reactSelectStyles}
        onChange={onChange}
        onInputChange={onInputChange}
        isMulti={false}
        defaultValue={defaultValue}
        isSearchable={isSearchable}
        required={required}
        name={name}
      />
    )
  }

  if (control) {
    return (<Controller
      name={name}
      control={control}
      {...restProps}
      render={({ field,
        fieldState: { invalid, error } }) =>
        <Select {...field}
          name={name}
          {...restProps}
          // otherProps={otherProps}
          options={options}
          isMulti
          placeholder={placeholder ?? "Search for influencers, brands and agencies"}
          chakraStyles={reactSelectStyles}
          //{ onChange={onChange}}
          onInputChange={onInputChange}
          onFocus={onFocus}


        />}
    />)
  }

  if (controlled) {
    return (<Select
      onChange={onChange}
      options={options}
      isMulti
      placeholder={placeholder ?? "select"}
      chakraStyles={reactSelectStyles}
      value={value}
      onInputChange={onInputChange}
    />)
  }

  return (<Select

    name={name}
    // otherProps={otherProps}
    {...restProps}
    options={options}
    isMulti
    placeholder={placeholder ?? "select"}
    chakraStyles={reactSelectStyles}

  />
  );
};

export default AppMultiSelect;
