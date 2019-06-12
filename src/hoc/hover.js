import React, { useState } from 'react'

export const hover = Component => {
  return props => {
    const [isHovered, setIsHovered] = useState(false)
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Component 
          {...props} 
          isHovered={isHovered}
        /> 
      </div>
    )
  }
}