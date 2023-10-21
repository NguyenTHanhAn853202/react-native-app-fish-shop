import {createContext,useReducer } from "react";

import { init, reducer } from "./reducer";

export const Context = createContext()

function ContextProvider({children}) {
    const [states,dispatch] = useReducer(reducer,init);
    return (<Context.Provider value={[states,dispatch]}>{children}</Context.Provider>);
}

export default ContextProvider;