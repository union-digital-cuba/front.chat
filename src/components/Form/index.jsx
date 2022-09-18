import React from 'react'

import './style.css'

const CustomForm = ({ handleOnSubmit, logoComponent, submitButton, footer, children }) => {
  return (
    <div>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        {logoComponent}
        {children}
        {submitButton}
        {footer}
      </form>
    </div>
  )
}

export default CustomForm
