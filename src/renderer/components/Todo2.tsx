import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Todo2 = ({ index, todo }): ReturnType<typeof Todo2> => {
  const { name, id } = todo
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid grey' }}>
            <div
              {...provided.dragHandleProps}
              style={{
                width: '20px',
                height: '20px',
                marginLeft: '8px',
                marginRight: '8px',
                backgroundColor: 'rebeccaPurple'
              }}
            />
            <p>{name}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Todo2
