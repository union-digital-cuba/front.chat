import React from 'react'

import './style.css'

import { Text } from '@nextui-org/react'
import CustomCard from 'components/Card'

const CustomForm = ({ handleOnSubmit, caption, submitButton, footer, children }) => {
  const CardForm = (
    <CustomCard
      headerComponent={<Text b>{caption}</Text>}
      bodyComponent={<div className="form-children">{children}</div>}
      footerComponent={
        <>
          {submitButton}
          {footer}
        </>
      }
    />
  )

  return (
    <div>
      <form onSubmit={(event) => handleOnSubmit(event)}>{CardForm}</form>
    </div>
  )
}

export default CustomForm
