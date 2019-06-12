import React from 'react'
import styled from 'styled-components'
import { EditAction } from '../EditAction';
import { DragDropContext } from 'react-beautiful-dnd';
import { List } from './List';
import { toArray } from '../../utils/toArray';

export const ListArea = props => {
  const renderLists = () => {
    const lists = toArray(props.lists)
    return lists.map(list => {
      return <List 
        key={list.id} 
        {...list}
      />
    })
  }
  const onDragEnd = ({ draggableId, source, destination }) => {
    if(!destination) {
      return
    }
    const { droppableId: sourceId } = source
    const { droppableId: destinationId } = destination
    
    const goneUp = destination.index > source.index
    const changedList = destinationId !== sourceId
    const indexDelta = goneUp && !changedList ? 0.5 : -0.5
    const taskIndex = destination.index + indexDelta

    return props.onDragEnd({ taskIndex, sourceId, destinationId, taskId: draggableId })
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Lists>
        {renderLists()}
        <EditAction placeholder="Add a list..." onSubmit={props.addList}/>
      </Lists>
    </DragDropContext>
  )
}

const Lists = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
  flex-grow: 1;
`