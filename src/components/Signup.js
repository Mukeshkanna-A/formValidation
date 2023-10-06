import React, { useState } from "react";
import "../Styled/Signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [password, passwordChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [gender, genderChange] = useState("");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errormessage = "Please enter the Value in ";
    if (id === null || id === "") {
      isProceed = false;
      errormessage += " Username";
    }
    if (name === null || name === "") {
      isProceed = false;
      errormessage += " Fullname";
    }
    if (password === null || password === "") {
      isProceed = false;
      errormessage += " password";
    }
    if (email === null || email === "") {
      isProceed = false;
      errormessage += " Email";
    }
    if (!isProceed) {
      toast.warning(errormessage);
    }else{
      if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

      }else{
          isProceed = false;
          toast.warning("Please enter the valid email");
      }
    }
    return isProceed;
  };

  const handlesubmit = (e) => {

    e.preventDefault();
    let regobj = { id, name, password, email, phone, gender };
    // console.log(regobj);

    if (isValidate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed:" + err.message);
        });
    }
  };
  return (
    <div className="row signupContainer">
      <div className="offset-lg-3 col-lg-6">
        <form className="container formContainer" onSubmit={handlesubmit}>
          <div className="card" style={{backgroundColor:"gray"}}>
            <div className="card-header">
              <h3>User Registration</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User Name<span className="errmsg">*</span>
                    </label>
                    <input
                      value={id}
                      onChange={(e) => idChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password<span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => passwordChange(e.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full Name<span className="errmsg">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => nameChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email<span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => emailChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone Number<span className="errmsg">*</span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => phoneChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <input
                      checked={gender === "male"}
                      onChange={(e) => genderChange(e.target.value)}
                      className="app-check"
                      name="gender"
                      value="male"
                      type="radio"
                      id="male"
                    />
                    <label htmlFor="male">Male</label>

                    <input
                      checked={gender === "female"}
                      onChange={(e) => genderChange(e.target.value)}
                      className="app-check"
                      name="gender"
                      value="female"
                      type="radio"
                      id="female"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary" style={{padding:"0.5rem",marginLeft:"0.5rem"}}>
                Register
              </button>
              <Link className="btn btn-danger" to={"/login"} style={{padding:"0.5rem",marginLeft:"0.5rem"}}>Back</Link>
              {/* <Link className="btn btn-success" to={"/signup"}>New User</Link> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
