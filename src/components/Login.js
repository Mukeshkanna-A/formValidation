import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../Styled/Login.css";

function Login() {
  const[username,usernameUpdate] = useState('');
  const[password,passwordUpdate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
      sessionStorage.clear();
  },[]);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if(validate()){
      //implementation 
      // console.log("Proceed");
      fetch("http://localhost:8000/user/"+username).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp)
        if(Object.keys(resp).length === 0){
          toast.error("Please enter valid Username")
        }else{
          if(resp.password === password) {
            toast.success("Success");
            sessionStorage.setItem("username",username)
            navigate("/")
          }else{
            toast.error("Please enter valid credentials");
          }
        }
      }).catch((err) =>{
        toast.error("Login Failed due to :"+err.message);
      });
    }
  }
  const validate = () => {
    let result = true;
    if(username === "" || username === null){
      result = false;
      toast.warning("Please enter Username");
    }
    if(password ==="" || password === null){
      result = false;
      toast.warning("Please enter Password");
    }
    return result;
  }
  return (
    <div className='row loginContainer'>
      <div className='offset-lg-3 col-lg-6'> {/* className='offset-lg-3 col-lg-6' */}
        {/* form  */}
        <form onSubmit={ProceedLogin} className='container formContainer'>
          {/* Card  */}
          <div className='card'>
            <div className='card-header'>
                <h2>User Login</h2>
            </div>
            {/* card-body */}
            <div className='card-body'>

              <div className='form-group'>
                  <label>User Name<span className='errmsg'>*</span></label>
                  <input value = {username} onChange={e => usernameUpdate(e.target.value)} type="text" className='form-control' />
              </div>

              <div className='form-group'>
                  <label>Password<span className='errmsg'>*</span></label>
                  <input value = {password} onChange={e => passwordUpdate(e.target.value)} type="password" className='form-control' />
              </div>

              <div className='card-footer'>
                  <button type='submit' className='btn btn-primary' style={{padding:"0.5rem"}}>Login</button>
                  <Link className="btn btn-success" to={"/signup"}  style={{padding:"0.5rem",marginLeft:"0.5rem"}}>New User</Link>
              </div>

            </div>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Login