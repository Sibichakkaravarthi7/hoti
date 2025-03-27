import React from 'react'
import InfluencerFilter from './search/InfluencerFilter'
import OthersFilter from './search/OthersFilter'

const FilterContainer = ({ formState, category_meta, locationMetaData, initiateSearch, filters, setFilters, setLocationText, resetFilter }: { formState: any; category_meta: any; locationMetaData: any; initiateSearch: any; filters: any; setFilters: any; setLocationText: any; resetFilter: any }) => {
    console.log("locationMetaData", locationMetaData)
    const getOptionStructure = (arr: any) => {
        const arrToReturn = arr?.map((obj: any) => {
            return {
                label: obj?.content_category,
                value: obj?.content_category
            };
        });
        return arrToReturn;
    };
    return (
        <>
            {formState?.userTypeToSearch == 'influencer' ? (
                <InfluencerFilter
                    categoryMeta={getOptionStructure(category_meta?.content_category)}
                    locationMeta={locationMetaData}
                    applyBtn={initiateSearch}
                    filters={filters}
                    setFilters={setFilters}
                    setLocationText={setLocationText}
                    resetFilter={resetFilter}
                />
            ) : (
                <OthersFilter
                    categoryMeta={getOptionStructure(category_meta?.content_category)}
                    locationMeta={locationMetaData}
                    applyBtn={initiateSearch}
                    filters={filters}
                    setFilters={setFilters}
                    resetFilter={resetFilter}
                    setLocationText={setLocationText}
                />
            )}</>
    )
}

export default FilterContainer