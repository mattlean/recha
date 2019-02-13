import React from 'react'
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar'

import Content from './Content'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Page = ({ children }): ReturnType<typeof Page> => (
  <div className="drawer-container">
    <Topbar />
    <TopAppBarFixedAdjust>
      <Sidebar />
      <Content>{children}</Content>
    </TopAppBarFixedAdjust>
  </div>
)

export default Page
