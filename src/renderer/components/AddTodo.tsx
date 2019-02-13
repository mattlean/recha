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

    let carriageReturn
    if (value) carriageReturn = <MaterialIcon icon="subdirectory_arrow_left" />

    return (
      <TextField label="New Todo" leadingIcon={<MaterialIcon icon="add" />} trailingIcon={carriageReturn}>
        <Input value={value} onChange={this.handleChange} />
      </TextField>
    )
  }
}
