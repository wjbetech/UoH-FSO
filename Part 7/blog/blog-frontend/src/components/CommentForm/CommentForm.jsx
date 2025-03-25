import React from 'react'
import { TextField } from "@mui/material"

export const CommentForm = () => {
  return (
    <form>
      
      <TextField
        id="standard-basic"
        label="Comment"
        variant="standard"
        inputProps={{
          "data-testid": "url",
          style: { color: "#ffffff" },
        }}
        InputLabelProps={{
          style: { color: "#b3b3b3" },
        }}
      />
    </form>
  )
}
