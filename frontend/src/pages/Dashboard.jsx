import React from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button';

const Dashboard = () => {
  const {authUser, isCheckingAuth} = useAuth()

  console.log(authUser);

  if(isCheckingAuth) return <h1>Loading..</h1>
  
  return (
    <div>Dashboard</div>
  
  )
}

export default Dashboard