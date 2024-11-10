import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/httpService';

function Login({onLogin}) {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleUserchange=(e)=>{
            setUser({...user,[e.target.name]:e.target.value})
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(user);
            setSuccess('Login successful! Redirecting...');
            onLogin(response.token);
            setError('');
            console.log('User logged in successfully:', response);

            localStorage.setItem('token', response.token);

            navigate('/dashboard');
        } catch (error) {
            setError(error.message || 'Login failed. Please check your credentials.');
            setSuccess('');
        }
    };

    return (<>
        <div className='d-flex flex-row login'>
            <div className='col-md-12' style={styles.container}>
                <div class="wrapper">
                <form autocomplete="off" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <div class="input-field">
                            <input type="text"  name='email' autocomplete="off" value={user.email} required onChange={(e)=>handleUserchange(e)} />
                            <label>Enter your email</label>
                        </div>
                        <div class="input-field">
                            <input type="password" name='password' autocomplete="off" value={user.password} onChange={(e)=>handleUserchange(e)}   required />
                            <label>Enter your password</label>
                        </div>

                        <button type="submit">Log In</button>
                        <div class="register mt-3">
                            <p>Don't have an account?<br />
                                <Link to="/register" style={styles.button}>Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
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


export default Login