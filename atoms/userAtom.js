import { atom } from "recoil";

const defaultValues = {
    name: '',
    orgNr: '',
    streetAdress: '',
    zipLocation: '',
    email: '',
    contactName: '',
    accountNumber: '',
    currentInvoice: 0
}


export const UserState = atom({
    key: 'userSettings',
    default: defaultValues
})
