import React, {createContext, useState} from "react";

const UserContext = createContext();

export function UserContextProvider ({children}) {
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
    const [userGames, setUserGames] = useState([]);

    return (
        <UserContext.Provider value={{userInfo: { userEmail, setUserEmail, 
                                                 email, setEmail, 
                                                login, setLogin,
                                                userGames, setUserGames }}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;