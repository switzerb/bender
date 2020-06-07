import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBkAwlntHNFlt_bfl_2KCSV6Al7c63kTgY",
    authDomain: "bender-13a85.firebaseapp.com",
    databaseURL: "https://bender-13a85.firebaseio.com",
    projectId: "bender-13a85",
    storageBucket: "bender-13a85.appspot.com",
    messagingSenderId: "445494690576",
    appId: "1:445494690576:web:b0c65cca6520099b4f9b95"
};
firebase.initializeApp(config);
firebase.firestore()
    .enablePersistence({synchronizeTabs: true})
    .catch(err => console.log(err))

export default firebase;