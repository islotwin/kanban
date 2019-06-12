import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DashboardService } from '../services/DashboardService';
import { AddAction } from './AddAction';
import { NavLink } from 'react-router-dom'
import { toArray } from '../utils/toArray';

export const DashboardList = props => {
  const [dashboards, setDashboards] = useState([])
  const fetchDashboards = () => {
    DashboardService.getAll()
      .then(toArray)
      .then(dashboards => dashboards.map(({ id, name, color }) => ({ id, name, color })))
      .then(setDashboards)
  }
  const addDashboard = dashboard => {
    DashboardService.create(dashboard).then(fetchDashboards)
  }
  useEffect(fetchDashboards, [])
  return (
    <StyledDashboardList>
      {dashboards.map(({ id, name, color }) => <DashboardElement key={id} name={name} id={id} color={color}/>)}
      <AddElement onSubmit={addDashboard}/>
    </StyledDashboardList>
  )
}

const DashboardElement = props => {
  const { name, id, color } = props
  const [isMouseOver, setIsMouseOver] = useState(false)
  return (
    <Link to={"/" + id}>
      <StyledElement 
        className={isMouseOver && "focused"} 
        onMouseEnter={() => setIsMouseOver(true)} 
        onMouseLeave={() => setIsMouseOver(false)}
        color={color}
      >
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
      <AddAction 
        className="dashboard" 
        hidden={!visible} 
        onFocusIn={focus} 
        onFocusOut={blur} 
        onSubmit={props.onSubmit}
      />
    </StyledAddElement> 
  )
}

const StyledDashboardList = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  z-index: 100;
  position: absolute;
`

const StyledElement = styled.div`
  background-color: ${props => props.color ? props.color : "#90FFAE"};
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