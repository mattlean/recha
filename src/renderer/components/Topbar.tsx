import MaterialIcon from '@material/react-material-icon'
import React from 'react'
import TopAppBar from '@material/react-top-app-bar'

const Topbar = (): JSX.Element => <TopAppBar navigationIcon={<MaterialIcon icon="local_cafe" />} title="Recha" fixed />

export default Topbar
