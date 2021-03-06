import reducer, { defaultState } from '../formById'
import { APITypes } from '../../../../types'
import { FETCH_TODOS_SUCCESS } from '../../../../actions/types'
import { fetchTodosSuccess } from '../../../../actions/todos'
import { TYPE as TODO_TYPE } from '../../../../types/Todo'

describe('todos names reducer', () => {
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
          completed_at: '2019-02-09T12:16:42.598Z',
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
          updated_at: '2019-02-11T10:24:02.049Z',
          created_at: '2019-02-09T11:06:24.979Z'
        }
      ],
      type: TODO_TYPE as APITypes
    }
    const action = fetchTodosSuccess('2019-02-03', res.data)
    const state = reducer(defaultState, action)

    expect(state).toEqual({
      '70': { completed: false, name: 'Third!' },
      '71': { completed: false, name: 'Second!' },
      '72': { completed: true, name: 'First!' }
    })
  })
})
