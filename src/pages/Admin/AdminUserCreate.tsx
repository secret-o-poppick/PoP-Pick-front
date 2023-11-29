import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminTitle from '@/components/AdminTitle';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import Input from '@/components/Input';
import SelectBox from '@/components/SelectBox';
import { AUTH_OPTIONS } from '@/assets/config';

export default function AdminUserCreate() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleAuthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('onChange', e.target.value);
  };

  return (
    <>
      <AdminTitle title='유저 등록' />
      <Container>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='이메일'
        />
        <Input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          label='이름'
        />
        <SelectBox
          options={AUTH_OPTIONS}
          onChange={handleAuthChange}
          defaultValue='관리자'
          label='권한'
          full
        />
        <ButtonGroup>
          <Button color='primary' onClick={() => navigate(-1)}>
            등록
          </Button>
          <Button color='error' onClick={() => navigate(-1)}>
            취소
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
