import Card from '@material/react-card'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField, { Input } from '@material/react-text-field'
import Todo from '../types/Todo'
import { ActionUpdateTodoName } from '../types/actions'
import { updateTodoName as acUpdateTodoName } from '../actions/todos'
import { getTodo } from '../reducers/todos/byId'
import { State as ReduxState } from '../types/reducers'

interface DispatchProps {
  updateTodoName: (name: Todo['name']) => ActionUpdateTodoName
}

interface StateProps {
  reduxTodoName: Todo['name']
  todo: Todo
}

interface ComponentState {
  details: Todo['details']
}

type Props = DispatchProps & StateProps

class TodoDetails extends Component<Props, ComponentState> {
  public constructor(props) {
    super(props)

    // Component state manages details. Redux state manages name because it is shared with Todo container.
    this.state = { details: props.todo || '' }
  }

  public componentDidUpdate(prevProps): void {
    const { todo } = this.props
    if (prevProps.todo !== todo) {
      this.setState({ details: todo.details }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  private handleDetailsChange = (evt): void => {
    this.setState({ details: evt.target.value })
  }

  private handleNameChange = (evt): void => {
    const { updateTodoName } = this.props
    updateTodoName(evt.target.value)
  }

  public render(): JSX.Element {
    const { reduxTodoName, todo } = this.props

    if (todo) {
      const { details } = this.state
      return (
        <Card className="card-content">
          <TextField id="todo-name" label={todo.name} fullWidth floatingLabelClassName="util-display-none">
            <Input value={reduxTodoName} onChange={this.handleNameChange} />
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

const mapStateToProps = (state: ReduxState): StateProps => ({
  reduxTodoName: state.todos.ui.todoName,
  todo: getTodo(state.todos.byId, String(state.todos.ui.currTodo))
})

const mapDispatchToProps = {
  updateTodoName: acUpdateTodoName
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetails)
