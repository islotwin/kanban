import React from 'react'
import styled from 'styled-components'
import { EditAction } from './EditAction';
import { DragDropContext } from 'react-beautiful-dnd';
import { List } from './List';
import { toArray } from '../utils/toArray';

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
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
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
  height: 100%;
`