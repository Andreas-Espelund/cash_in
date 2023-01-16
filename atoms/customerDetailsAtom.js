import { selector } from "recoil";

const customerByOrgNrState = selector({
    key:'customers',
    get: ({get}) => {
        const all = get(CustomersState)
        
        return all.filter(e)
    
    }

})