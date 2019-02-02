import Button from '@material/react-button'
import React, { Component, ReactNode } from 'react'
import TextField, { Input } from '@material/react-text-field'
import { connect } from 'react-redux'

import { addTodo } from '../actions'
import { ThunkDispatch } from '../types'

interface DispatchProps {
  dispatch: ThunkDispatch
}

interface State {
  value: string
}

export class AddTodo extends Component<DispatchProps, State> {
  public state = {
    value: ''
  }

  private handleChange = (evt): void => {
    this.setState({ value: evt.target.value })
  }

  public render(): ReactNode {
    const { dispatch } = this.props
    const { value } = this.state

    return (
      <>
        <TextField label="Todo">
          <Input type="text" value={value} onChange={this.handleChange} />
        </TextField>
        <Button
          raised
          onClick={() => {
            dispatch(addTodo(value))
            this.setState({ value: '' })
          }}
          className="button-alternate"
        >
          Add Todo
        </Button>
      </>
    )
  }
}

export default connect()(AddTodo)
