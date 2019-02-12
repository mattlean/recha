import React, { ReactNode } from 'react'
import { DrawerAppContent } from '@material/react-drawer'

const Content = ({ children }: { children: ReactNode }): ReturnType<typeof Content> => (
  <DrawerAppContent className="content">{children}</DrawerAppContent>
)

export default Content
