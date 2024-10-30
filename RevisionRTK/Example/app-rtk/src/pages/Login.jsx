import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../features/auth';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, { isLoading, isError, error }] = useLoginMutation()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [id, setId] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: { id, message } } = await login({ email, password });
            console.log(id, message)
            if (id) {
                setIsLoggedIn(true)
                setId(id)
            }
        } catch (err) {
            console.error('Login failed!', err);
        }
    }

    if (isLoggedIn) {
        return  navigate('/pastries', { replace: true, state : { id } });
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit" disabled={isLoading}>Login</button>
                {isError && <div>Error: {error.message}</div>}
            </form>
        </div>
    );
};

export default Login;
