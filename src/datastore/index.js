import {createContext, useContext} from 'react'
import FirebaseApp from 'firebase/app'
import {firebaseConfig} from './config'
import 'firebase/firestore'
import 'firebase/auth'

export const auth = FirebaseApp.auth;

// in order to initialize, we need to create a default bucket
// set up basic collections
// send profile information to the profile page

class Firebase {
    constructor() {
        if (!FirebaseApp.apps.length) {
            FirebaseApp.initializeApp(firebaseConfig)
            FirebaseApp.firestore()
                .enablePersistence({synchronizeTabs: true})
                .catch(err => console.log(err))
        }

        auth().onAuthStateChanged(function (user) {
            if (user) {
                this.uid = user.uid
            } else {
                //handle the problem of no user
            }
        })

        // instance variables
        this.db = FirebaseApp.firestore()
        this.user = this.db.collection('users').doc('I7CGoEOg2sNgpfuMF8e2m1qFRJP2')
        this.savingsCollection = this.user.collection('savings')
        this.spendingsCollection = this.user.collection('spendings')
        this.bucketsCollection = this.user.collection('buckets')
    }
}

const DatastoreContext = createContext(null)

export {Firebase, DatastoreContext, FirebaseApp}
