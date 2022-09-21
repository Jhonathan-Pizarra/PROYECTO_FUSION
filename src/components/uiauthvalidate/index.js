import React from 'react'

const Index = ({children,data,error}) => {

    if (error) {
      return <div>errorsssssss</div>
    }
    if (!data) {
      return <div>...loading</div>
    }
  return (
    <>{children}</>
  )
}

export default Index