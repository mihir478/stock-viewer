import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import SummaryCard from '../components/SummaryCard'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Dashboard = ({companyName, employees, industry}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <SummaryCard 
            label="Name"
            value={companyName}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <SummaryCard 
            label="Number of Employees"
            value={employees && employees.toLocaleString() || ''}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <SummaryCard 
            label="Industry"
            value={industry}
          />
        </Grid>
      </Grid>
    </div>
  )
}

Dashboard.propTypes = {
  companyName: PropTypes.string.isRequired,
  employees: PropTypes.number.isRequired,
  industry: PropTypes.string.isRequired
}

export default Dashboard
