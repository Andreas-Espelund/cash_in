import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserState } from '../atoms/userAtom'
import { updateUser } from '../firebase';
import { useSession } from 'next-auth/react';
import { Button, Alert, Input } from '.';
export default function UserSettings({handleClose}) {
  
  const [user, setUser] = useRecoilState(UserState)
  const [errorVis, setErrorVis] = useState(false)
  
  const {data: session} = useSession()
  
  const handleChange = event => {
    const { name, value } = event.target
    setUser( prev => ({...prev, [name]:value}))
  }

  const validate = () => {
    const data = user
    const valid = 
      data.contactName !== ""
      && data.email !== ""
      && data.name !== ""
      && data.orgNr !== ""
      && data.streetAdress !== ""
      && data.zipLocation !== ""
      && data.currentInvoice !== ""
    
    if (!valid){
      setErrorVis(true)
    }
    return valid
  }
  // write new user data to server
  const handleSave = (e) => {
    if (!validate()) {return}
    
    updateUser(session.user?.uid, user)
    handleClose()
  }
  // do nothing, go back
  const handleDiscard = (e) => {
    handleClose()
  }
  return (
    <div className="grid grid-cols-2 gap-4 p-10  m-4 rounded-lg shadow-lg bg-neutral">
        
      <h2 className="font-semibold text-3xl col-span-2">Settings</h2>
        
      <Input
      label="Company name:"
      value={user.name}
      name="name"
      onChange={handleChange}
      />

      <Input 
      label="Org number:"
      type="number"
      value={user.orgNr}
      name="orgNr"
      onChange={handleChange}
      />
          
      <Input
      label="Street adress:"
      type="text"
      value={user.streetAdress}
      name="streetAdress"
      onChange={handleChange}
      />
  
      <Input 
      label="Zip code and location:"
      type="text"
      value={user.zipLocation}
      name="zipLocation"
      onChange={handleChange}
      />
       
      <Input
      label="Bank account number:"
      value={user.accountNumber}
      name="accountNumber"
      onChange={handleChange}
      />
      
      <Input
      label="Current invoice number:"
      value={user.currentInvoice}
      name="currentInvoice"
      onChange={handleChange}
      />
    
      <Input 
      className="col-span-2"
      label="Email:"
      type="email"
      value={user.email}
      name="email"
      onChange={handleChange}
      />
  
      <Input
      className="col-span-2"
      label="Contact person:"
      value={user.contactName}
      name="contactName"
      onChange={handleChange}
      />

      <div className="col-span-2 flex justify-end gap-4">
          <Button  outlined={true} onClick={handleDiscard}> Cancel </Button>
          <Button onClick={handleSave}> Save </Button>
      </div>

      <Alert heading="Error" visible={errorVis} onClick={() => setErrorVis(false)}/>
    </div>
  );
}
