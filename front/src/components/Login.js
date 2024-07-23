import React, { useState, useEffect } from 'react';

export default function Login() {
    const [users, setUsers] = useState([]);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch users from the server
        fetch('http://127.0.0.1:5000/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                console.log('Users:', data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        // Check if the user exists
        const user = users.find(user => user.Username === userName && user.Password === password);
        if (user) {
            setLoggedIn(true);
            setLoginError('');
        } else {
            setLoggedIn(false);
            setLoginError('Invalid email or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {loggedIn ? (
                <p>Welcome, {userName}!</p>
            ) : (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="username"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </form>
            )}
        </div>
    );
}
