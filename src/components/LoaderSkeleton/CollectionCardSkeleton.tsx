import { AspectRatio, Box, SimpleGrid } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import React from 'react'

const CollectionCardSkeleton = () => {
    return (
        <Box border={"1px solid rgb(233, 233, 233)"} maxW="288px" p="12.5px 10px">
            <SimpleGrid  columns={2} spacing={5}>
                {[0, 2, 3, 1]?.slice(0, 4)?.map((each, index) => (

                    <Skeleton key={each} h="100%" w="100%" maxH={"137px"} maxW="137xpx">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus tempora laboriosam cum voluptatibus sint amet voluptate delectus sunt soluta cupiditate sed maxime quisquam illo, labore eum nisi assumenda? Quos voluptatum repellat, porro minus similique, voluptate dicta repudiandae voluptas neque omnis recusandae vitae sunt nam. Assumenda amet quam accusamus, architecto sit optio error suscipit tempora consequuntur, dolore quia eligendi labore! Fugit nulla architecto sint. Ipsum voluptatum eaque officiis, cumque impedit quisquam a voluptate minima tempore. Aliquid, enim. Ea rerum, totam quis corporis quo, 
                    </Skeleton>


                ))}
            </SimpleGrid>
            <Skeleton mt="20px" w="60%" >
                ddd
            </Skeleton >
        </Box>

    )
}

export default CollectionCardSkeleton