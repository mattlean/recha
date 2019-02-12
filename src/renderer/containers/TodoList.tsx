import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Todo from '../types/Todo'
import Todo2 from '../components/Todo2'
import { fetchTodos as acFetchTodos } from '../actions/index2'
import { getTodoList } from '../reducers/todos'
import { NormalizedTodosRes } from '../types/actions'
import { State } from '../types/reducers'

interface DispatchProps {
  fetchTodos: (date: string) => Promise<NormalizedTodosRes>
}

interface StateProps {
  date: string
  todoList: Todo[]
}

interface InnerListProps {
  todoList: Todo[]
}

type Props = StateProps & DispatchProps

interface ComponentState {
  uiTodoList: Todo[]
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
    return todoList.map((todo, index) => <Todo2 key={todo.id} todo={todo} index={index} />)
  }
}

// eslint-disable-next-line react/no-multi-comp
class TodoList extends Component<Props, ComponentState> {
  public state = {
    uiTodoList: []
  }

  public componentDidMount(): void {
    const { fetchTodos } = this.props
    fetchTodos('2019-02-03')
  }

  public componentDidUpdate(prevProps): void {
    const { todoList } = this.props
    if (prevProps.todoList !== todoList) {
      this.setState({ uiTodoList: todoList }) // eslint-disable-line react/no-did-update-set-state
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
    const { uiTodoList } = this.state
    const { destination, source } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newUITodoList = Array.from(uiTodoList)
    const [movedTodo] = newUITodoList.splice(source.index, 1)
    newUITodoList.splice(destination.index, 0, movedTodo)

    this.setState({ uiTodoList: newUITodoList })
  }

  public render(): JSX.Element {
    const { date, fetchTodos } = this.props
    const { uiTodoList } = this.state

    let dndList
    if (date) {
      dndList = (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <h1>{date}</h1>
          <button type="button" onClick={() => fetchTodos('2019-02-03')}>
            Refetch
          </button>
          <Droppable droppableId={date}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={this.applyStyles(snapshot.isDraggingOver)}
              >
                <InnerList todoList={uiTodoList} />
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

const mapStateToProps = (state: State): StateProps => ({
  date: state.todos.list.id as string,
  todoList: getTodoList(state.todos)
})

const mapDispatchToProps = {
  fetchTodos: acFetchTodos
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
