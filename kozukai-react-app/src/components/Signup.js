import React, { useRef, useState } from 'react'
import { Typography, Alert, Card, Box, TextField, Button } from '@mui/material'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { CardContent } from '@mui/material';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [ error, setError ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const navigation = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigation("/")
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  const CustomTextField = styled(TextField)({
    width: "100%",
    marginBottom: 10
  })

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography variant="h2" sx={{textAlign: "center"}}>Sign Up</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <CustomTextField id="email" label="Email" type="email" required ref={emailRef} />
            <CustomTextField id="password" label="Password" type="password" required ref={passwordRef} />
            <CustomTextField id="password=confirm" label="Confirm Password" type="password" required ref={passwordConfirmRef} />
            <Button variant="contained" disabled={loading} type="submit" sx={{width: "100%"}}>Sign Up</Button>
          </Box>
        </CardContent>
      </Card>
      <div>Already have an account? <Link to="/login">Log in</Link></div>
    </React.Fragment>
  )
}
