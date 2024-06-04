import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileNavLink() {
    const {logout} = useAuth0();
  return (
    <>
    <Link to='/user-profile' className="flex justify-center bg-red-100 items-center font-bold hover:text-red-500 py-3 rounded-lg hover:shadow-lg transition-shadow ease-in delay-75">
        User Profile
    </Link> 
    <Link to='/order-status' className="flex justify-center bg-red-100 items-center font-bold hover:text-red-500 py-3 rounded-lg hover:shadow-lg transition-shadow ease-in delay-75">
      My Orders
    </Link>
    <Link to='/manage-restaurant-page' className="flex justify-center bg-red-100 items-center font-bold hover:text-red-500 py-3 rounded-lg hover:shadow-lg transition-shadow ease-in delay-75">
        Manage Restaurant
    </Link> 
    <Button onClick={() => logout()} className="flex items-center px-3 font-bold bg-red-500">
        Logout
    </Button>
    </>
  )
}
