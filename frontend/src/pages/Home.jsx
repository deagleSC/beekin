import React from 'react'
// import './Home.css'
import JobList from '../components/JobList'
import Profile from '../components/Profile'
import { Grid } from '@mui/material'

const Home = () => {
  return (
    <div className='home'>
        <Grid container>
        
        <Grid item md={3} lg={3} sm={12} xs={12}
        sx={{flexShrink: 0, flexGrow: 1}}
        >
        <Profile />
        </Grid>

        <Grid item md={9} lg={9} sm={12} xs={12}
        sx={{flexShrink: 0, flexGrow: 1}}
        >
        <JobList />
        </Grid>

        </Grid>
    </div>
  )
}

export default Home