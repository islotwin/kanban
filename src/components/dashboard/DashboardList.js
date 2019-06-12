import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DashboardService } from '../../services/DashboardService';
import { AddDashboardAction } from '../AddAction';
import { toArray } from '../../utils/toArray';
import { DashboardElement, StyledElement } from './DashboardElement';

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
      <AddDashboardAction 
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

const StyledAddElement = styled(StyledElement)`
  max-width: min-content;
  margin-top: 20px;
`