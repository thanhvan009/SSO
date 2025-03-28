import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { mockFetchData } from "./utils/mockDataAPI";

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await mockFetchData(token);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (isLoading) return <div style={{ padding: '20px' }}>Loading data...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', position: 'relative' }}>
            <button
                onClick={handleLogout}
                style={{
                    padding: '8px 16px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                }}
            >
                Logout
            </button>
            <h2>Dashboard</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {data.map((item) => (
                    <li key={item.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;