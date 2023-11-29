import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminTitle from '@/components/AdminTitle';
import Input from '@/components/Input';
import LabelText from '@/components/LabelText';
import ButtonGroup from '@/components/ButtonGroup';
import Button from '@/components/Button';

export default function AdminUserUpdate() {
  const navigate = useNavigate();

  const [businessNumber, setBusinessNumber] = useState('');
  const [, setAuth] = useState('');

  return (
    <>
      <AdminTitle title='유저 정보 수정 (admin@admin.com)' />
      <Container>
        <LabelText label='이메일'>admin@admin.com</LabelText>
        <LabelText label='이름'>홍길동</LabelText>
        <LabelText label='SNS'>카카오</LabelText>
        <Input
          type='text'
          value='셀렉트 박스로 바꾸기'
          onChange={(e) => setAuth(e.target.value)}
          label='권한'
        />
        <Input
          type='text'
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value)}
          label='사업자등록번호'
        />
        <ButtonGroup>
          <Button color='primary' onClick={() => navigate(-1)}>
            수정
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
