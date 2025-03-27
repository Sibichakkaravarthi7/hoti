import { Box } from '@chakra-ui/layout'
import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const AppAlert = ({ status = "success", message = "Successfull" }: { status: string; message?: string }) => {
    const currStatus = status == "success" ? true : false
    return (
        <>
            <Box
                className="custom-toast"
                bg={currStatus ? '#C6F6D5' : '#FED7D7'}
                borderRadius={'12px'}
                boxShadow={'0px 0px 6px -1px black'}
                title={''}>
                <Box color={'green'} p="20px" fontWeight={700} fontSize="20px">
                    <Alert status={status == "success" ? "success" : "error"} variant="subtle">
                        <AlertIcon height={'20px'} width={'20px'} />
                        {message}
                    </Alert>
                </Box>
            </Box>
        </>
    )
}

export default AppAlert