import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

import { Card } from '@nextui-org/react'

const CustomCard = ({ headerComponent, bodyComponent, footerComponent, dividers }) => {
  const { up, down } = dividers

  return (
    <Card variant="bordered" isHoverable>
      <Card.Header css={{ jc: 'center' }}>{headerComponent}</Card.Header>
      {up && <Card.Divider />}
      <Card.Body css={{ py: '$12' }}>
        <div>{bodyComponent}</div>
      </Card.Body>
      {down && <Card.Divider />}
      <Card.Footer className="card-footer" css={{ ai: 'unset' }}>
        {footerComponent}
      </Card.Footer>
    </Card>
  )
}

CustomCard.propTypes = {
  dividers: PropTypes.object,
}

CustomCard.defaultProps = {
  dividers: { up: true, down: false },
}

export default CustomCard
