import React, { useState } from 'react';
import { validatePassword } from '../../Utils/validation';
import { useNavigate } from 'react-router-dom';

// Styles
import './Login.scss';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [notValidPass, setNotValidPass] = useState(false)

    const onLogin = () => {
        const isPasswordValid = validatePassword(password)
        const EmailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!isPasswordValid) {
            setNotValidPass(true)
            window.alert("Please have 8 characters, 1 uppercase letter, 1 lowercase letter and 1 special character")
            setPassword("")
        } else {
            setNotValidPass(false)
        }

        if (!EmailRegx.test(email)) {
            window.alert("Invalid Email ID");
            setEmail("")
            return;
        }

        navigate('/dataset')
    }

    return (
        <div className='login-container'>
            <div className='login-box-container'>
                <h1>LOGIN</h1>

                <div className='login-input-container'>
                    <input
                        className='login-input'
                        type='text'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <input
                        className='login-input'
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='login-button' onClick={onLogin}>LOGIN</button>

                </div>

            </div>
        </div>
    );
}

export default Login;
