import React from 'react'
import {signInWithGoogle} from '../datastore/auth'
import { Button } from '@material-ui/core'

const SignIn = () => {
  return (
    <Button
      variant="contained"
      onClick={() => signInWithGoogle()}>
      Sign In
    </Button>
  )
}

export default SignIn;

