import React from 'react'

export default ({message, className}) => {
  return (
    <div className={className} style={{ marginTop : "10px",  textAlign: "center"}} role="alert">
    {message}
  </div>
  )
}
