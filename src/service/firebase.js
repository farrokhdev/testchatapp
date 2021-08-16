import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
const apikey=process.env.REACT_APP_API_KEY;
const authdomain= process.env.REACT_APP_AUTH_DOMAIN;
const projectId= process.env.REACT_APP_PROJECT_ID;
const storageBucket= process.env.REACT_APP_STORAGE_BUCKET;
const messagingSender= process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId= process.env.REACT_APP_APP_ID;

try {
  firebase.initializeApp({
    apiKey: apikey,
    authDomain: authdomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSender,
    appId: appId
  });
  console.log()
} catch (error) {
  // if (!/already exists/u.test(error.message)) {
  //   console.error(`firebase admin iniyialize ${error.message}`, error.stack);
  // }
  console.log(error)
}

export const fb = {
  auth: firebase.auth(),
  storage: firebase.storage(),
  fireStore: firebase.firestore(),
};
