import React from 'react'
import { DashboardDataI } from '../Types'
import AppListsContainer from './AppListsContainer'
import AppShortcutPopOver from './AppShortcutPopover'
import AppProfilePreviewCard from './influencer/AppProfilePreviewCard'
import DashboardSkeleton from './LoaderSkeleton/DashboardSkeleton'

const DashboardListingComponent = ({ dashboardData }: { dashboardData: DashboardDataI }) => {
    return (
        <>
            {dashboardData ? (
                <>
                    {dashboardData?.data.map((obj: any) => (
                        <AppListsContainer isLoading={false} key={obj.title} heading={obj.title} gridColumns={7} gridTemplateColumns={["repeat(7, 145px)", "repeat(7, minmax(0, 1fr))"]}>
                            {obj.data.slice(0, 7)?.map((cardObj: any) => (
                                <AppProfilePreviewCard
                                    cardData={cardObj}
                                    key={cardObj.id}
                                    variant={'profilePreview'}
                                    profile_id={cardObj?.id}
                                />
                            ))}
                        </AppListsContainer>
                    ))}
                </>
            ) : <DashboardSkeleton />
            }
        </>)
}

export default DashboardListingComponent