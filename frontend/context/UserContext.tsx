
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
    username: string,
    email: string,
    profilePic: string
}
type UserContext = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export const emptyUser = {
    username: '',
    email: '',
    profilePic: ''
}

const userContext = createContext<UserContext>({} as UserContext);

const UserContextProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User>(emptyUser);

    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u === null) {
            setUser(emptyUser);
        } else {
            setUser(JSON.parse(u))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])




    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider;
export const useUserContext = () => useContext(userContext);