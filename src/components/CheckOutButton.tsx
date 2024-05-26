import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormDate } from "@/forms/user-profile-form/UserProfileForm";
import { useGetUser } from "@/api/UserApi";

type Props = {
    onCheckOut: (userFormData: UserFormDate) => void;
    disabled: boolean;
    isLoading: boolean;
}

const CheckOutButton = ({onCheckOut, disabled, isLoading}: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const {currentUser, isLoading: isGetUserLoading} = useGetUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-red-500">
        Log in to check out
      </Button>
    );
  }
  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
        <DialogTrigger>
            <Button disabled={disabled} className="bg-red-500 flex-1">Go to check out</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] md:min-w-[700px]">
            <UserProfileForm title="Confirm Delivery Details" buttonText="Continue to Payment" currentUser={currentUser} onSave={onCheckOut} isLoading = {isGetUserLoading} />
        </DialogContent>
    </Dialog>
  )
};

export default CheckOutButton;
