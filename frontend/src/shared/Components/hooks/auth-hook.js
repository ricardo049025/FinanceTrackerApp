import {useState, useEffect,useCallback} from "react";

let logoutTimer;
export const useAuth = () => {
    const [token, setToken] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState();
    const [name, setName] = useState();

    //login and timer expiration of the cookie token 1 hour
    const login = useCallback((uid,token,name,expirationDate) => {
        setToken(token);
        setUserId(uid);
        setName(name);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // time to expiration date
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem("userData",JSON.stringify({userId: uid, name: name, token: token, expiration: tokenExpirationDate.toISOString()}));
        
    },[]);

    //logout
    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        setName(null);
        localStorage.removeItem("userData");
    },[]);

    //autologin each 1 hour
    useEffect(() =>{
        if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout,remainingTime);
        }else{
        clearTimeout(logoutTimer);
        }
    },[token,logout,tokenExpirationDate]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if(userData && userData.token && new Date(userData.expiration) > new Date())
            login(userData.userId,userData.token,new Date(userData.expiration) );

    },[login]);

    return {token, login, logout, userId, name};
}