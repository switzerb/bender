import React from 'react'
import {signInWithGoogle} from '../datastore/auth'

const SignIn = () => (<button onClick={() => signInWithGoogle()}>Sign In</button>)

export default SignIn;

