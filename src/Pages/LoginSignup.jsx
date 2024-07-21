import React,{useState} from 'react'
import './CSS/LoginSignup.css'
import toast, { Toaster } from 'react-hot-toast';

export const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
  }

  // For the Login
  const login = async () => {
    console.log("login Function executed", formData);
    let responseData;
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      responseData = await response.json();
      console.log('Response Data:', responseData);
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        toast.success("Login Successfully")
        window.location.replace("/");
      } else {
        alert("Login failed: " + responseData.errors);
      }
  };
  
  // for the SignUp
  const signup = async()=>{
    console.log("signup Function executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>{responseData=data})

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
         toast.success("Signup Successfully");
      window.location.replace("/");
    }
    else{
      toast.error("User Already Exists with same email address/username")
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder='Enter Name'/>:<></>}
          <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder='Email Address'/>
          <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder='Enter Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Login"?
        <p className="loginsignup-login">Create an Account ?<span onClick={()=>(setState("Sign Up"))} >Click Here</span> </p>:<p className="loginsignup-login">Already have an account? <span onClick={()=>(setState("Login"))}>Login</span> </p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuning , I agree to the terms of use & privacy policy.</p>
        </div>
      </div>

    </div>
  )
}
