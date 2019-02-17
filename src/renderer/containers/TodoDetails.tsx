import Card from '@material/react-card'
import MaterialIcon from '@material/react-material-icon'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TextField, { Input } from '@material/react-text-field'
import Todo from '../types/Todo'
import TodoCompleted from './TodoCompleted'
import { ActionUpdateTodoFormName } from '../actions/types'
import { readTodo, readTodoFormName } from '../selectors'
import { State as ReduxState } from '../reducers/types'
import { updateTodoFormName as acUpdateTodoFormName } from '../actions/todos'

interface DispatchProps {
  updateTodoFormName: (id: Todo['id'], name: Todo['name']) => ActionUpdateTodoFormName
}

interface StateProps {
  formTodoName: Todo['name']
  todo: Todo
}

type OwnProps = RouteComponentProps<{ id: string }>

interface ComponentState {
  details: Todo['details']
}

type Props = DispatchProps & StateProps & OwnProps

class TodoDetails extends Component<Props, ComponentState> {
  public constructor(props) {
    super(props)

    // Component state manages details. Redux state manages name because it is shared with Todo container.
    let details
    if (props.todo && props.todo.details) {
      details = props.todo.details
    } else {
      details = ''
    }
    this.state = { details }
  }

  public componentDidUpdate(prevProps): void {
    const { todo } = this.props
    /* eslint-disable react/no-did-update-set-state */
    let details = ''
    if (prevProps.todo && !todo) {
      this.setState({ details })
    } else if (prevProps.todo !== todo) {
      if (todo && todo.details) {
        details = todo.details
      }
      this.setState({ details })
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  private handleDetailsChange = (evt): void => {
    this.setState({ details: evt.target.value })
  }

  private handleNameChange = (evt): void => {
    const { todo, updateTodoFormName } = this.props
    updateTodoFormName(todo.id, evt.target.value)
  }

  public render(): JSX.Element {
    const { id } = this.props.match.params
    const { formTodoName, history, todo } = this.props

    if (id && todo) {
      const { date, name } = todo
      const { details } = this.state
      return (
        <Card className="card-content">
          <div className="todo-details-btns">
            <TodoCompleted id={todo.id} type="button" />
            <MaterialIcon
              icon="close"
              onClick={() => {
                history.push(`/${moment(date).format('YYYY-MM-DD')}`)
              }}
              className="btn-close"
            />
          </div>
          <TextField id="todo-name" label={name} fullWidth floatingLabelClassName="util-display-none">
            <Input value={formTodoName} onChange={this.handleNameChange} />
          </TextField>
          <TextField id="todo-details" label={details} fullWidth textarea floatingLabelClassName="util-display-none">
            <Input value={details} onChange={this.handleDetailsChange} />
          </TextField>
        </Card>
      )
    }
    return <></>
  }
}

const mapStateToProps = (state: ReduxState, ownProps: OwnProps): StateProps => {
  const { id } = ownProps.match.params
  return {
    formTodoName: readTodoFormName(state.todos.ui.formById, id),
    todo: readTodo(state.todos.api, id)
  }
}

const mapDispatchToProps = {
  updateTodoFormName: acUpdateTodoFormName
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoDetails)
)
