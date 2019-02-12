import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

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

interface StateProps {
  date: string
  reduxTodoList: TodoType[]
}

interface InnerListProps {
  todoList: TodoType[]
}

type Props = StateProps & DispatchProps

interface ComponentState {
  compTodoList: TodoType[]
}

class InnerList extends Component<InnerListProps> {
  public shouldComponentUpdate(nextProps): boolean {
    const { todoList } = this.props
    if (nextProps.todoList === todoList) {
      return false
    }
    return true
  }

  public render(): JSX.Element[] {
    const { todoList } = this.props
    return todoList.map((todo, index) => <Todo key={todo.id} todo={todo} index={index} />)
  }
}

// eslint-disable-next-line react/no-multi-comp
class TodoList extends Component<Props, ComponentState> {
  public state = {
    compTodoList: []
  }

  public componentDidMount(): void {
    const { fetchTodos } = this.props
    fetchTodos('2019-02-03')
  }

  public componentDidUpdate(prevProps): void {
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
    const { date, fetchTodos } = this.props
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
                <InnerList todoList={compTodoList} />
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
  date: state.todos.list.id as string,
  reduxTodoList: getTodoList(state.todos)
})

const mapDispatchToProps = {
  fetchTodos: acFetchTodos
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
