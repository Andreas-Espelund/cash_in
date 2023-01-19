// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, getDoc, query, where} from "firebase/firestore";


const USER_ID = "920987494"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOafVa84wceQzaVY6g5AG7kC5mtJlD9Mw",
  authDomain: "cashdaddy-d000e.firebaseapp.com",
  projectId: "cashdaddy-d000e",
  storageBucket: "cashdaddy-d000e.appspot.com",
  messagingSenderId: "1086198642525",
  appId: "1:1086198642525:web:c3a2369cee40fefd801ab4",
  measurementId: "G-J3F6GBSCZJ"
};

// Initialize Firebase
const app = !getApps().length ?  initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)





const getUser = async (uid) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"), uid)
    const user = querySnapshot.docs[0].data()
    console.log(`Fetched '${user.name}' from database`)
    return user
  } catch (error) {
    console.log("Unable to fetch user")
  }
}

const createNewInvoice = async (invoice) => {
  try{
    await addDoc(collection(db,'invoices'),invoice)
    console.log(`Sucessfully created ${invoice.number}`)
  } catch (error) {
    console.log(`ERROR! Unable to create ${invoice.number}`)
    console.log(error)
  }
}

const fetchInvoicesByUser = async (uid) => {
  try{
    const q = query(collection(db, "invoices"), where("user", "==", uid));
    const querySnapshot = await getDocs(q);
    const res = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      res.push(doc.data())

    })
    console.log("TESTING FETCH")
    
    res.forEach((e) => {
      try { return e['lines'] = JSON.parse(e.lines)}
      catch (error) { return []}
    })
    console.log(res)
    return res

  } catch (error) {
    console.log(error)
    console.log("ERROR! Unable to fech invoices")
  }
}

const fetchCustomersByUser = async (uid) => {
  const res = []
  try{
    const q = query(collection(db, "customers"), where("userRelation", "==", uid));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => { res.push(doc.data())})
    
  } catch (error) {
    console.log(error)
    console.log("ERROR! Unable to fech customers")
  }

  return res

}


// Add a new document in collection "customers"
const createCustomer = async (customer) => {
  try{
    await setDoc(doc(db, "customers", customer.orgNr),customer)
    console.log(`Sucessfully created '${customer.name}' in db`)

  } catch (error) {
    console.log(`ERROR! Unable to create '${customer.name}' in db`)
  }
}



const updateUser = async (uid, user) => {
  try{
    await setDoc(doc(db, "users", uid),user)
    console.log(`Sucessfully created '${user.name}' in db`)

  } catch (error) {
    console.log(`ERROR! Unable to create '${user.name}' in db`)
  }
}


export {fetchCustomersByUser, getUser, createCustomer, updateUser, createNewInvoice, fetchInvoicesByUser}