import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ApiService from '../services/api';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 107, 107, 0.5); }
`;

const AnalyzerContainer = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  border: 1px solid #333;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
`;

const Title = styled.h2`
  color: #ffffff;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #5b73ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  margin-bottom: 32px;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 20px 60px 20px 20px;
  border: 2px solid #333;
  border-radius: 12px;
  font-size: 18px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  transition: all 0.3s ease;
  background: #0f1419;
  color: #ffffff;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.1);
    background: #1a1a2e;
  }

  &::placeholder {
    color: #666;
    font-weight: 400;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: #0f1419;
  border: 1px solid #333;
  color: #666;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;

  &:hover {
    color: #00d4ff;
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const StrengthMeter = styled.div`
  width: 100%;
  height: 12px;
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  position: relative;
`;

const StrengthBar = styled.div`
  height: 100%;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.percentage}%;
  background: ${props => {
    if (props.percentage < 20) return 'linear-gradient(90deg, #ff6b6b 0%, #ee5a52 100%)';
    if (props.percentage < 40) return 'linear-gradient(90deg, #ffa502 0%, #ff8c00 100%)';
    if (props.percentage < 60) return 'linear-gradient(90deg, #f0c14b 0%, #e67e22 100%)';
    if (props.percentage < 80) return 'linear-gradient(90deg, #26de81 0%, #20bf6b 100%)';
    return 'linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #5b73ff 100%)';
  }};
  position: relative;
`;

const StrengthLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const StrengthText = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: ${props => {
    if (props.strength === 'Very Weak') return '#ff6b6b';
    if (props.strength === 'Weak') return '#ffa502';
    if (props.strength === 'Medium') return '#f0c14b';
    if (props.strength === 'Strong') return '#26de81';
    return '#00ff88';
  }};
  display: flex;
  align-items: center;
  gap: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ScoreText = styled.span`
  color: #a0a0a0;
  font-size: 18px;
  font-weight: 600;
  background: #0f1419;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #333;
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const AnalysisCard = styled.div`
  background: linear-gradient(135deg, #0f1419 0%, #1a1a2e 100%);
  padding: 28px;
  border-radius: 12px;
  border: 1px solid #333;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: #00d4ff;
  }
`;

const CardTitle = styled.h4`
  margin: 0 0 16px 0;
  color: #a0a0a0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardValue = styled.div`
  color: ${props => props.color || '#ffffff'};
  font-size: 24px;
  font-weight: 700;
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
  padding: 24px;
  border-radius: 12px;
  background: #0f1419;
  border: 1px solid #333;
`;

const CharacterCheck = styled.div`
  text-align: center;
  padding: 16px 12px;
  border-radius: 8px;
  background: ${props => props.hasType ? '#1a2e1a' : '#2e1a1a'};
  border: 1px solid ${props => props.hasType ? '#00ff88' : '#ff6b6b'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CharacterLabel = styled.div`
  font-size: 12px;
  color: #a0a0a0;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const CharacterIcon = styled.div`
  font-size: 20px;
  color: ${props => props.hasType ? '#00ff88' : '#ff6b6b'};
  font-weight: bold;
`;

const CrackTimeSection = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.h3`
  color: #ffffff;
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CrackTimeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  
  & > * {
    flex: 1 1 300px;
    max-width: 350px;
  }
`;

const CrackTimeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #0f1419;
  border-radius: 8px;
  border: 1px solid #333;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    border-color: #00d4ff;
  }
`;

const AttackType = styled.span`
  font-weight: 600;
  color: #ffffff;
  text-transform: capitalize;
  font-size: 16px;
`;

const TimeEstimate = styled.span`
  color: #a0a0a0;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-weight: 600;
  font-size: 14px;
  background: #1a1a2e;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #333;
`;

const WarningBadge = styled.span`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: ${pulse} 2s infinite;
`;

const PasswordAnalyzer = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (password.trim()) {
      analyzePassword();
    } else {
      setAnalysis(null);
    }
  }, [password]);

  const analyzePassword = async () => {
    if (!password.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await ApiService.analyzePassword(password);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatAttackType = (type) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <AnalyzerContainer>
      <Title>Security Analysis Engine</Title>
      
      <PasswordInputContainer>
        <PasswordInput
          type={showPassword ? "text" : "password"}
          placeholder="Enter password for security analysis..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ToggleButton 
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? 'HIDE' : 'SHOW'}
        </ToggleButton>
      </PasswordInputContainer>

      {error && (
        <div style={{ 
          color: '#ff6b6b', 
          marginBottom: '24px', 
          padding: '16px 20px', 
          background: '#2e1a1a', 
          borderRadius: '8px',
          border: '1px solid #ff6b6b',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          ERROR: {error}
        </div>
      )}

      {isAnalyzing && (
        <div style={{ 
          color: '#00d4ff', 
          marginBottom: '24px', 
          textAlign: 'center',
          padding: '16px',
          background: '#0f1419',
          borderRadius: '8px',
          border: '1px solid #00d4ff',
          fontWeight: '600'
        }}>
          ANALYZING PASSWORD SECURITY...
        </div>
      )}

      {analysis && (
        <>
          <StrengthMeter>
            <StrengthBar percentage={analysis.strength_score} />
          </StrengthMeter>

          <StrengthLabel>
            <StrengthText strength={analysis.strength_level}>
              {analysis.strength_level}
              {analysis.is_common && <WarningBadge>COMMON</WarningBadge>}
            </StrengthText>
            <ScoreText>{analysis.strength_score}/100</ScoreText>
          </StrengthLabel>

          <AnalysisGrid>
            <AnalysisCard>
              <CardTitle>Length</CardTitle>
              <CardValue>{analysis.length} characters</CardValue>
            </AnalysisCard>

            <AnalysisCard>
              <CardTitle>Entropy</CardTitle>
              <CardValue>{analysis.entropy.toFixed(1)} bits</CardValue>
            </AnalysisCard>

            <AnalysisCard>
              <CardTitle>Character Set</CardTitle>
              <CardValue>{analysis.character_set_size} characters</CardValue>
            </AnalysisCard>

            <AnalysisCard>
              <CardTitle>Common Password</CardTitle>
              <CardValue color={analysis.is_common ? '#ff6b6b' : '#00ff88'}>
                {analysis.is_common ? 'Yes' : 'No'}
              </CardValue>
            </AnalysisCard>
          </AnalysisGrid>

          <CharacterGrid>
            <CharacterCheck hasType={analysis.has_lowercase}>
              <CharacterLabel>Lowercase</CharacterLabel>
              <CharacterIcon hasType={analysis.has_lowercase}>
                {analysis.has_lowercase ? '✓' : '✗'}
              </CharacterIcon>
            </CharacterCheck>
            <CharacterCheck hasType={analysis.has_uppercase}>
              <CharacterLabel>Uppercase</CharacterLabel>
              <CharacterIcon hasType={analysis.has_uppercase}>
                {analysis.has_uppercase ? '✓' : '✗'}
              </CharacterIcon>
            </CharacterCheck>
            <CharacterCheck hasType={analysis.has_digits}>
              <CharacterLabel>Numbers</CharacterLabel>
              <CharacterIcon hasType={analysis.has_digits}>
                {analysis.has_digits ? '✓' : '✗'}
              </CharacterIcon>
            </CharacterCheck>
            <CharacterCheck hasType={analysis.has_special}>
              <CharacterLabel>Special</CharacterLabel>
              <CharacterIcon hasType={analysis.has_special}>
                {analysis.has_special ? '✓' : '✗'}
              </CharacterIcon>
            </CharacterCheck>
          </CharacterGrid>

          {analysis.crack_time_estimates && (
            <CrackTimeSection>
              <SectionTitle>Time to Crack Estimates</SectionTitle>
              <CrackTimeGrid>
                {Object.entries(analysis.crack_time_estimates).map(([attackType, timeEstimate]) => (
                  <CrackTimeItem key={attackType}>
                    <AttackType>{formatAttackType(attackType)}</AttackType>
                    <TimeEstimate>{timeEstimate}</TimeEstimate>
                  </CrackTimeItem>
                ))}
              </CrackTimeGrid>
            </CrackTimeSection>
          )}
        </>
      )}
    </AnalyzerContainer>
  );
};

export default PasswordAnalyzer;