import { createContext } from 'react'
import FirebaseApp from 'firebase/app'
import { firebaseConfig } from './config'
import 'firebase/firestore'
import 'firebase/auth'

export const auth = FirebaseApp.auth;

class Firebase {
  constructor() {
    if (!FirebaseApp.apps.length) {
      FirebaseApp.initializeApp(firebaseConfig)
      FirebaseApp.firestore()
        .enablePersistence({ synchronizeTabs: true })
        .catch(err => console.log(err))
    }

    // instance variables
    this.db = FirebaseApp.firestore()
    this.transactionsCollection = this.db.collection('transactions')
    this.savingsCollection = this.db.collection('savings')
    this.spendingsCollection = this.db.collection('spendings')
    this.bucketsCollection = this.db.collection('buckets')
  }
}

const DatastoreContext = createContext(null)

export { Firebase, DatastoreContext, FirebaseApp }
