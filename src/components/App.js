import React from 'react'
import PrimarySearchAppBar from './PrimarySearchAppBar'
import ConditionalRenderer from '../containers/ConditionalRenderer'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: orange
    },
  })
  return (
  <MuiThemeProvider theme={theme}>  
    <div className="app">
      <PrimarySearchAppBar />
      <ConditionalRenderer />
      </div>
  </MuiThemeProvider>
  )
}

export default App
