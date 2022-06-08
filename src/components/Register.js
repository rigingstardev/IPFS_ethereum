import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext';
import "../styles/register.css";

const Register = () => {
    const {registerUser, wait} = useContext(UserContext);
    const [errMsg, setErrMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        sex:'',
        address:''
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setSuccessMsg(false);
            setErrMsg('Please Fill in all Required Fields!');
            return;
        }

        const data = await registerUser(formData);
        if(data.success){
            e.target.reset();
            setSuccessMsg('You have successfully registered.');
            setErrMsg(false);
        }
        else if(!data.success && data.message){
            setSuccessMsg(false);
            setErrMsg(data.message);
        }
        
    }

    return (
        <div className="rcontainer">
            <h2>Sign Up</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" onChange={onChangeInput} placeholder="Your name" id="name" value={formData.name} required />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={onChangeInput} placeholder="Your email" id="email" value={formData.email} required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={onChangeInput} placeholder="New password" id="password" value={formData.password} required />
                <label htmlFor="sex">Sex</label>
                <input type="text" name="sex" onChange={onChangeInput} placeholder="Your Sex" id="sex" value={formData.sex} required />
                <label htmlFor="address">Address</label>
                <input type="text" name="address" onChange={onChangeInput} placeholder="Your Address" id="address" value={formData.address} required />
                {successMsg && <div className="success-msg">{successMsg}</div>}
                {errMsg && <div className="err-msg">{errMsg}</div>}
                <button type="submit" disabled={wait}>Sign Up</button>
                <div className="bottom-link"><Link to="/login">Login</Link></div>
            </form>
        </div>
    )
}

export default Register;
