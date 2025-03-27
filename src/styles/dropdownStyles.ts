import { ChakraStylesConfig } from "chakra-react-select";

const reactSelectStyles: ChakraStylesConfig = {
    control: (provided, state) => ({
      ...provided,
      textAlign: 'left',
      padding: '0px',
      borderRadius: '0',
      fontWeight: 500,
      fontSize: '18px',
      height: '100%',
      width: '150px',
      color: 'white',
      backgroundColor: '#EB752F',
      cursor: 'pointer',
      border: 'none',
      _hover: {
        backgroundColor: '#EB752F',
        outline: 'none'
      },
      _focus: {
        backgroundColor: '#EB752F',
        outline: 'none',
        border: 'none'
      }
    }),
    multiValue: (provided, state) => ({
      ...provided,
      fontSize: 'inherit',
      color: 'appBlack.600',
      background: 'appTag.200',
      fontWeight: '10px',
      padding: '5px'
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      fontSize: 'inherit'
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      fontSize: '10px'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      backgroundColor: 'inherit',
      padding: '0px 10px 0px 0px'
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '20px',
      backgroundColor: state.isSelected ? '#EB752F' : 'white'
    })
  };
export default reactSelectStyles;