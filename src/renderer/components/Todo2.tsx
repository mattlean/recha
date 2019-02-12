import React, { Component } from 'react'
import MaterialIcon from '@material/react-material-icon'
import TextField, { Input } from '@material/react-text-field'
import { Draggable } from 'react-beautiful-dnd'

import Todo from '../types/Todo'

interface Props {
  index: number
  todo: Todo
}

interface State {
  value: string
}

class Todo2 extends Component<Props, State> {
  public constructor(props) {
    super(props)
    const { name } = props.todo

    this.state = { value: name }
  }

  public componentDidUpdate(prevProps): void {
    const { todo } = this.props
    if (prevProps.todo !== todo) {
      this.setState({ value: todo.name }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  private handleChange = (evt): void => {
    this.setState({ value: evt.target.value })
  }

  private applyStyles = (isDragging): string => {
    let styles = 'todo-list-item-fns util-cursor-grab'
    if (isDragging) {
      styles += ' util-display-block'
      return styles
    }
    return styles
  }

  public render(): JSX.Element {
    const { index, todo } = this.props
    const id = String(todo.id)
    const { value } = this.state

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div className="todo-list-item">
              <TextField
                label={id}
                floatingLabelClassName="util-display-none"
                leadingIcon={
                  <MaterialIcon
                    icon="drag_indicator"
                    {...provided.dragHandleProps}
                    className={this.applyStyles(snapshot.isDragging)}
                  />
                }
                trailingIcon={
                  <div tabIndex={0} className="todo-list-item-fns">
                    <MaterialIcon icon="edit" />
                    <MaterialIcon icon="delete" className="util-cursor-pointer" />
                  </div>
                }
              >
                <Input value={value} onChange={this.handleChange} />
              </TextField>
            </div>
          </div>
        )}
      </Draggable>
    )
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
  }
}

export default Todo2
