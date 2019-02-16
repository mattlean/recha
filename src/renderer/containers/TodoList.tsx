import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import AddTodo from '../components/AddTodo'
import Todo from './Todo'
import { default as TodoType } from '../types/Todo'
import { fetchTodos as acFetchTodos } from '../actions/todos'
import { rsGetTodoList } from '../selectors'
import { NormalizedTodosRes } from '../actions/types'
import { State as ReduxState } from '../reducers/types'

interface DispatchProps {
  fetchTodos: (date: string) => Promise<NormalizedTodosRes>
}

type OwnProps = RouteComponentProps<{ date: string; id: string }>

interface StateProps {
  reduxTodoList: TodoType[]
}

type Props = StateProps & DispatchProps & OwnProps

interface InnerListProps {
  compTodoList: TodoType[]
}

interface ComponentState {
  compTodoList: TodoType[]
}

class InnerList extends Component<InnerListProps> {
  public shouldComponentUpdate(nextProps): boolean {
    const { compTodoList } = this.props
    if (nextProps.compTodoList === compTodoList) {
      return false
    }
    return true
  }

  public render(): JSX.Element[] {
    const { compTodoList } = this.props
    return compTodoList.map((todo, index) => <Todo key={todo.id} todo={todo} index={index} />)
  }
}

// eslint-disable-next-line react/no-multi-comp
class TodoList extends Component<Props, ComponentState> {
  public state = {
    compTodoList: []
  }

  public componentDidMount(): void {
    const { history, match, fetchTodos } = this.props
    const { date } = match.params
    if (!date) {
      history.push(`/${moment().format('YYYY-MM-DD')}`)
    } else {
      fetchTodos(date)
    }
  }

  public componentDidUpdate(prevProps): void {
    const { fetchTodos, history } = this.props
    const { date } = this.props.match.params
    if (date && prevProps.match.params.date !== date) {
      fetchTodos(date)
    } else if (!date) {
      history.push(`/${moment().format('YYYY-MM-DD')}`)
    }

    const { reduxTodoList } = this.props
    if (prevProps.reduxTodoList !== reduxTodoList) {
      this.setState({ compTodoList: reduxTodoList }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  private applyStyles = isDraggingOver => {
    if (isDraggingOver) {
      return 'todo-list-dragover'
    }
    return ''
  }

  private onDragEnd = result => {
    const { compTodoList } = this.state
    const { destination, source } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newUITodoList = Array.from(compTodoList)
    const [movedTodo] = newUITodoList.splice(source.index, 1)
    newUITodoList.splice(destination.index, 0, movedTodo)

    this.setState({ compTodoList: newUITodoList })
  }

  public render(): JSX.Element {
    const { fetchTodos } = this.props
    const { date } = this.props.match.params
    const { compTodoList } = this.state

    let dndList
    if (date && compTodoList.length > 0) {
      dndList = (
        <Droppable droppableId={date}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={this.applyStyles(snapshot.isDraggingOver)}
            >
              <InnerList compTodoList={compTodoList} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )
    } else {
      dndList = <i>No todos found...</i>
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <button
          type="button"
          onClick={() => {
            fetchTodos(date)
          }}
        >
          Test fetch todos
        </button>
        <h1>{date}</h1>
        <AddTodo />
        {dndList}
      </DragDropContext>
    )
  }
}

const mapStateToProps = (state: ReduxState, ownProps: OwnProps): StateProps => ({
  reduxTodoList: rsGetTodoList(state.todos.api, ownProps.match.params.date)
})

const mapDispatchToProps = {
  fetchTodos: acFetchTodos
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
)
