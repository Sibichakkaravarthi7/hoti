import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface AppFormFieldWrapperType {
  label?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
  htmlFor: string;
  labelFontWeight?: any;
  labelFontSize?: any;
}
// interface AppFormFieldType {
//     label?: string;
//     type: string;
//     helperText?: string;
//     required?: boolean;
//     register: UseFormRegister<FieldValues>;
//     registerName: string;
//     placeholder?: string;
// }

// const AppFormField = ({ label, type, helperText, required, register, registerName, placeholder }: AppFormFieldType) =>
//     <FormControl isRequired={required} >
//     <FormLabel>{label}</FormLabel>
//     {
//         type === 'text-area'
//         ?
//         <AppTextArea {...register(registerName)} placeholder={placeholder} />
//         :
//         <AppInput type={type} {...register(registerName)} placeholder={placeholder} />
//     }
//     {helperText && <FormHelperText>{helperText}</FormHelperText>}
// </FormControl>

const AppFormFieldWrapper = ({ label, required, helperText, htmlFor, children, labelFontWeight = '500', labelFontSize = 'sm' }: AppFormFieldWrapperType) => (
  <FormControl isRequired={required} position="relative">
    <FormLabel htmlFor={htmlFor} fontSize={labelFontSize} fontWeight={labelFontWeight}>{label}</FormLabel>
    {children}
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl >
);

export default AppFormFieldWrapper;
