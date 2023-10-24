import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BusinessCenter, WorkHistory } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import Error from './Error'


const JobDetails = () => {
    
    let { currentUser } = useSelector((state) => state.user)

    const token = localStorage.getItem("token")
    const { id } = useParams()
    const dispatch = useDispatch()

    const [jobDetails, setJobDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [applied, setApplied] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getJobDetails = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jobs/${id}`)
                setJobDetails(response.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
                return <Error />
            }
        }

        const getData = async () => {
            const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${currentUser._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (user.data.applications.includes(id)) setApplied(true)
        }
        
        if (currentUser) getData()
        getJobDetails()

    }, [])

    const handleApply = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/jobs/apply`, 
            {
                userId: currentUser._id,
                jobId: id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setApplied(true)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    if (error) return <Error />

    return (
        <>
        {loading ? 
        <div style={{textAlign: "center", margin: "20px"}}><CircularProgress /></div>
        :
        <Card
        sx = {{
            margin: "20px",
            bgcolor: 'white',
            transition: '0.5s ease',
            border: '0.3px solid rgb(200, 200, 200)'
        }}
        >
        <CardContent>
            <div><b>{jobDetails.title}</b></div>
    
            <small>
            <div style={{display: 'flex'}}>
            <div 
            style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
            <BusinessCenter sx={{width: "15px", color: "rgb(80, 80, 80)"}} /> &nbsp; {jobDetails.company}
            </div>
            <div 
            style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
            <WorkHistory sx={{width: "15px", color: "rgb(80, 80, 80)"}} /> &nbsp; {jobDetails.type}
            </div>
            </div>
            </small>
            <br />
    
            <div>$ {jobDetails.salary}</div><br />
            <div>{jobDetails.description}</div><br />

            {currentUser ? 
            <Button disabled={applied} variant="outlined" color="button"
            onClick={handleApply}
            >{applied ? "Already Applied" : "Apply"}</Button>
            :
            <div style={{color: "darkred"}}>Login and apply</div>
            }
        </CardContent>
        </Card>
        }
        </>
    )
}

export default JobDetails