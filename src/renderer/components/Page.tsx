import Card from '@material/react-card'
import React from 'react'
import { DrawerAppContent } from '@material/react-drawer'
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Page = ({ children }): ReturnType<typeof Page> => (
  <div className="drawer-container">
    <Topbar />
    <TopAppBarFixedAdjust>
      <Sidebar />
      <DrawerAppContent className="content">
        <div className="gutter">
          <Card>{children}</Card>
        </div>
      </DrawerAppContent>
    </TopAppBarFixedAdjust>
  </div>
)

export default Page
