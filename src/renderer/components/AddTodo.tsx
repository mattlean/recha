import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import TextField, { Input } from '@material/react-text-field'

interface State {
  value: string
}

export default class AddTodo extends Component<{}, State> {
  public state = {
    value: ''
  }

  private handleChange = evt => {
    this.setState({ value: evt.target.value })
  }

  public render(): JSX.Element {
    const { value } = this.state
    return (
      <TextField label="New Todo" leadingIcon={<MaterialIcon icon="add" />}>
        <Input value={value} onChange={this.handleChange} />
      </TextField>
    )
  }
}
