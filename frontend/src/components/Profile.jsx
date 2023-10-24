import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@mui/material'
import { Person } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess, loginStart } from '../redux/userSlice'
import axios from 'axios'

const Profile = () => {

    let { currentUser } = useSelector((state) => state.user)
    const token = localStorage.getItem("token")

    const [email, setEmail] = useState(null)
    const [applications, setApplications] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = async () => {
            const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${currentUser._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setEmail(user.data.email)
            setApplications(user.data.applications.length)
        }

        if (currentUser) getUser()
        else {
            setEmail(null)
            setApplications(0)
        }
    }, [currentUser])

    return (
    <div>
    <Card
    sx = {{
        margin: {md : "20px 0px 20px 20px", lg : "20px 0px 20px 20px", sm : "20px", xs: "20px"},
        bgcolor: 'white',
        border: '0.3px solid rgb(200, 200, 200)'
    }}
    >
    <CardContent 
    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}
    >
        <div style={{marginBottom: '5px'}}><Person sx={{width: '100%',  color: "rgb(80, 80, 80)"}}/></div>

        {email ? 
        <>
        <div style={{marginBottom: '10px'}}>{email}</div>
        <div>Jobs applied: {applications}</div>
        </>
        :
        <div>Guest User</div>}

    </CardContent>
    </Card>
    </div>
    )
}

export default Profile