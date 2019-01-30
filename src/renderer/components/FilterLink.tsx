import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const FilterLink = ({ children, filter }: { children?: ReactNode, filter: string }) => (
  <NavLink
    to={filter === 'all' ? '' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
    exact
  >
    {children}
  </NavLink>
)

export default FilterLink
