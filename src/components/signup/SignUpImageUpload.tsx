/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { border, Box, Checkbox, CloseButton, Flex, HStack, Spinner, Stack } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import AppText from '../chakraOverrides/AppText';
import { AddFile } from '../../utils/customIcons';
import { appColors } from '../../theme/foundations/appColor';
import makePostRequest from '../../api/utils/makePostRequest';
import { GET_FILE_ID } from '../../api/url/common';
import { useMutation } from '@tanstack/react-query';

function SignUpImageUpload() {
  const { register, handleSubmit, watch, setValue } = useFormContext();

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files);
    console.log("files........", files)
    if (watch('selectedFiles')?.length + files.length <= 3) {
      //@ts-ignore
      setValue('selectedFiles', [...watch('selectedFiles'), ...files]);
      const formdata = new FormData();
      files?.map((obj) => {
        //@ts-ignore
        formdata.append("media_files", obj);
      })
      //@ts-ignore
      fileUploadMutate(formdata);
    }
  }
  const { isLoading: fileUploadLoading, error: fileUploadError, mutate: fileUploadMutate } = useMutation((body) =>
    makePostRequest(GET_FILE_ID, body), {
    onSuccess: (res) => {
      const idArr = res?.detail?.map((obj: any) => {
        return obj.id
      })
      if (watch("file_ids")) {
        setValue("file_ids", [...watch("file_ids"), ...idArr]);
      } else {
        setValue("file_ids", [...idArr]);
      }

    },
    onError: (err) => console.log("err", err)
  }
  );
  const emptyFilesSelected = () => {
    setValue('selectedFiles', []);
    // setValue("campaign_media", [])
  };

  const showUploadedFileList = () => {
    console.log("watch('selectedFiles') outside", watch('selectedFiles'))
    if (watch('selectedFiles')?.length == watch("file_ids")?.length) {
      console.log("watch('selectedFiles') inside", watch('selectedFiles'))
      return watch('selectedFiles')?.map((file: any) => (
        <Box p="2px 5px" bg={appColors.appPrimary[600]} color="white" key={file?.lastModified}>{file?.name}</Box>
      ))
    } else {
      return <Spinner key={0} color={appColors.appPrimary[600]} />
    }
  };
  return (
    <Box py="4em">
      <AppText size='textmedium1' customStyles={{ mt: "-20px", mb: "10px" }}>Our verification process requires you to upload either one of your PAN card, income certificate or GST document.</AppText>
      <AppText size='textmedium1' customStyles={{ mb: "20px" }}>Verification can take up to a few days.</AppText>
      <div style={{ width: '100%', display: 'grid', gap: '2.4em' }}>
        {watch('selectedFiles').length > 0 && <Flex alignItems={"flex-end"} justifyContent={"space-between"}>
          <Flex mt="5px" gap={"7px"}>
            {showUploadedFileList()}
          </Flex>
          <Box ml={"10px"} onClick={() => emptyFilesSelected()}><CloseButton fontSize={"10px"} /></Box>
        </Flex>}
        <Box style={{ background: "#F6F6F7", borderRadius: "10px", border: "1px solid #9D9D9D" }} height={["100px", "323px"]}>
          <input accept='image/*, application/pdf' multiple onChange={(e) => handleImageUpload(e)} style={{ display: "none", border: "1px solid red" }} type={'file'} id="related-img-vids" />
          <label htmlFor='related-img-vids' role={"button"} style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <Flex color={appColors.appGrey[800]} alignItems={"center"} gap={"10px"} >
              <AddFile height={"19px"} width={"19px"} />
              <AppText>
                Upload Media
              </AppText>
            </Flex>
          </label>
        </Box>
        <Checkbox variant={"blackOulined_17"} size="lg" {...register('tc')}>
          <AppText customStyles={{ fontSize: "base", ml: "10px" }}>
            I have read and I agree to HOTI’s
            <AppText fontWeight="semibold" fontSize="base" customStyles={{ display: 'inline-block', px: "3" }}>
              Privacy Policy
            </AppText>
            and
            <AppText fontWeight="semibold" fontSize="base" customStyles={{ display: 'inline-block', pl: "3" }}>
              T&C
            </AppText>
          </AppText>
        </Checkbox>
      </div>
    </Box>
  );
}

export default SignUpImageUpload;
