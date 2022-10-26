import React from 'react'

import './style.css'

const CustomForm = ({ handleOnSubmit, logoComponent, submitButton, footer, children }) => {
  return (
    <div>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        {logoComponent}
        <div className="form-children">{children}</div>
        {submitButton}
        {footer}
      </form>
    </div>
  )
}

export default CustomForm
