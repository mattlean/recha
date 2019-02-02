import React, { ReactNode } from 'react'
import { DrawerAppContent } from '@material/react-drawer'

const Content = ({ children }: { children: ReactNode }): ReturnType<typeof Content> => (
  <DrawerAppContent className="content">
    <div className="gutter">{children}</div>
  </DrawerAppContent>
)

export default Content
