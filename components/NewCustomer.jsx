import { useState, useEffect } from 'react';
import { Button, Input, Alert } from '.';
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
    handleClose()
  }
  function handleCreate(){
    if (!validate()) {return}
    createCustomer(customerData)
    // create customer in DB
    handleClose()
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-10 border-2 m-4 rounded-lg shadow-lg bg-white">
        
        <h2 className="font-semibold text-3xl col-span-2">Create new customer</h2>
        
            
        <Input
        label="Company name:"
        value={customerData.name}
        name="name"
        onChange={handleChange}
        />
    
        
        <Input
        label="Org number:"
        value={customerData.orgNr}
        name="orgNr"
        onChange={handleChange}
        />
    
        
        <Input
        label="Street adress:"
        value={customerData.streetAdress}
        name="streetAdress"
        onChange={handleChange}
        />
    
        
        <Input
        label="ZIP code and area:"
        value={customerData.zipLocation}
        name="zipLocation"
        onChange={handleChange}
        />
    
        
        <Input
        className="col-span-2"
        label="Email:"
        value={customerData.email}
        name="email"
        onChange={handleChange}
        />
    
        
        <Input
        className="col-span-2"
        label="Contact person:"
        value={customerData.contactName}
        name="contactName"
        onChange={handleChange}
        />
    
        <div className="flex justify-end gap-4 col-span-2">
            <Button  outlined={true} onClick={handleDiscard}> Cancel </Button>
            <Button onClick={handleCreate}> Create </Button>
        </div>

        <Alert heading="Error" visible={errorVis} onClick={() => setErrorVis(false)} />
    </div>
  );
}
