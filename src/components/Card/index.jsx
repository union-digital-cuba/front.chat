import React from 'react'

import './style.css'

import { Card } from '@nextui-org/react'

const CustomCard = ({ headerComponent, bodyComponent, footerComponent, dividerHeaderBody, dividerBodyFooter }) => {
  return (
    <Card variant="bordered" isHoverable>
      <Card.Header css={{ jc: 'center' }}>{headerComponent}</Card.Header>
      {dividerHeaderBody && <Card.Divider />}
      <Card.Body css={{ py: '$12' }}>
        <div className="form-children">{bodyComponent}</div>
      </Card.Body>
      {dividerBodyFooter && <Card.Divider />}
      <Card.Footer className="card-footer" css={{ ai: 'unset' }}>
        {footerComponent}
      </Card.Footer>
    </Card>
  )
}

export default CustomCard
