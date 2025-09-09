import React ,{useEffect, useState} from 'react'
import {  Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({children}) => {

const [isAuthenticated, setIsAuthenticated]=useState(null);

const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem('access');
if(token){

const {exp}=jwtDecode(token)
if(exp*1000 < new Date().getTime()){
  refreshAccess()
}
console.log(exp)
setIsAuthenticated(true); 
}
else{ 
  console.log(exp)
    setIsAuthenticated(false);
}
},[] )

const refreshAccess=async()=>{
  try{
const response =await axios.post('http://127.0.0.1:8000/api/token/refresh/',{
  refresh: localStorage.getItem('refresh')
  
})
 localStorage.setItem('access',response.data.access);

console.log('refresh');
setIsAuthenticated(true);
  }
  catch(error){
 setIsAuthenticated(false)
}
}

if(isAuthenticated === null){
    return(
        <>
        <h1>Loading...</h1>
        </>
    )
}
  return (
    <div>
      {isAuthenticated ? children :<Navigate to='/sign-in'/>}
    </div>
  )
}
export default ProtectedRoute
