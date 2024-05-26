import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLink from "./MobileNavLink";


export default function MobileNav() {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className="text-red-500"/>
        </SheetTrigger>
        <SheetContent className=" space-y-3 bg-red-50">
            <SheetTitle>
                {
                    isAuthenticated ? 
                    <span className="flex items-center font-bold gap-2">
                        <CircleUserRound />
                        {user?.email}
                    </span> : 
                    <span>Welcome to Swiggy</span>
                }
            </SheetTitle>
            <Separator/>
            <SheetDescription className="flex flex-col gap-4">
                {
                    isAuthenticated ? <MobileNavLink /> : 
                    <Button onClick={() => loginWithRedirect()} className="flex-1 font-bold bg-red-500">
                        Log In
                    </Button>
                }
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
