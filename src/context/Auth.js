import { createContext,useState } from "react";

export const DataContext = createContext({})

function DataProvider ({children}){

const [data,setData] = useState("")
const [user,setUser] = useState("")
const [token, setToken] = useState("")
const [cartArray, setCart] = useState([])


return(

    <DataContext.Provider value={{cartArray, setCart, setUser, user, token, setToken}}>
        {children}
    </DataContext.Provider>
)

}
export default DataProvider