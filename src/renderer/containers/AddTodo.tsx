import React, { ReactNode } from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../actions'
import { ThunkDispatch } from '../types'

export const AddTodo = ({ dispatch }: { dispatch: ThunkDispatch }): JSX.Element => {
  let input

  return (
    <>
      <input
        ref={node => {
          input = node
        }}
      />
      <button
        onClick={() => {
          if (input) {
            dispatch(addTodo(input.value))
            input.value = ''
          }
        }}
      >
        Add Todo
      </button>
    </>
  )
}

export default connect()(AddTodo)
