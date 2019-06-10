import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DashboardService } from '../services/DashboardService';
import { AddAction } from './AddAction';
import { NavLink } from 'react-router-dom'
import randomColor from 'randomcolor'

export const DashboardList = props => {
  const [dashboards, setDashboards] = useState([])
  useEffect(() => {
    DashboardService.getAll().then(setDashboards)
  }, [])
  return (
    <StyledDashboardList>
      {dashboards.map(({ id, name }) => <DashboardElement key={id} name={name} id={id}/>)}
      <AddElement/>
    </StyledDashboardList>
  )
}

const DashboardElement = props => {
  const { name, id } = props
  const [isMouseOver, setIsMouseOver] = useState(false)
  return (
    <Link to={"/" + id}>
      <StyledElement className={isMouseOver && "focused"} onMouseEnter={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)}>
        {isMouseOver ? name : name[0]}
      </StyledElement> 
    </Link>
  )
}

const AddElement = props => {
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const mouseEnter = () => setIsMouseOver(true)
  const mouseLeave = () => setIsMouseOver(false)
  const focus = () => setIsFocused(true)
  const blur = () => setIsFocused(false)
  const visible = isMouseOver || isFocused
  return (
    <StyledAddElement className={visible && "focused"} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <AddAction classes="dashboard" hidden={!visible} onFocusIn={focus} onFocusOut={blur}/>
    </StyledAddElement> 
  )
}

const StyledDashboardList = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  z-index: 100;
  position: fixed;
  height: 100%;
`

const StyledElement = styled.div`
  background-color: ${() => randomColor()};
  border-radius: 24px;
  padding: 12px 16px;
  white-space: nowrap;
  max-width: min-content;
  font-size: 18px;
  font-weight: 600;
  
  &.focused {
    box-shadow: 2px 5px 18px -10px rgba(0, 0, 0, 0.75);
  }
`

const StyledAddElement = styled(StyledElement)`
  max-width: min-content;
  margin: 20px 40px;
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