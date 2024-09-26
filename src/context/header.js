import { createContext, useState } from "react";

const headerContext = createContext();

function HeaderProvider(props){
    const[header,setHeader] = useState('')
    return(
        <div>
            <headerContext.Provider value={{header,setHeader}}>
                {props.children}
            </headerContext.Provider>
        </div>
    )
}

export {headerContext,HeaderProvider}