import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"
import { useCreateUser } from "./UserApi";
import { useEffect, useRef } from "react";

const AuthCallBackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateUser();
    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if(user && user.sub && user.email && !hasCreatedUser.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email
            })
            hasCreatedUser.current = true;
        }
        navigate('/');
    },[createUser, navigate, user]);
    return (
        <>  
            Loading...
        </>
    )
}

export default AuthCallBackPage