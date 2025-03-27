import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define custom variants
const variants = {
  notification: {
    list: {
      width: ["200px", "409px"],
      maxHeight: ["300px", "500px"]
      // p: ["17px 27px"],
    },
    item: {
        fontSize: "14px",
      p: ["17px 27px"],
    }
  },

}

// export the custom variants in the component theme
export const menuTheme = defineMultiStyleConfig({ variants })