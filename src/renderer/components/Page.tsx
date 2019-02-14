import React from 'react'
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar'

import Topbar from './Topbar'

const Page = ({ children }): JSX.Element => (
  <div className="drawer-container">
    <Topbar />
    <TopAppBarFixedAdjust />
    {children}
  </div>
)

export default Page
