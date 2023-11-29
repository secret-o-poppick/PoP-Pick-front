import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminTitle from '@/components/AdminTitle';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import LabelText from '@/components/LabelText';

export default function AdminUserDetail() {
  const navigate = useNavigate();

  return (
    <>
      <AdminTitle title='유저 관리 (admin@admin.com)' />
      <Container>
        <LabelText label='이메일'>admin@admin.com</LabelText>
        <LabelText label='이름'>홍길동</LabelText>
        <LabelText label='SNS'>카카오</LabelText>
        <LabelText label='권한'>관리자</LabelText>
        <LabelText label='사업자등록번호'>111-11-11111</LabelText>
        <LabelText label='팝업스토어 갯수'>0</LabelText>
        <LabelText label='등록일'>2023-11-29</LabelText>
        <ButtonGroup>
          <Button
            color='primary'
            onClick={() => navigate('/admin/users/1/update')}
          >
            수정
          </Button>
          <Button color='error' onClick={() => navigate(-1)}>
            삭제
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
