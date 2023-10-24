import React, { useState, useEffect } from 'react'
import Job from './Job'
import axios from 'axios'
import { CircularProgress, Button } from '@mui/material'
import Error from '../pages/Error'

const JobList = () => {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getJobs = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jobs?page=${page}`)
                setJobs(response.data.jobs)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }

        getJobs()
    }, [page])

    if (error) return <Error />

    return (
    <div className='jobList'>
        {loading ? <div style={{textAlign: "center", padding: "20px"}}><CircularProgress /></div>
        :
        jobs.map((job) => ( 
            <Job key={job._id} data={job} />
        ))}

        {jobs.length == 0 && <div style={{textAlign: "center", padding: "20px"}}>No Jobs Found</div>}

        <div style={{padding: "20px", display: "flex", justifyContent: "center"}}>
            <Button 
            onClick={() => setPage(page - 1)}
            disabled = {page == 1} sx={{borderRadius: "10px 0px 0px 10px !important", borderRight: "none"}} variant="outlined" color="button">Prev</Button>
            
            <Button 
            onClick={() => setPage(page + 1)}
            disabled = {jobs == 0} sx={{borderRadius: "0px 10px 10px 0px !important"}} variant="outlined" color="button">Next</Button>
        </div>
    </div>
    )
}

export default JobList