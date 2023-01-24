import React, { useState } from "react";
import { Card, Button, Alert, Box, CardContent } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigation = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigation("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </CardContent>
      </Card>
      <Box>
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    </>
  );
}
