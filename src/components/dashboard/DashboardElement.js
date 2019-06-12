import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { hover } from '../../hoc/hover';

export const DashboardElement = hover(props => {
  const { name, id, color, isHovered } = props
  return (
    <Link to={"/" + id}>
      <StyledElement 
        className={isHovered && "focused"} 
        color={color}
      >
        {isHovered ? name : name[0]}
      </StyledElement> 
    </Link>
  )
})

export const StyledElement = styled.div`
  background-color: ${props => props.color ? props.color : "#90FFAE"};
  border-radius: 24px;
  padding: 12px 16px;
  white-space: nowrap;
  max-width: min-content;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  
  &.focused {
    box-shadow: 2px 5px 18px -10px rgba(0, 0, 0, 0.75);
  }
`

const Link = styled(NavLink)`
  outline: none;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  max-width: min-content;
  margin: 20px 40px;

  &.active, &:hover {
      font-weight: 600;
  }
`