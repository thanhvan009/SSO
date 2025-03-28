import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { mockLogin, mockBackend } from "./utils/mockAuthAPI";
import { mockIDP } from './utils/mockIDP'

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Verify with mock IDP
            const idpResponse = await mockIDP.verifyCredentials(username, password);
            if (idpResponse.verified) {

                // Send IDP token to backend
                const response = await mockBackend.validateIdPToken(idpResponse.idpToken);
                if (response.redirect) {
                    window.location.href = response.redirect;
                } else {
                    localStorage.setItem("token", response.token);
                    setIsAuthenticated(true);
                    navigate("/dashboard");
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: '100%', margin: '0.5rem 0', padding: '0.5rem' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', margin: '0.5rem 0', padding: '0.5rem' }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none'
                    }}
                >
                    {loading ? 'Authenticating...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;