import Card from '@material/react-card'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TextField, { Input } from '@material/react-text-field'
import Todo from '../types/Todo'
import { ActionUpdateFormTodoName } from '../actions/types'
import { getFormTodoName, getTodo } from '../selectors'
import { State as ReduxState } from '../reducers/types'
import { updateFormTodoName as acUpdateFormTodoName } from '../actions/todos'

interface DispatchProps {
  updateFormTodoName: (id: Todo['id'], name: Todo['name']) => ActionUpdateFormTodoName
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
    if (prevProps.todo && !todo) {
      this.setState({ details: '' })
    } else if (prevProps.todo !== todo) {
      let details
      if (todo && todo.details) {
        details = todo.details
      } else {
        details = ''
      }
      this.setState({ details })
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  private handleDetailsChange = (evt): void => {
    this.setState({ details: evt.target.value })
  }

  private handleNameChange = (evt): void => {
    const { todo, updateFormTodoName } = this.props
    updateFormTodoName(todo.id, evt.target.value)
  }

  public render(): JSX.Element {
    const { id } = this.props.match.params
    const { formTodoName, todo } = this.props

    if (id && todo) {
      const { details } = this.state
      return (
        <Card className="card-content">
          <TextField id="todo-name" label={todo.name} fullWidth floatingLabelClassName="util-display-none">
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
    formTodoName: getFormTodoName(state.todos.form.names, String(id)),
    todo: getTodo(state.todos.api, String(id))
  }
}

const mapDispatchToProps = {
  updateFormTodoName: acUpdateFormTodoName
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoDetails)
)
