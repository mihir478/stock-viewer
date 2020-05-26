import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import palette from '../theme/palette'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  }
}))

const CumulativeReturn = props => {
  const classes = useStyles()
  const { data } = props
  const lastDatum = data[data.length - 1].close
  const firstDatum = data[0].close
  const cumulativeReturn = (lastDatum - firstDatum) / firstDatum * 100
  const cumulativeReturnFormatted = `${Number(cumulativeReturn).toFixed(2)}`
  const color = cumulativeReturn >= 0 ? palette.success.main : palette.error.main

  const { className, ...rest } = props
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Cumulative Return (%)
              </Typography>
              <Typography 
                variant="h5"
                style={{color: color}}
              >{cumulativeReturnFormatted}
              </Typography>
            </Grid>
          </Grid>
      </CardContent>
    </Card>
  )
}

CumulativeReturn.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
}

export default CumulativeReturn
