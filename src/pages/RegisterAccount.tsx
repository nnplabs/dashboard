import { Button, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { useSetupAccount } from "../hooks/useAccount";

function RegisterAccount() {
  const [accountName, setAccountName] = React.useState("");
  const [receiverId, setReceiverId] = React.useState("");

  const { isLoading, setupAccount } = useSetupAccount();
  const handleSubmit = async () => {
    const account = await setupAccount({
      accountName: accountName,
      contractAddress: receiverId,
    }).catch((e) => {
      toast.error("Something went wrong.");
      console.log(e);
    });
    if (account) window.location.reload();
  };

  return (
    <div className="flex bg-gray-100 h-screen w-screen">
      <div className="flex flex-col gap-y-7 w-[600px] m-auto bg-white rounded-lg p-7 pt-14">
        {isLoading ? (
          <div className="flex m-auto">
            <CircularProgress />
          </div>
        ) : (
          <>
            <TextField
              value={accountName}
              onChange={(e) => {
                setAccountName(e.target.value);
              }}
              className="w-full"
              label="Account Name"
              required
              variant="outlined"
            />
            <TextField
              value={receiverId}
              defaultValue={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="w-full"
              required
              label="Contract Address"
              variant="outlined"
              helperText={
                "Please enter the contract address for which you want to setup notifications."
              }
            />
            <div className="flex justify-end mt-5">
              <Button
                onClick={handleSubmit}
                disabled={accountName === "" || receiverId === ""}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisterAccount;
