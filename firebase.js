// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, updateDoc, deleteDoc, getDoc, query, where} from "firebase/firestore";

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
    
    return user
  } catch (error) {
    
  }
}

const deleteCustomer = async (customerId) => {
  try{
    const docRef = doc(db,'customers',customerId)
    await deleteDoc(docRef)
    console.log(`Customer ${customerId} deleted successfully`)
  }catch (error) {
    console.log(error)
  }
}

const createNewInvoice = async (invoice) => {
  try{
    await addDoc(collection(db,'invoices'),invoice)
    console.log("Sucessfully created new invoice")
  } catch (error) {
    console.log(error)
    
  }
}


const updateInvoicePaymentStatus = async (invoiceID, paid) => {
  try{
    const invoiceRef = doc(db, 'invoices', invoiceID)
    await updateDoc(invoiceRef, {
      paid: paid
    })

    console.log(`Sucessfully updated ${invoiceID} to paid`)
  } catch (error) {
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
      const e = doc.data()
      e['id'] = doc.id
      res.push(e)
    })
    
    
    res.forEach((e) => {
      try { return e['lines'] = JSON.parse(e.lines)}
      catch (error) { return []}
    })
    
    return res

  } catch (error) {
    
    
  }
}

const fetchCustomersByUser = async (uid) => {
  const res = []
  try{
    const q = query(collection(db, "customers"), where("userRelation", "==", uid));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {   
      const e = doc.data()
      e['id'] = doc.id
      res.push(e)
    })
  } catch (error) {
    console.log(error)
  }
  return res
}


// Add a new document in collection "customers"
const createCustomer = async (customer) => {
  try{
    await addDoc(collection(db, "customers"),customer)
  } catch (error) {
    console.log(error)
  }
}



const updateUser = async (uid, user) => {
  try{
    await setDoc(doc(db, "users", uid),user)
  } catch (error) {
   console.log(error) 
  }
}


export {
  fetchCustomersByUser,
  getUser,
  createCustomer,
  updateUser,
  createNewInvoice,
  fetchInvoicesByUser,
  updateInvoicePaymentStatus,
  deleteCustomer
}