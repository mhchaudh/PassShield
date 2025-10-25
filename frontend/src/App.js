import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PasswordAnalyzer from './components/PasswordAnalyzer';
import ApiService from './services/api';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  padding: 0;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-bottom: 1px solid #333;
  padding: 40px 0;
  text-align: center;
  color: white;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, #00d4ff 0%, #5b73ff 100%);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #00d4ff 0%, #5b73ff 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #5b73ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin: 0;
  color: #a0a0a0;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const StatusIndicator = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  z-index: 1000;
  border: 1px solid;
  
  ${props => props.connected ? `
    background: #0f1419;
    color: #00ff88;
    border-color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
  ` : `
    background: #0f1419;
    color: #ff6b6b;
    border-color: #ff6b6b;
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.2);
  `}
`;



function App() {
  const [serverConnected, setServerConnected] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    checkServerHealth();
    const interval = setInterval(checkServerHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkServerHealth = async () => {
    try {
      const status = await ApiService.checkHealth();
      setServerConnected(true);
      setServerStatus(status);
    } catch (error) {
      setServerConnected(false);
      setServerStatus(null);
    }
  };

  return (
    <AppContainer>
      <StatusIndicator connected={serverConnected}>
        {serverConnected ? 'CONNECTED' : 'OFFLINE'}
      </StatusIndicator>

      <Header>
        <Logo>
          <LogoIcon>CX</LogoIcon>
          <Title>CipherX</Title>
        </Logo>
        <Subtitle>Advanced Password Security Analysis Platform</Subtitle>
      </Header>

      <ContentContainer>
        <PasswordAnalyzer />
      </ContentContainer>
    </AppContainer>
  );
}

export default App;