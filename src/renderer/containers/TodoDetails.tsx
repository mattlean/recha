import Card from '@material/react-card'
import IconButton from '@material/react-icon-button'
import MaterialIcon from '@material/react-material-icon'
import moment from 'moment'
import React, { Component } from 'react'
import TextField, { Input } from '@material/react-text-field'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { DialogButton } from '@material/react-dialog'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import Modal from '../components/Modal'
import Todo from '../types/Todo'
import TodoCompleteCtrl from './TodoCompleteCtrl'
import { ActionUpdateTodoFormName, NormalizedTodoRes } from '../actions/types'
import { readTodo, readTodoFormName } from '../selectors'
import {
  removeTodo as acRemoveTodo,
  updateTodo as acUpdateTodo,
  updateTodoFormName as acUpdateTodoFormName
} from '../actions/todos'
import { State as ReduxState } from '../reducers/types'

interface DispatchProps {
  removeTodo: (id: Todo['id']) => Promise<Todo['id']>
  updateTodo: (id: Todo['id'], data: Partial<Todo>) => Promise<NormalizedTodoRes>
  updateTodoFormName: (id: Todo['id'], name: Todo['name']) => ActionUpdateTodoFormName
}

interface StateProps {
  formTodoName: Todo['name']
  todo: Todo
}

type OwnProps = RouteComponentProps<{ date: string; id: string }>

interface ComponentState {
  details: Todo['details']
  openModal: boolean
}

type Props = DispatchProps & StateProps & OwnProps

class TodoDetails extends Component<Props, ComponentState> {
  public constructor(props) {
    super(props)
    const { todo, updateTodo } = props

    // Component state manages details. Redux state manages name because it is shared with Todo container.
    let details
    if (todo && todo.details) {
      details = todo.details
    } else {
      details = ''
    }
    this.state = { details, openModal: false }

    this.debouncedUpdateTodo = debounce(updateTodo, 500)
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

  private closeDetails = () => {
    const { date } = this.props.match.params
    const { history } = this.props
    history.push(`/${moment(date).format('YYYY-MM-DD')}`)
  }

  private handleDetailsChange = (evt): void => {
    const { formTodoName, todo } = this.props

    this.setState({ details: evt.target.value })
    this.debouncedUpdateTodo(todo.id, { name: formTodoName, details: evt.target.value })
  }

  private handleModalClose = (action: string): void => {
    const { id } = this.props.match.params
    const { removeTodo } = this.props

    if (action === 'delete') {
      removeTodo(Number(id)).then(() => this.closeDetails())
    }

    this.setState({ openModal: false })
  }

  private handleNameChange = (evt): void => {
    const { todo, updateTodoFormName } = this.props
    const { details } = this.state

    updateTodoFormName(todo.id, evt.target.value)
    this.debouncedUpdateTodo(todo.id, { name: evt.target.value, details })
  }

  private debouncedUpdateTodo: (id: Todo['id'], data: Partial<Todo>) => Promise<NormalizedTodoRes>

  public render(): JSX.Element {
    const { date, id } = this.props.match.params
    const { formTodoName, history, todo } = this.props
    const modalButtons = [
      <DialogButton key="keep" action="keep">
        Keep
      </DialogButton>,
      <DialogButton key="delete" action="delete" isDefault>
        DELETE
      </DialogButton>
    ]

    if (date && id && todo) {
      const { name } = todo
      const { details, openModal } = this.state
      return (
        <Card className="card-content">
          <div className="todo-details-btns">
            <TodoCompleteCtrl id={todo.id} type="button" />
            <IconButton onClick={() => this.setState({ openModal: true })}>
              <MaterialIcon icon="delete_forever" />
            </IconButton>
            <IconButton onClick={() => this.closeDetails()}>
              <MaterialIcon icon="close" />
            </IconButton>
          </div>
          <TextField id="todo-name" label={name} fullWidth floatingLabelClassName="util-display-none">
            <Input value={formTodoName} onChange={this.handleNameChange} />
          </TextField>
          <TextField id="todo-details" label={details} fullWidth textarea floatingLabelClassName="util-display-none">
            <Input value={details} onChange={this.handleDetailsChange} />
          </TextField>
          <Modal title="Remove Todo?" buttons={modalButtons} isOpen={openModal} onClose={this.handleModalClose}>
            <p>Be careful! Doing this will delete the todo forever!</p>
          </Modal>
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
  removeTodo: acRemoveTodo,
  updateTodo: acUpdateTodo,
  updateTodoFormName: acUpdateTodoFormName
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoDetails)
)
