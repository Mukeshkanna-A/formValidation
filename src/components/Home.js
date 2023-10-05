import React,{useEffect} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import image from "../Assets/HomePage.jpg";
import "../Styled/Home.css";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if(username==="" || username === null){
      navigate("/login");
    }
  },[]);
  return (
    <div>
      <div className='header'>
        <h2>Premium</h2>
        <div className='links'>
          <Link to={"/"} className='singleLink'>Home</Link>
          <Link to={"/login"} className='singleLink singleLink2'>Log Out</Link>
        </div>
      </div>
      <img src={image} style={{width:"100%",height:"92vh"}}></img>
      
    </div>
  )
}

export default Home