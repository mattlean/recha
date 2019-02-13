import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import TextField, { Input } from '@material/react-text-field'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { ActionUpdateFormTodoName } from '../types/actions'
import { default as TodoType } from '../types/Todo'
import { getTodo } from '../reducers/todos/byId'
import { getTodoName } from '../reducers/todos/formNameById'
import { State } from '../types/reducers'
import { updateFormTodoName as acUpdateFormTodoName } from '../actions/todos'

interface DispatchProps {
  updateFormTodoName: (id: TodoType['id'], name: TodoType['name']) => ActionUpdateFormTodoName
}

interface OwnProps extends RouteComponentProps<{ id: string; date: string }> {
  id: TodoType['id']
  index: number
}

interface StateProps {
  formTodoName: TodoType['name']
  todo: TodoType
}

type Props = StateProps & DispatchProps & OwnProps

class Todo extends Component<Props, State> {
  private handleChange = (evt): void => {
    const { id, updateFormTodoName } = this.props
    updateFormTodoName(id, evt.target.value)
  }

  private handleFocus = (): void => {
    const { history, id } = this.props
    const { date } = this.props.match.params

    if (date) {
      history.push({
        pathname: `/${date}/${id}`
      })
    }
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
    const { formTodoName, index } = this.props
    const id = String(this.props.id)

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
                <Input value={formTodoName} onChange={this.handleChange} onFocus={this.handleFocus} />
              </TextField>
            </div>
          </div>
        )}
      </Draggable>
    )
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
  }
}

const mapDispatchToProps = { updateFormTodoName: acUpdateFormTodoName }

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  formTodoName: getTodoName(state.todos.formNameById, String(ownProps.id)),
  todo: getTodo(state.todos.byId, String(ownProps.id))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todo)
)
