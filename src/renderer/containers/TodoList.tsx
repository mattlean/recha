import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import AddTodo from '../components/AddTodo'
import Todo from './Todo'
import { default as TodoType } from '../types/Todo'
import { fetchTodos as acFetchTodos } from '../actions/todos'
import { getTodoList } from '../reducers/todos'
import { NormalizedTodosRes } from '../types/actions'
import { State as ReduxState } from '../types/reducers'

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
    if (nextProps.todoList === compTodoList) {
      return false
    }
    return true
  }

  public render(): JSX.Element[] {
    const { compTodoList } = this.props
    return compTodoList.map((todo, index) => <Todo key={todo.id} id={todo.id} index={index} />)
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
    const { fetchTodos } = this.props
    const { date } = this.props.match.params
    if (prevProps.match.params.date !== date) {
      fetchTodos(date)
    }

    const { reduxTodoList } = this.props
    if (prevProps.reduxTodoList !== reduxTodoList) {
      this.setState({ compTodoList: reduxTodoList }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  private applyStyles = isDraggingOver => {
    let styles = ''
    if (isDraggingOver) {
      styles += 'todo-list-drag-over'
      return styles
    }
    return styles
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
    const { date } = this.props.match.params
    const { compTodoList } = this.state

    let dndList
    if (date) {
      dndList = (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <h1>{date}</h1>
          <AddTodo />
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
        </DragDropContext>
      )
    } else {
      dndList = 'Empty List'
    }

    return dndList
  }
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  reduxTodoList: getTodoList(state.todos)
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
