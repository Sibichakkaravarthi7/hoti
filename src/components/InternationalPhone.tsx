import React from 'react'
import { PhoneInput } from 'react-international-phone'

const InternationalPhone = ({ watch, phoneChange, isError = false, otherProps, fs="18px" }:{watch: any; phoneChange: any; isError?:boolean, otherProps?: any, fs?: string }) => {
    return (
        <><PhoneInput
            defaultCountry="in"
            value={watch('phone')}
            onChange={(num) => phoneChange(num)}
            style={{ gap: "10px" }}
            countrySelectorStyleProps={{
                buttonStyle: {
                    background: "#EDEEEF",
                    padding: "21.5px 10px",
                    borderRadius: "0px",
                    border: isError? "2px solid #FC8181" : "2px solid transparent",
                }
            }}
            inputStyle={{
                background: "#EDEEEF", width: "100%",
                padding: "21.5px 10px", fontSize: fs,
                border: isError? "2px solid #FC8181" : "2px solid transparent",
                borderRadius: "0px",
            }}
        /></>
    )
}

export default InternationalPhone