import {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const UserContext = createContext();

export const Axios = axios.create({
    // baseURL: 'https://punditsoftech.com/php-auth-api/',
    baseURL: 'http://localhost/php-auth-api/',

});

export const UserContextProvider = ({children}) => {

    const [theUser, setUser] = useState(null);
    const [wait, setWait] = useState(false);

    const registerUser = async ({name,email,password,sex,address}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('register.php',{
                name,
                email,
                password,
                sex,
                address
            });
            setWait(false);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }

    const loginUser = async ({email,password}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('login.php',{
                email,
                password 
            });
            if(data.success && data.token){
                localStorage.setItem('loginToken', data.token);
                setWait(false);
                return {success:1};
            }
            setWait(false);
            return {success:0, message:data.message};
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }

    }

    const getAllUsers = async () =>{
        setWait(true);
        try{
            const {data} = await Axios.post('getAllusers.php',{});
            setWait(false);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }
    const getHashKeys = async (email) =>{
        setWait(true);
        try{
            const {data} = await Axios.post('getAllHashkey.php',{email:email});
            setWait(false);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }
    const getPayment = async (email) =>{
        setWait(true);
        try{
            const {data} = await Axios.post('getPayment.php',{email});
            setWait(false);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }

    const addHashkey = async (email,hashkey) => {
        setWait(true);
        try{
            const {data} = await Axios.post('addHashkey.php',{email:email,hashkey:hashkey});
            setWait(false);
            console.log("pp",data);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }

    const loggedInCheck = async () => {
        const loginToken = localStorage.getItem('loginToken');
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+loginToken;
        if(loginToken){
            const {data} = await Axios.get('getUser.php');
            if(data.success && data.user){
                setUser(data.user);
                return;
            }
            setUser(null);
        }
    }

    useEffect(() => {
        async function asyncCall(){
            await loggedInCheck();
        }
        asyncCall();
    },[]);

    const logout = () => {
        localStorage.removeItem('loginToken');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{registerUser,loginUser,getPayment,addHashkey,getHashKeys,wait, user:theUser,loggedInCheck,logout,getAllUsers}}>
            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;