import React, { Component } from 'react'
import { connect } from 'react-redux'
import MaterialIcon from '@material/react-material-icon'
import TextField, { Input } from '@material/react-text-field'
import { Draggable } from 'react-beautiful-dnd'

import { ActionSelectTodo } from '../types/actions'
import { default as TodoType } from '../types/Todo'
import { selectTodo as acSelectTodo } from '../actions/todos'

interface DispatchProps {
  selectTodo: (todo: TodoType) => ActionSelectTodo
}

interface OwnProps {
  index: number
  todo: TodoType
}

type Props = DispatchProps & OwnProps

interface State {
  value: string
}

class Todo extends Component<Props, State> {
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

  private handleFocus = (): void => {
    const { selectTodo, todo } = this.props
    selectTodo(todo)
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
                trailingIcon={<MaterialIcon icon="keyboard_arrow_right" />}
              >
                <Input value={value} onChange={this.handleChange} onFocus={this.handleFocus} />
              </TextField>
            </div>
          </div>
        )}
      </Draggable>
    )
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
  }
}

const mapDispatchToProps = { selectTodo: acSelectTodo }

export default connect(
  null,
  mapDispatchToProps
)(Todo)
