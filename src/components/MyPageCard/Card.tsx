import styled from 'styled-components';

import { MEDIA_LIMIT } from '@/assets/styleVariable';
import CardImage from '@/components/MyPageCard/CardImage';
import CardUserInfo from '@/components/MyPageCard/CardUserInfo';
import CardUserInfoText from '@/components/MyPageCard/CardUserInfoText';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types';

interface MyPageCardProps {
  user: User | null;
}

export default function MyPageCard({ user }: MyPageCardProps) {
  const { withdrawal } = useAuth();

  if (!user) {
    return <div>Not Found</div>;
  }

  const bottomLeftButton = () => {
    if (user.role === '일반') {
      return <Button>+사업자 등록</Button>;
    }
    return <Button>+이벤트 새로 등록하기</Button>;
  };

  return (
    <Container>
      <CardWrapper>
        <CardImage image={user.image} />
        <CardUserInfo>
          <CardUserInfoText>{user.name}</CardUserInfoText>
          <CardUserInfoText>{user.role}</CardUserInfoText>
        </CardUserInfo>
      </CardWrapper>

      <ButtonWrapper>
        {bottomLeftButton()}
        <Button onClick={withdrawal}>탈퇴하기</Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px lightgray;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto 0;
  padding: 2rem 6rem;

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: row;
    padding: 0.8rem 16px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding: 10px;
  box-sizing: border-box;
`;

const Button = styled.div`
  border-radius: 10000px;
  padding: 5px 10px;
  font-size: 10px;

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;
