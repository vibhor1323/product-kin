import React , {useState,fetchData,state} from 'react'
//import { Redirect } from 'react-router-dom';
import axios from 'axios';
import logo from '../../resources/logo.png'
import Illustration from '../../resources/Illustration.png'
import './authentication.css'
import { Link } from 'react-router-dom'
import { GoogleLogin  } from 'react-google-login';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



toast.configure();



export default function Authentication() {
 
    
window.addEventListener('resize', () => {

})
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupPassword2, setSignupPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [activateLoader, setActiveLoader] = useState(false);
    const [toggleOn, setToggleOn]= useState(false)
    const [GtoggleOn, setGToggleOn]= useState(false)
    const [StoggleOn, setSToggleOn]= useState(false)

    function handleloginEmailChange(event) {
        setLoginEmail(event.target.value);
    }
    
    function handleloginPasswordChange(event) {
        setLoginPassword(event.target.value);
    }

    function handleSignupNameChange(event) {
        setSignupName(event.target.value);
    }

    function handleSignupEmailChange(event) {
        setSignupEmail(event.target.value);
    }

    function handleSignupPasswordChange(event) {
        setSignupPassword(event.target.value);
    }

    function handleSignupPassword2Change(event) {
        setSignupPassword2(event.target.value);
    }


    function handleLogin(event) {
        event.preventDefault();
        setActiveLoader(true);
        setToggleOn(!toggleOn)
        console.log(loginEmail, " ", loginPassword);
        let isLoggedIn = false;
        const loginDetails = {
            email : loginEmail,
            password : loginPassword
        };

        console.log(loginDetails)

        axios.post('/login', loginDetails)
        .then(function (response) {
            setActiveLoader(false);
            console.log("inside response");
            console.log(response.data);
            if(response.data.status === "true")
            {
                toast.success(response.data.message, {position : toast.POSITION.TOP_RIGHT});
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("profile_pic", response.data.profile_pic);
                window.location="/";
            }
            else{
                toast.error(response.data.message, {position : toast.POSITION.TOP_RIGHT});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        

    }
    
   

    function handleSignup(event) {
        event.preventDefault();
        setSToggleOn(!StoggleOn)
        if(signupPassword.length < 6)
            toast.error("Password should have atleast 6 characters", {position : toast.POSITION.TOP_RIGHT});
        else if(signupPassword !== signupPassword2)
            toast.error("Password and Confirm Password must be same", {position : toast.POSITION.TOP_RIGHT});
        else{
            setActiveLoader(true);
            const signupDetails = {
                name : signupName,
                email : signupEmail,
                password : signupPassword
            };
    
            console.log(signupDetails)
    
            axios.post('/signup', signupDetails)
            .then(function (response) {
                setActiveLoader(false);
                console.log("inside signup response");
                console.log(response.data);
                if(response.data.status === "true")
                {
                    toast.success("Registration Successfull. Login to continue", {position : toast.POSITION.TOP_RIGHT});
                    window.location="/login"
                }
                else{
                    //alert(response.data.message);
                    toast.error(response.data.message, {position : toast.POSITION.TOP_RIGHT});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        setGToggleOn(!GtoggleOn)
        var id_token = googleUser.getAuthResponse().id_token;  
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const responseData = JSON.parse(this.responseText);
                toast.success(responseData.message, {position : toast.POSITION.TOP_RIGHT});
                localStorage.setItem("accessToken", responseData.accessToken);
                localStorage.setItem("name", responseData.name);
                localStorage.setItem("profile_pic", responseData.profile_pic);
                window.location="/";
            }
        };
        xhr.open('Post', '/googlelogin');
        var type = xhr.responseType;
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if(xhr.responseText == 'success'){
                //console.log("xhr here", xhr);
                //signOut();
                // location.assign('/dashboard')
            }
        };
        xhr.send(JSON.stringify({token : id_token}));
      }

return (
<>  

    <div className="container-fluid">
        <div className="img mt-3">
            <img src={logo} alt="" />
        </div>
        <div className="text-center mt-2" id="main-hd">
            <p>Learn from the Kin, Practice with the Peers, Compete with the Community</p>
        </div>


        <div className="row justify-content-around mt-5">

            <div className="col-6" id="illustration">
                <img src={Illustration} alt="" />
            </div>

            <div className="col-4 form-main">
             {/* <strong>{message}</strong> */}
                <div className="form-ap">
                    <input type="checkbox" className="btn-main " />
                    <form className="login" onSubmit={handleLogin}>
                        <div className="login">
                            <p>Doesn’t have an account yet? <a href="">Sign Up</a></p>
                            <div className="form-group mt-3">
                                <label htmlFor="InputEmail">Email</label>
                                <input type="email" className="form-control" id="InputEmail"
                                    placeholder="xyz@example.com" onChange = {handleloginEmailChange} value={loginEmail} required/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="InputPassword">Password</label>
                                <input type="password" className="form-control" id="InputPassword"
                                    placeholder="Enter 6 characters or more" onChange = {handleloginPasswordChange} value={loginPassword}required />
                            </div>
                            <div className="form-check mt-3">
                                <div className="row row justify-content-between ">
                                    <div className="col-4">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                    </div>
                                    <div className="col-4">
                                        <Link exact to="/login/forget">Forgot Password</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <NavLink exact to="/"> */}
                                <button type="submit"  className="btn btn-primary mt-3 loader" id="login-2" ><span>Login</span>&nbsp;{toggleOn ? <i class="fa fa-spinner fa-spin" ></i> :"" } </button>
                            {/* </NavLink> */}
                            <h6 className="mt-4"><span>or login with</span></h6>
                            <GoogleLogin class="r2"
                              clientId="364428087639-8k31roj34nr5i16nvn21m3anuj6hf93r.apps.googleusercontent.com" onSuccess={onSignIn}
                               render={renderProps => (

                              <button id="login-3" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fa fa-google"></i> <span>Sign In with Google</span>&nbsp;{GtoggleOn ? <i class="fa fa-spinner fa-spin" ></i> :"" }</button>

                              )}
                               buttonText="Login"

                               cookiePolicy={'single_host_origin'}
                              />
                            {/* <GoogleLogin
        class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"  data-longtitle="true"/> */}
                            {/* <button type="button" className="btn btn-primary mt-3 " id="login-3" data-onsuccess="onSignIn"><i className="fa fa-google"></i> <span>
                                Sign In with Google </span></button> */}
                               {/* <GoogleButton class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="393" data-height="50" border-radius="20" data-longtitle="true"/> */}
                                {/* <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="393" data-height="50" border-radius="20" data-longtitle="true"></div> */}
                        </div>
                    </form>
                    <form className="signup" onSubmit={handleSignup} >
                        <div className="signup">


                            <div className="form-group mt-4">
                                <label htmlFor="name">Name <span style={{color: "red"}}>*</span></label>
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                    placeholder="John Bid" onChange = {handleSignupNameChange} value={signupName} required/>
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputEmail1">Email <em>*</em></label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                    placeholder="xyz@example.com"  onChange = {handleSignupEmailChange} value={signupEmail} required />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputPassword1">Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Enter 6 characters or more" onChange = {handleSignupPasswordChange} value={signupPassword} required />
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="exampleInputPassword1">Confirm Password <em>*</em></label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    placeholder="Enter 6 characters or more" onChange = {handleSignupPassword2Change} value={signupPassword2} required />
                            </div>
                            <div className="form-check mt-2">
                                <div className=" row row justify-content-around ">
                                    <div className="">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Yes, I want to
                                            receive updates on the new challenges</label>
                                    </div>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" id="login-2"><spna>Signup</spna>&nbsp;{StoggleOn ? <i class="fa fa-spinner fa-spin" ></i> :"" }</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>


    </div>

</>
)
}
