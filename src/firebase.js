import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBaAF_QCun1-oxKaFa-9h6jbE0FN1Rhuc8",
    authDomain: "whatsapp-clone-ff720.firebaseapp.com",
    projectId: "whatsapp-clone-ff720",
    storageBucket: "whatsapp-clone-ff720.appspot.com",
    messagingSenderId: "244103513721",
    appId: "1:244103513721:web:b0c4f25d84325ffbd4f6a8"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();



  export {auth,provider} ;
  export default db;