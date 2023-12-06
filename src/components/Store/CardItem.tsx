import styled from 'styled-components';
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { formatDate } from '@/utils';
import CardIcon from '@/components/Store/CardIcon';
import { CardItemProps } from '@/types'

export default function CardItem({
  title,
  startDate,
  endDate,
  likes,
}: CardItemProps) {
  return (
    <Container>
      <h3>{title}</h3>
      <p>
        {formatDate(startDate)} - {formatDate(endDate)}
      </p>
      <p>주소</p>
      <CardIconWrapper>
        <CardIcon icon={FaRegHeart} count={likes} />
        <CardIcon icon={FaRegBookmark} />
      </CardIconWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }

  & > p {
    color: #737373;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    flex: 1;
    margin-top: 1.8rem;

    & > h3 {
      font-size: 0.9rem;
    }

    & > p {
      font-size: 0.8rem;
    }
  }
`;

const CardIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
`;
