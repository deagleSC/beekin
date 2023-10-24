import React, { useState } from 'react'
import { TextField, Button, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import Error from '../pages/Error'

const Signup = () => {

    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSignup = async () => {

        if (email === "" || password === "") {
            if (email === "") handleEmailValidation({email: ""})
            if (password === "") handlePasswordValidation({password: ""})
            return
        }

        setLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {email, password})
            console.log(response.data)
            setSuccessMessage(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message)
            setLoading(false)
            setError(true)
        }
    }

    const handleEmailValidation = (newValue) => {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!newValue.email && email !== "" && emailRegex.test(email)) setIsEmailValid(true)
        else if (newValue.email !== "" && emailRegex.test(newValue.email)) setIsEmailValid(true)
        else setIsEmailValid(false)
    }

    const handlePasswordValidation = (newValue) => {
        if (!newValue.password && password === "") setIsPasswordValid(false)
        else if (newValue.password === "") setIsPasswordValid(false)
        else setIsPasswordValid(true)
    }

    if (error) return <Error />

    return (
        <div className='login'
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}
        >
        <TextField
        error={!isEmailValid}
        helperText={!isEmailValid && "Invalid Email"}
        sx = {{width: '100%', marginBottom: '20px'}}
        id="outlined-controlled"
        label="Email"
        type="email"
        value={email}
        onChange={(event) => {
            setEmail(event.target.value);
            handleEmailValidation({email: event.target.value})
        }}
        />

        <TextField
        error={!isPasswordValid}
        helperText={!isPasswordValid && "Invalid Password"}
        sx = {{width: '100%', marginBottom: '20px'}}
        id="outlined-controlled"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => {
            setPassword(event.target.value);
            handlePasswordValidation({password: event.target.value})
        }}
        />

        <Button 
        disabled={!isEmailValid || !isPasswordValid}
        variant='outlined' color='button'
        onClick={handleSignup}
        >
            {loading ? <CircularProgress /> : 'Sign up'}
        </Button><br />

        {successMessage && <Typography sx={{color: "green"}}>Signup successful!</Typography>}
        {errorMessage && <Typography sx={{color: "red"}}>{errorMessage}</Typography>} 
        </div>
    )
}

export default Signup