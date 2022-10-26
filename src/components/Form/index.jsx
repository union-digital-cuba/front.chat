import React from 'react'

import './style.css'

import { Card, Text } from '@nextui-org/react'

const CustomForm = ({ handleOnSubmit, caption, submitButton, footer, children }) => {
  const CardForm = (
    <Card variant="bordered" isHoverable>
      <Card.Header css={{ jc: 'center' }}>
        <Text b>{caption}</Text>
      </Card.Header>
      <Card.Divider className="card-divider" />
      <Card.Body css={{ py: '$12' }}>
        <div className="form-children">{children}</div>
      </Card.Body>
      <Card.Footer className="card-footer" css={{ ai: 'unset' }}>
        {submitButton}
        {footer}
      </Card.Footer>
    </Card>
  )

  return (
    <div>
      <form onSubmit={(event) => handleOnSubmit(event)}>{CardForm}</form>
    </div>
  )
}

export default CustomForm
