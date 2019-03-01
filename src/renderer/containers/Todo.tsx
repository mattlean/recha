import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import TextField, { Input } from '@material/react-text-field'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { Draggable } from 'react-beautiful-dnd'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TodoCompleteCtrl from './TodoCompleteCtrl'
import { ActionUpdateTodoFormName, NormalizedTodoRes } from '../actions/types'
import { default as TodoType } from '../types/Todo'
import { readTodoFormName, readTodo } from '../selectors'
import { State } from '../reducers/types'
import { updateTodo as acUpdateTodo, updateTodoFormName as acUpdateTodoFormName } from '../actions/todos'

interface DispatchProps {
  updateTodoFormName: (id: TodoType['id'], name: TodoType['name']) => ActionUpdateTodoFormName
}

interface OwnProps extends RouteComponentProps<{ id: string; date: string }> {
  index: number
  todo: TodoType
}

interface StateProps {
  formTodoName: TodoType['name']
  todo: TodoType
}

type Props = StateProps & DispatchProps & OwnProps

class Todo extends Component<Props, State> {
  public constructor(props) {
    super(props)
    const { updateTodo } = props

    this.debouncedUpdateTodo = debounce(updateTodo, 1000)
  }

  private handleChange = (evt): void => {
    const { todo, updateTodoFormName } = this.props
    updateTodoFormName(todo.id, evt.target.value)
    this.debouncedUpdateTodo(todo.id, { name: evt.target.value })
  }

  private handleFocus = (): void => {
    const { history, todo } = this.props
    const { date } = this.props.match.params

    if (date) history.push(`/${date}/${todo.id}`)
  }

  private applyStyle = (isDragging): string => {
    let styles = 'todo-list-item-handle'
    if (isDragging) {
      styles += ' todo-list-item-handle-dragging'
      return styles
    }
    return styles
  }

  private debouncedUpdateTodo: (id: TodoType['id'], data: Partial<TodoType>) => Promise<NormalizedTodoRes>

  public render(): JSX.Element {
    const { formTodoName, index, todo } = this.props

    if (todo) {
      const { id } = todo

      /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
      return (
        <Draggable draggableId={String(id)} index={index}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <TextField
                label={String(id)}
                leadingIcon={
                  <div className="todo-list-item-ctrls" tabIndex={0}>
                    <MaterialIcon
                      icon="drag_indicator"
                      {...provided.dragHandleProps}
                      className={this.applyStyle(snapshot.isDragging)}
                    />
                    <TodoCompleteCtrl id={id} type="checkbox" />
                  </div>
                }
                trailingIcon={<MaterialIcon icon="keyboard_arrow_right" className="todo-list-item-arrow" />}
                floatingLabelClassName="todo-list-item-label"
                className="todo-list-item"
              >
                <Input value={formTodoName} onChange={this.handleChange} onFocus={this.handleFocus} />
              </TextField>
            </div>
          )}
        </Draggable>
      )
      /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
    }
    return <></>
  }
}

const mapDispatchToProps = {
  updateTodo: acUpdateTodo,
  updateTodoFormName: acUpdateTodoFormName
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const id = String(ownProps.todo.id)
  return {
    formTodoName: readTodoFormName(state.todos.ui.formById, id),
    todo: readTodo(state.todos.api, id)
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todo)
)
