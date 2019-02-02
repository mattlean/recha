import Button from '@material/react-button'
import React from 'react'
import TextField, { Input } from '@material/react-text-field'
import { connect } from 'react-redux'

import { addTodo } from '../actions'
import { ThunkDispatch } from '../types'

export const AddTodo = ({ dispatch }: { dispatch: ThunkDispatch }): ReturnType<typeof AddTodo> => {
  let input

  return (
    <>
      <TextField label="Todo">
        <input
          ref={node => {
            input = node
          }}
        />
      </TextField>
      <Button
        raised
        onClick={() => {
          if (input) {
            dispatch(addTodo(input.value))
            input.value = ''
          }
        }}
        className="button-alternate"
      >
        Add Todo
      </Button>
    </>
  )
}

export default connect()(AddTodo)
