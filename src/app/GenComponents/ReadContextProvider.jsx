"use client"

import { useEffect, useState } from "react"
import {ReadContext} from "./ReadContext"
import { saveToStorage } from "@/Cookiesmv"

export default function ReadContextProvider({children}){
     const [userData, setuserData] = useState(null)
    const [AnlysedCV, setAnlysedCV] = useState(null)
    
    useEffect(() => {
        if (AnlysedCV) {
            saveToStorage('userData', AnlysedCV, 7);
        }
    }, [AnlysedCV])

    return(
        <ReadContext.Provider value={{userData,setuserData,AnlysedCV,setAnlysedCV}}>
            {children}
        </ReadContext.Provider>
    )
}

