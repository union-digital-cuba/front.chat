import React from 'react'

import LoaderGif from 'assets/gifs/loader.gif'
import { CustomContainer } from 'components'

const CustomLoader = () => {
  return (
    <CustomContainer>
      <img src={LoaderGif} alt="" />
    </CustomContainer>
  )
}

export default CustomLoader
