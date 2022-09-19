import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const CustomSpan = ({ text, redirectTo, redirectText }) => {
  return (
    <span>
      {`${text} `}
      <Link to={redirectTo}>{redirectText}</Link>
    </span>
  )
}

export default CustomSpan
