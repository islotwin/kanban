import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { hover } from '../../hoc/hover';
import { DashboardElement } from './DashboardElement';

export const DashboardLink = hover(props => {
  const { name, id, color, isHovered } = props
  return (
    <Link to={"/" + id}>
      <DashboardElement 
        className={isHovered && "focused"} 
        color={color}
      >
        {isHovered ? name : name[0]}
      </DashboardElement> 
    </Link>
  )
})

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