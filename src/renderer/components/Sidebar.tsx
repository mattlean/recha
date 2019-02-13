import Drawer, { DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer'
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list'
import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

interface State {
  index: number
}

class Sidebar extends Component<{}, State> {
  public state = { index: 1 }

  private handleClick = (index: number): void => {
    this.setState({ index })
  }

  public render(): JSX.Element {
    const { index } = this.state
    return (
      <Drawer className="sidebar">
        <DrawerHeader>
          <DrawerTitle>Todos</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List singleSelection selectedIndex={index}>
            <Link to="/">
              <ListItem onClick={() => this.handleClick(1)}>
                <ListItemGraphic graphic={<MaterialIcon icon="calendar_today" />} />
                <ListItemText primaryText="Today's Todos" />
              </ListItem>
            </Link>
            <Link to="test">
              <ListItem onClick={() => this.handleClick(2)}>
                <ListItemGraphic graphic={<MaterialIcon icon="date_range" />} />
                <ListItemText primaryText="All Todos" />
              </ListItem>
            </Link>
          </List>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default Sidebar
