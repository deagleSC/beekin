import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'
import { BusinessCenter, WorkHistory } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';

const Job = ({data}) => {

    const navigate = useNavigate()

    return (
    <Card
    sx = {{
        margin: "20px",
        bgcolor: 'white',
        transition: '0.5s ease',
        border: '0.3px solid rgb(200, 200, 200)',
        cursor: 'pointer',
        '&:hover': {
            bgcolor: 'rgb(230, 230, 230)'
        }
    }}
    onClick={() => navigate(`/${data._id}`)}
    >
    <CardContent>
        <div><b>{data.title}</b></div>

        <small>
        <div style={{display: 'flex'}}>
        <div 
        style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
        <BusinessCenter sx={{width: "15px", color: "rgb(80, 80, 80)"}} /> &nbsp; {data.company}
        </div> &nbsp;
        <div 
        style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
        <WorkHistory sx={{width: "15px", color: "rgb(80, 80, 80)"}} /> &nbsp; {data.type}
        </div>
        </div>
        </small>
        <br />

        <div>$ {data.salary}</div>
    </CardContent>
    </Card>
    )
}

export default Job