import { createContext,useState } from "react";

export const DataContext = createContext({})

function DataProvider ({children}){

const [data,setData] = useState("")
const [user,setUser] = useState("")


return(

    <DataContext.Provider value={{data,setData,setUser,user}}>
        {children}
    </DataContext.Provider>
)

}
export default DataProvider