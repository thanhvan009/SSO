import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
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

const Callback = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    const processAuth = async () => {
      if (token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        
        // Show processing state for 3 seconds before navigating
        await new Promise(resolve => setTimeout(resolve, 3000));
        navigate('/dashboard');
      }
    };

    processAuth();
  }, [setIsAuthenticated, navigate]);

  return (
    <Container>
      <Message>Processing authentication...</Message>
      <Spinner />
    </Container>
  );
};

export default Callback;