import { useState, useEffect } from 'react';
import Button from './Button';
import Alert from './Alert';
import { useRecoilState } from 'recoil';
import { UserState } from '../atoms/userAtom'
import { updateUser } from '../firebase';
import { useSession } from 'next-auth/react';

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
    console.log("SAVING")
    console.log(session.user?.uid)
    console.log(user)
    
    updateUser(session.user?.uid, user)
    handleClose()
  }
  // do nothing, go back
  const handleDiscard = (e) => {
    console.log("Discarding changes")
    handleClose()
  }
  return (
    <div className="flex flex-col gap-4 p-10  m-4 rounded-lg shadow-lg bg-white">
        
        <h2 className="font-semibold text-3xl">Settings</h2>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col flex-1">
              Company name:
              <input className="p-4 border-2 rounded-lg"
              value={user.name}
              name="name"
              onChange={handleChange}
              />
          </label>
          <label className="flex flex-col">
              Org number:
              <input type="number" className="p-4 border-2 rounded-lg"
              value={user.orgNr}
              name="orgNr"
              onChange={handleChange}
              />
          </label>
        </div>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col flex-1">
              Street adress:
              <input type="text" className="p-4 border-2 rounded-lg"
              value={user.streetAdress}
              name="streetAdress"
              onChange={handleChange}
              />
          </label>
          <label className="flex flex-col ">
              Zip code and location:
              <input type="text" className="p-4 border-2 rounded-lg"
              value={user.zipLocation}
              name="zipLocation"
              onChange={handleChange}
              />
          </label>
        </div>
        
        <div className="flex justify-between gap-4">
          <label className="flex flex-col flex-1">
              Bank account number:
              <input className="p-4 border-2 rounded-lg"
              value={user.accountNumber}
              name="accountNumber"
              onChange={handleChange}
              />
          </label>

          <label className="flex flex-col">
              Current invoice number:
              <input className="p-4 border-2 rounded-lg"
              value={user.currentInvoice}
              name="currentInvoice"
              onChange={handleChange}
              />
          </label>
        </div>
        <label className="flex flex-col">
            Email:
            <input type="email" className="p-4 border-2 rounded-lg"
            value={user.email}
            name="email"
            onChange={handleChange}
            />
        </label>
        <label className="flex flex-col">
            Contact person:
            <input className="p-4 border-2 rounded-lg"
            value={user.contactName}
            name="contactName"
            onChange={handleChange}
            />
        </label>
    
    
        <div className="flex justify-end gap-4">
            <Button intent="danger"  text="Cancel" onClick={handleDiscard}/>
            <Button intent="primary" text="Save" onClick={handleSave}/>
        </div>

        <Alert heading="Error" visible={errorVis} onClick={() => setErrorVis(false)}/>
    </div>
  );
}
