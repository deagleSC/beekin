import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Container, Typography, Box, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import { CircularProgress, Modal } from '@mui/material'
import Login from './Login'
import Signup from './Signup'
import logo from '../assets/logo.png'

const Navbar = () => {

	let { currentUser } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [authRequest, setAuthRequest] = useState(0)
    const [loading, setLoading] = useState(false)

	useEffect(() => {

	}, [currentUser])

	const handleModal = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
        setLoading(true)
        dispatch(logout())
        setOpen(false)

        localStorage.removeItem("token")

        setLoading(false)
    }

	const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxWidth: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        border: 'none',
        borderRadius: '20px',
        display: 'flex',
      };


	return (
	<AppBar position="static">
		<Container maxWidth="xl">
		<Toolbar disableGutters>

		<Box display='flex' flexGrow={1}>
		<img src={logo} height="30px" />
		<Typography></Typography>
		</Box>
		
		{currentUser ? 
		<Button variant='outlined' color='button' onClick={handleLogout}>
			{loading ? <CircularProgress /> : 'Log out'}
		</Button>
		:
		<>
		<Button variant='outlined' color='button' sx={{marginRight: "10px"}}
		onClick={() => {
            handleModal()
            setAuthRequest(0)
        }}
		>Login</Button>

		<Button variant='outlined' color='button'
		onClick={() => {
            handleModal()
            setAuthRequest(1)
        }}
		>Sign up</Button>

		<Modal
		open={open}
		onClose={handleModal}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
		>
		<Box sx={style}>
			{authRequest === 0 ? <Login /> : <Signup />}
		</Box>
		</Modal>
		</>
		}

		</Toolbar>
		</Container>
	</AppBar>
	);
}
export default Navbar;

