import { Link } from 'react-router-dom';
import { StoreType } from '@/types';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import styled from 'styled-components';
import CardImage from '@/components/Store/CardImage';
import CardItem from '@/components/Store/CardItem';
import CardTag from '@/components/Store/CardTag';

interface StoreCardProps {
  store: StoreType;
}

export default function StoreCard({ store }: StoreCardProps) {
  const { _id, title, startDate, endDate, categoryId, images, likes } = store;
  console.log(store);
  return (
    <Container>
      <CardLink to={`/stores/${_id}`}>
        <CardImage image={images[0].url} />
      </CardLink>
      <CardTagWrapper>
        <CardTag
          color={categoryId.name === '팝업' ? 'popup' : 'exhibit'}
          title={categoryId.name}
        />
        {store.adultVerification && <CardTag color='adult' title='성인' />}
      </CardTagWrapper>

      <CardItem
        _id={_id}
        title={title}
        startDate={startDate}
        endDate={endDate}
        likes={likes}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  gap: 0.4rem;

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: row;
  }
`;

const CardLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #000;
  position: relative;
  width: 100%;
  height: 300px;

  @media (max-width: ${MEDIA_LIMIT}) {
    width: auto;
    height: 100%;
  }
`;

const CardTagWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  top: 0.5rem;
  right: 0.5rem;

  @media (max-width: ${MEDIA_LIMIT}) {
    top: 0;
    right: 0;
  }
`;
