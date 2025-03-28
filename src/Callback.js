
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            navigate("/dashboard");
        }
    }, [setIsAuthenticated, navigate]);

    return <div style={{ padding: '20px' }}>Processing authentication...</div>;
};

export default Callback;