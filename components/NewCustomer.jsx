import { useState, useEffect } from 'react';
import Alert from './Alert';
import Button from './Button';
import { useSession } from 'next-auth/react';
import { createCustomer } from '../firebase';
export default function NewCustomer({handleClose}) {

  const {data: session} = useSession()
  const [errorVis, setErrorVis] = useState(false)
  
  const [customerData, setCustomerData] = useState({
    contactName: '',
    email: '',
    name: '',
    orgNr: '',
    streetAdress: '',
    zipLocation: '',
    userRelation: session.user?.uid
  });

  const handleChange = event => {
    const { name, value } = event.target
    setCustomerData( prev => ({...prev, [name]:value}))
  }

  const validate = () => {
    const data = customerData
    const valid = 
      data.contactName !== ""
      && data.email !== ""
      && data.name !== ""
      && data.orgNr !== ""
      && data.streetAdress !== ""
      && data.zipLocation !== ""
      && data.userRelation === session.user?.uid
    
    if (!valid){
      setErrorVis(true)
    }
    return valid
  }

  function handleDiscard(){
    console.log("discarding")
    handleClose()
  }
  function handleCreate(){
    if (!validate()) {return}
    createCustomer(customerData)
    // create customer in DB
    handleClose()
  }

  return (
    <div className="flex flex-col gap-4 p-10 border-2 m-4 rounded-lg shadow-lg bg-white">
        
        <h2 className="font-semibold text-3xl">Create new customer</h2>
        <label className="flex flex-col">
            Company name:
            <input className="p-4 border-2 rounded-lg outline-green-400"
            value={customerData.name}
            name="name"
            onChange={handleChange}
            />
        </label>
        <label className="flex flex-col">
            Org number:
            <input type="number" className="p-4 border-2 rounded-lg outline-green-400"
            value={customerData.orgNr}
            name="orgNr"
            onChange={handleChange}
            />
        </label>
        <label className="flex flex-col">
            Street adress:
            <input type="text" className="p-4 border-2 rounded-lg outline-green-400"
            value={customerData.streetAdress}
            name="streetAdress"
            onChange={handleChange}
            />
        </label>
        <label className="flex flex-col">
            ZIP code and area:
            <input type="text" className="p-4 border-2 rounded-lg outline-green-400"
            value={customerData.zipLocation}
            name="zipLocation"
            onChange={handleChange}
            />
        </label>
        <label className="flex flex-col">
            Email:
            <input type="email" className="p-4 border-2 rounded-lg outline-green-400"
            value={customerData.email}
            name="email"
            onChange={handleChange}
            />
        </label>
        <label className="flex flex-col">
            Contact person:
            <input className="p-4 border-2 rounded-lg outline-green-400"
            value={customerData.contactName}
            name="contactName"
            onChange={handleChange}
            />
        </label>
    
        <div className="flex justify-end gap-4">
            <Button  outlined={true} onClick={handleDiscard}> Cancel </Button>
            <Button onClick={handleCreate}> Create </Button>
        </div>

        <Alert heading="Error" visible={errorVis} onClick={() => setErrorVis(false)} />
    </div>
  );
}
