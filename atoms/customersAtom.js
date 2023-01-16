import { atom } from "recoil";

const defaultValues = []


export const CustomersState = atom({
    key: 'customers',
    default: defaultValues
})
