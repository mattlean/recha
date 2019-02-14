import { TYPE as TODO_TYPE } from '../../../types/Todo'
import reducer, { defaultState } from '../formNames'
import { FETCH_TODOS_SUCCESS } from '../../../types/actions'
import { fetchTodosSuccess } from '../../../actions/todos'

describe('todos formNames reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    const state = reducer(undefined, {})

    expect(state).toEqual(defaultState)
  })

  it(`should handle ${FETCH_TODOS_SUCCESS}`, () => {
    const res = {
      data: [
        {
          id: 72,
          date: '2019-02-03T08:00:00.000Z',
          name: 'First!',
          order_num: 1,
          completed_at: null,
          updated_at: '2019-02-09T12:16:42.598Z',
          created_at: '2019-02-09T12:16:42.598Z'
        },
        {
          id: 71,
          date: '2019-02-03T08:00:00.000Z',
          name: 'Second!',
          order_num: 2,
          completed_at: null,
          updated_at: '2019-02-11T10:21:12.009Z',
          created_at: '2019-02-09T11:06:45.962Z'
        },
        {
          id: 70,
          date: '2019-02-03T08:00:00.000Z',
          name: 'Third!',
          order_num: 3,
          completed_at: null,
          updated_at: '2019-02-11T10:24:02.049Z',
          created_at: '2019-02-09T11:06:24.979Z'
        }
      ],
      type: TODO_TYPE
    }
    const action = fetchTodosSuccess('2019-02-03', res)
    const state = reducer(defaultState, action)

    expect(state).toEqual({ '70': 'Third!', '71': 'Second!', '72': 'First!' })
  })
})
