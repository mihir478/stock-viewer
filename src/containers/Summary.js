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

const Summary = ({ companyName, totalRevenue, grossProfit, netIncome }) => {
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
            label="Total Revenue ($)"
            value={totalRevenue && totalRevenue.toLocaleString() || ''}
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
            label="Gross Profit ($)"
            value={grossProfit && grossProfit.toLocaleString() || ''}
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
            label="Net Income ($)"
            value={netIncome && netIncome.toLocaleString() || ''}
          />
        </Grid>
      </Grid>
    </div>
  )
}

Summary.propTypes = {
  companyName: PropTypes.string.isRequired,
  totalRevenue: PropTypes.number.isRequired,
  grossProfit: PropTypes.number.isRequired,
  netIncome: PropTypes.number.isRequired
}

export default Summary
