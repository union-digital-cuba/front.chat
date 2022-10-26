import React from 'react'
import './style.css'

const CustomSpan = ({ text, actionComponent }) => {
  return (
    <span>
      {`${text} `}
      {actionComponent}
    </span>
  )
}

export default CustomSpan
