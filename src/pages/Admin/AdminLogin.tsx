import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '@/assets/logo.svg';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: 로그인 기능 구현
  const handleClick = () => {
    console.log('Login');

    navigate('/admin/users');
  };

  return (
    <Background>
      <Container>
        <Header>
          <StyledImage src={logoImg} alt='logo' />
          <H1>POP PICK</H1>
        </Header>
        <Body>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='이메일'
          />
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='비밀번호'
          />
        </Body>
        <Footer>
          <Button color='primary' onClick={handleClick} full>
            로그인
          </Button>
        </Footer>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #e4edff;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  max-width: 500px;
  margin: auto;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = styled.div`
  width: 100%;
`;

const H1 = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
`;
