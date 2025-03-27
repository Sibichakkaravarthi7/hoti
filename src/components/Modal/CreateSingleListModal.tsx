import { HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CREATE_WISHLIST } from '../../api/url/common'
import makeGetRequest from '../../api/utils/makeGetRequest'
import AppButton from '../chakraOverrides/AppButton'
import AppInput from '../chakraOverrides/AppInput'
import { COLLECTIONS_LIST_PAGE } from '../../navigation/routes/common-routes'
import makePostRequest from '../../api/utils/makePostRequest'

const CreateSingleListModal = ({ onClose, onSuccessAction, abortAction }: { onClose?: any; onSuccessAction?: any; abortAction?: any }) => {
  const navigate = useNavigate();
  const { isLoading, isError, mutate: mutateCreateList } = useMutation((body) => makePostRequest(CREATE_WISHLIST, body), {
    onSuccess: () => {
      if(onSuccessAction){
        onSuccessAction();
      }else {
        navigate(COLLECTIONS_LIST_PAGE);
      }
    }
  });

  const {
    register,
    watch,
    formState: { errors }
  } = useForm();

  const createList = () => {
    const formData = {
      "list_name": watch('listname')
    }
    //@ts-ignore
    mutateCreateList(formData);
  };

  const handleAbort = () => {
    if(abortAction){
      abortAction();
    }else{
      onClose();
    }
  }

  return (
    <Stack>
      <AppInput {...register('listname', { required: true })} type="text" placeholder="Enter the name of your list" />
      <HStack justifyContent={'center'} gap="10px" padding={'26px 0px 17px 0px'}>
        <AppButton onClick={() => handleAbort()} variant="onlyThickBorderBlack">
          Cancel
        </AppButton>
        <AppButton onClick={() => createList()} isDisabled={isLoading || !watch('listname')} variant="fillBrandColor">{isLoading ? <Spinner /> : "Create List"}</AppButton>
      </HStack>
      {isError && <Text textAlign={"center"} color={"red"} fontSize="12px" >An Error Occured</Text>}
    </Stack>
  )
}

export default CreateSingleListModal