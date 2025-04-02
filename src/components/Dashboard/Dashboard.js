import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockFetchData } from '../../utils/mockAuthAPI';
import styled from '@emotion/styled';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
`;

const LogoutButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-1px);
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 1.1rem;
`;

const CardStatus = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: ${props => 
    props.status === 'active' ? '#2ecc71' : 
    props.status === 'pending' ? '#f39c12' : 
    '#95a5a6'};
  color: white;
`;

const CardBody = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const CardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #34495e;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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

    if (isLoading) return (
        <LoadingContainer>
            <Spinner />
            <p>Loading dashboard data...</p>
        </LoadingContainer>
    );

    if (error) return (
        <Container>
            <div style={{ color: '#e74c3c', textAlign: 'center', padding: '2rem' }}>
                <h3>Error Loading Dashboard</h3>
                <p>{error}</p>
                <LogoutButton onClick={handleLogout}>Return to Login</LogoutButton>
            </div>
        </Container>
    );

    return (
        <Container>
            <Header>
                <Title>Dashboard Overview</Title>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </Header>

            <CardsContainer>
                {data.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardStatus status={item.status}>{item.status}</CardStatus>
                        </CardHeader>
                        <CardBody>
                            <CardDetail>
                                <DetailLabel>Created:</DetailLabel>
                                <span>{item.dueDate}</span>
                            </CardDetail>
                            <CardDetail>
                                <DetailLabel>Owner:</DetailLabel>
                                <span>{item.assignedTo}</span>
                            </CardDetail>
                            <CardDetail>
                                <DetailLabel>Progress:</DetailLabel>
                                <span>{item.progress}%</span>
                            </CardDetail>
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{
                                    height: '6px',
                                    background: '#ecf0f1',
                                    borderRadius: '3px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${item.progress}%`,
                                        height: '100%',
                                        background: item.status === 'active' ? '#2ecc71' : 
                                                   item.status === 'pending' ? '#f39c12' : '#3498db'
                                    }}></div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </CardsContainer>
        </Container>
    );
};

export default Dashboard;