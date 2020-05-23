import React from 'react'
import { DatastoreContext } from '.'

export const withDatastore = Component => props => (
  <DatastoreContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </DatastoreContext.Consumer>
)
