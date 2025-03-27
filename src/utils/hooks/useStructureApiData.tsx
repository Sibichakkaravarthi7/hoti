import React from 'react'

const useStructureApiData = () => {
    const structureInflencer = (formData: any) => {
      formData.influencer ={
        interests: formData?.interests?.map((obj: any)=>{return {interest_name: obj.value}})
      }  
      formData.content_category = formData?.content_category.map((obj: any)=>{return {content_category: obj.value}});
      formData.phone = formData?.phone?.replace(/[\s-]/g, "");
      delete formData?.campaign;     
      delete formData?.id;
      delete formData?.tc;
      delete formData?.country;
      delete formData?.interests;
      delete formData?.selectedFiles;
      delete formData?.featured_posts;
      delete formData?.verified;
      delete formData?.verifiedWith; 

      return formData;
    }
    const structureAgency = (formData: any) => {
      formData.agency = {
        "agency_name": formData?.agency_name,
        "website": formData?.website,
        "description": formData?.description,
        "file_ids": formData?.file_ids
      }
      formData.content_category = formData?.content_category?.map((obj: any)=>{return {content_category: obj.value}});
      formData.phone = formData?.phone?.replace(/[\s-]/g, "");
      delete formData?.campaign;
      delete formData?.id;
      delete formData?.company_name;
      delete formData?.description;
      delete formData?.file_ids;
      delete formData?.country;
      delete formData?.tc;
      delete formData?.selectedFiles;
      delete formData?.first_name;
      delete formData?.last_name;
      delete formData?.date_of_birth;
      delete formData?.gender;
      delete formData?.verified;
      delete formData?.verifiedWith; 

      return formData;
    }
    const structureBrand = (formData: any) => {
      formData.brand = {
        "company_name": formData?.company_name,
        "website": formData?.website,
        "description": formData?.description,
        "file_ids": formData?.file_ids,
        "location": formData?.location,
      }
      formData.content_category = formData?.content_category?.map((obj: any)=>{return {content_category: obj.value}});
      formData.phone = formData?.phone.replace(/[\s-]/g, "");
      delete formData?.campaign;
      delete formData?.id;
      delete formData?.company_name;
      delete formData?.description;
      delete formData?.file_ids;
      delete formData?.tc;
      delete formData?.selectedFiles;
      delete formData?.country;
      delete formData?.gender;
      delete formData?.date_of_birth;
      delete formData?.first_name;
      delete formData?.second_name;
      delete formData?.verified;
      delete formData?.verifiedWith; 


      return formData;
    }
  return {structureInflencer, structureAgency, structureBrand}
}

export default useStructureApiData