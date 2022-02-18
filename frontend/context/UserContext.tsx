
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
        (async function () {

            const u = localStorage.getItem("user");
            
            //u===null: first time visit
            //JSON.parse(u).username === '': user logged out

            if (u !== null && JSON.parse(u).username !== '') {
                try {
                    const loginCheck: boolean = await fetch('http://localhost:4000/api/auth/checklogin', {
                        method: 'POST',
                        body: JSON.stringify(JSON.stringify(JSON.parse(u).username))
                    }).then(res => res.json());

                    if (loginCheck) {
                        setUser(JSON.parse(u))
                    }
                } catch (e) {

                }
            }

        })();


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