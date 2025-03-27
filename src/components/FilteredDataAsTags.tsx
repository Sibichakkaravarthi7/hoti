import React from 'react'
import { appColors } from '../theme/foundations/appColor'
import AppBox from './chakraOverrides/AppBox'
import AppButton from './chakraOverrides/AppButton'
import AppFlex from './chakraOverrides/AppFlex'
import AppText from './chakraOverrides/AppText'

const FilteredDataAsTags = () => {
    const dummyData = [
        {
            title: "Location",
            filterCollection: [
                "Chennai", "Bangalore",
            ]
        },
        {
            title: "Gender",
            filterCollection: [
                "Women",
            ]
        },
        {
            title: "Followers",
            filterCollection: [
                "500k - 1M",
            ]
        }
    ];
    const removeSingleFilter = (title: string) => {
        // console.log("removed title", title);
    }
    const removeAllFilter = () => {
        // console.log("Removed  All");
    }

  return (
      <AppFlex gap={"10px"} alignItems="center" customStyles={{ color: appColors.appBlack[600] }}>
          {dummyData.map((data) => (<AppFlex key={data.title} customStyles={{ padding: "5px",  border: ".5px solid rgb(58,57,57)" }}>
              <AppText fontSize='18px' fontWeight={700} customStyles={{ marginRight: "8px" }}>
                  {data.title}:
              </AppText>
              {data.filterCollection.map((coll, ind) => (
                  <AppText fontSize='18px' fontWeight={400} key={coll} customStyles={{ marginRight: "3px" }}>
                      {coll}{data.filterCollection[ind + 1] && `,`}
                  </AppText>
              ))}
              <AppButton customStyles={{ background: "white", padding: "0px", fontSize: "13px", fontWeight: "medium" }} onClick={()=> removeSingleFilter(data.title)}>
                x
              </AppButton>
          </AppFlex>))}
          <AppButton customStyles={{ p: "0px" }} variant="noBgButton">
            <AppText variant='body1' onClick={()=>removeAllFilter()}>
              Clear Filters  
            </AppText>
          </AppButton>
      </AppFlex>
  )
}

export default FilteredDataAsTags