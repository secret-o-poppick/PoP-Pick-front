import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminTitle from '@/components/AdminTitle';
import Input from '@/components/Input';
import LabelText from '@/components/LabelText';
import ButtonGroup from '@/components/ButtonGroup';
import Button from '@/components/Button';
import SelectBox from '@/components/SelectBox';
import { AUTH_OPTIONS } from '@/assets/config';

export default function AdminUserUpdate() {
  const navigate = useNavigate();

  const [businessNumber, setBusinessNumber] = useState('');

  const handleAuthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('onChange', e.target.value);
  };

  return (
    <>
      <AdminTitle title='유저 정보 수정 (admin@admin.com)' />
      <Container>
        <LabelText label='이메일'>admin@admin.com</LabelText>
        <LabelText label='이름'>홍길동</LabelText>
        <LabelText label='SNS'>카카오</LabelText>
        <SelectBox
          options={AUTH_OPTIONS}
          onChange={handleAuthChange}
          defaultValue='관리자'
          label='권한'
          full
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
