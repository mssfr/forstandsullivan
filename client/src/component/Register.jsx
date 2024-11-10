import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { registerUser } from '../services/httpService';

function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleUserchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        console.log(user)
        e.preventDefault();
        let response
        try {
             response = await registerUser(user);
            setSuccess('Registration successful! You can now log in.');
            setError('');
            setUser({
                name: "",
                email: "",
                password: ""
            })
            console.log('User registered successfully:', response);
        } catch (error) {
            console.log('User registered faisls:', error);
            setError('Registration failed. Please try again.');
            setSuccess('');
        }
    };
    return (<>

        <div className=" d-flex justify-content-center align-items-center registaer">
            <div className="row w-100">
                <div className='col-md-12 col-12 justify-items-center' style={styles.container}>
                    <div class="wrapper">
                        <form autocomplete="off" onSubmit={handleSubmit}>
                            <h2>Register</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                            <div class="input-field">
                                <input type="text" name='name' autocomplete="off" value={user.name} onChange={(e) => handleUserchange(e)} required />
                                <label>Enter your Name</label>
                            </div>
                            <div class="input-field">
                                <input type="text" name='email'autocomplete="off" value={user.email} onChange={(e) => handleUserchange(e)} required />
                                <label>Enter your email</label>
                            </div>
                            <div class="input-field">
                                <input type="password" name='password' autocomplete="off" value={user.password} onChange={(e) => handleUserchange(e)} required />
                                <label>Enter your password</label>
                            </div>

                            <button type='submit'>Register</button>

                            <div class="register mt-3">
                                <p>Do you already have an account?<br />
                                    <Link to="/login" style={styles.button}>Login</Link></p>
                            </div>
                        </form></div>
                </div>

                <div className='col-md-6'>

                </div></div>
        </div>
    </>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
        justifyItems: "center",

    }

};


export default Register