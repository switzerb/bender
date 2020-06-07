import React, { createContext } from 'react'
import { auth } from '.'

export const UserContext = createContext({
  user: null,
  logout: () => logout()
});

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function logout() {
  return auth().signOut();
}

class UserProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      user: null
    }
  }

  componentDidMount = () => {
    auth().onAuthStateChanged(userAuth => {
      this.setState({ user: userAuth});
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
