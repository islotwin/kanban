import styled from 'styled-components'

export const DashboardElement = styled.div`
  background-color: ${props => props.color ? props.color : "#eee"};
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