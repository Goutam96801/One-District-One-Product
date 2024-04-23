import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input-box";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../App";
import axios from 'axios';
import { storeInSession } from "../common/session";

const SellerAuthentication = ({type}) => {

    let {userAuth: {access_token}, setUserAuth } = useContext(UserContext);

    const userAuthThroughServer = (serverRoute, formData) => {
      axios.post(process.env.REACT_APP_SERVER_DOMAIN + serverRoute, formData)
      .then(({data}) => {
        storeInSession("user", JSON.stringify(data));
        console.log(data)
        setUserAuth(data);
      })
      .catch(({response}) => {
        console.log(response.data.message);
      })
    }

    const handleSubmit = (e) => {
      
        e.preventDefault();

      let serverRoute = type === "seller-sign-in" ? "/seller/login" : "/seller/signup";

      let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    let form = new FormData(e.target);
    let formData = {};

    for(let [key, value] of form.entries()){
      formData[key] = value;
    }

    let {fullname, email, password, state, pincode} = formData;

    if (type === "seller-sign-up" && !fullname) {
        return console.error("Fullname is required");
      
    }
    if (!email.length) {
      return console.error("Email is required");
    }
    if (!emailRegex.test(email)) {
      return console.error("Email is invalid");
    }
    if (password.length < 6) {
      return console.error("Password is required");
    }

    if (type === "seller-sign-up" && (!state || !pincode)) {
      return console.error("State and pincode are required for signup");
    }

    userAuthThroughServer(serverRoute, formData);

    }

    return (
      access_token ? <Navigate to="/"/> :
        <AnimationWrapper keyValue={type}>
        <div className="relative">
          <h1 className="absolute top-0 left-0 z-[-10] text-[300px] font-gelasio bg-red w-full h-full flex items-center justify-center">VENDOR</h1>
        <section className="h-cover flex items-center justify-center">        
              <form
                onSubmit={handleSubmit}
                className="w-[80%] max-w-[400px] z-10 min-h-[550px] bg-blur rounded-lg py-3 px-8"
              >
                <h1 className="text-4xl capitalize text-center mb-24 text-white">
                  {type === "sign-in" ? "Welcome Back" : "Join Us Today"}
                </h1>
               
  
                {type === "seller-sign-up" ? (
                  <div>
                    <InputBox
                      name="fullname"
                      type="text"
                      placeholder="full name"
                      icon="fi-rr-user"
                      className=" bg-dark-grey/40 text-white"
                      
                    />
                  </div>
                ) : (
                  ""
                )}
  
                <InputBox
                  name="email"
                  type="email"
                  placeholder="email"
                  icon="fi-rr-envelope"
                  className=" bg-dark-grey/40 text-white"
                />

{type === "seller-sign-up" ? (
                <div>
                  <InputBox
                    name="state"
                    type="text"
                    placeholder="state"
                    icon="fi-rr-state-country"
                    className=" bg-dark-grey/40 text-white"
                  />
                  <InputBox
                name="pincode"
                type="number"
                placeholder="pin code"
                icon="fi-rr-marker"
                className=" bg-dark-grey/40 text-white"
              />

                </div>
              ) : (
                ""
              )}

  
                <InputBox
                  name="password"
                  type="password"
                  placeholder="password"
                  icon="fi-rr-lock"
                  className=" bg-dark-grey/40 text-white"
                />
  
                <button
                  type="submit"
                  className="btn-transparent center mt-14 duration-300"
                >
                  {type === "seller-sign-in" ? "Log In" : "Create new account"}
                </button>
  
                <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
              <hr className="w-1/2 border-white"/>
              <p className="text-white">or</p>
              <hr className="w-1/2 border-white"/>
            </div>
            {
              type === "seller-sign-in" ? 
              <p className="text-white">Don't have an account ? <Link to="/seller/signup">Signup here</Link></p> :
              <p className="text-white">Already have an account ? <Link to="/seller/login">Login here</Link></p>
            }
  
              </form>
        </section>
        </div>
      </AnimationWrapper>
    )
}
export default SellerAuthentication;