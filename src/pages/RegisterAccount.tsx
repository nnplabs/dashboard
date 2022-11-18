import { Button, TextField } from '@mui/material';
import React from 'react'

function RegisterAccount() {
    const [accountName, setAccountName] = React.useState("");
    const [receiverId, setReceiverId] = React.useState("");

  return (
    <div className='flex bg-gray-100 h-full'>
      <div className="flex flex-col gap-y-7 w-[60%] m-auto bg-white rounded-lg p-7 pt-14">
          <TextField
            value={accountName}
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
            className="w-[80%]"
            label="Account Name"
            required
            variant='outlined'
          />
          <TextField
            value={receiverId}
            defaultValue={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-[80%]"
            required
            label="Contract Address"
            variant="outlined"
            helperText={"Please enter the contract address for which you want to setup notifications."}
          />
          <div className='flex justify-end mt-5'>
            <Button disabled={accountName === "" || receiverId === ""} variant="contained" color="primary">
                Save
            </Button>
        </div>
        </div>
    </div>
  )
}

export default RegisterAccount
