import { atom } from "recoil";

export const currentInvoicesState = atom({
    key:'customerInvoices',
    default: []
})