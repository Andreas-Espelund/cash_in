import { atom } from "recoil";


const defaultValues = {
    name: 'a',
    orgNr: 'b',
    streetAdress: 'c',
    zipLocation: 'd',
    email: 'e',
    contactName: 'f',
    accountNumber: 'g',
    currentInvoice: 0
}

export const UserState = atom({
    key: 'userSettings',
    default: defaultValues
})
