import Card from '@material/react-card'
import React from 'react'
import { DrawerAppContent } from '@material/react-drawer'
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar'

import Content from './Content'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Page = ({ children }): ReturnType<typeof Page> => (
  <div className="drawer-container">
    <Topbar />
    <TopAppBarFixedAdjust>
      <Sidebar />
      <Content>
        <Card className="card-content">{children}</Card>
      </Content>
    </TopAppBarFixedAdjust>
  </div>
)

export default Page
