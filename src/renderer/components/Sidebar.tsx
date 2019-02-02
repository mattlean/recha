import Drawer, { DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer'
import List, { ListItem, ListItemGraphic, ListItemText } from '@material/react-list'
import MaterialIcon from '@material/react-material-icon'
import React, { Component, ReactNode } from 'react'

interface State {
  selectedIndex: number
}

class Sidebar extends Component<{}, State> {
  public state = {
    selectedIndex: 1
  }

  public render() {
    const { selectedIndex } = this.state
    return (
      <Drawer className="sidebar">
        <DrawerHeader>
          <DrawerTitle>Todos</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List singleSelection selectedIndex={selectedIndex}>
            <ListItem onClick={() => this.setState({ selectedIndex: 1 })}>
              <ListItemGraphic graphic={<MaterialIcon icon="calendar_today" />} />
              <ListItemText primaryText="Today's Todos" />
            </ListItem>
            <ListItem onClick={() => this.setState({ selectedIndex: 2 })}>
              <ListItemGraphic graphic={<MaterialIcon icon="date_range" />} />
              <ListItemText primaryText="All Todos" />
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default Sidebar
