import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

export default function MainNav() {
  const {loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-4 items-center">
      {
        isAuthenticated ? (
          <>
            <Link to='/order-status'>
              <span className=" font-semibold hover:text-red-500  ">Orders</span>
            </Link>
            <UserNameMenu />
          </>
        ) : (
          <Button 
            variant='ghost' 
            className="font-bold hover:text-red-500 hover:bg-red-50"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </Button>
        )
      }
    </span>
    
  )
}
