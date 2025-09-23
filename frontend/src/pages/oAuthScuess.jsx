import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const {isLoading, authUser} = useAuthUser();

  useEffect(() => {
    // console.log("OAuthSuccess page loaded");

    if(!isLoading){
      if(authUser){
        // console.log("authenticate user", authUser);
        
        if(authUser.isOnboarded) {
          //already onboarded - navigate to  home
           navigate("/", {replace: true});
          //  console.log("User is onboarded, navigating to home.");
        } else {
          // not onboarded - navigate to onboarding
          navigate("/onboarding", {replace: true});
          // console.log("User is not onboarded, navigating to onboarding.");
        }

      } else {
        // console.log("No authenticated user found, redirecting to login");
        navigate ("/login", {replace: true});
      }
    }
  }, [isLoading, authUser, navigate]);

  return <div>Logging you in... Please wait.</div>;
  
}

export default OAuthSuccess;