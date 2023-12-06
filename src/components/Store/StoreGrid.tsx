import styled from 'styled-components';
import StoreCard from '@/components/Store/Card';
import { MEDIA_LIMIT, MEDIA_MAX_LIMIT } from '@/assets/styleVariable';
import { StoreType } from '@/types';

interface StoreGridProps {
  stores: StoreType[];
  max?: number;
}

// max : 전체화면 페이지는 4로, 절반만 쓰는 페이지는 3으로 해주세요
export default function StoreGrid({ stores, max = 4 }: StoreGridProps) {
  const maxper = `${100 / max}%`;
  return (
    <StyledStoreGrid $max={max} $maxper={maxper}>
      {stores.map((store) => {
        return <StoreCard store={store} key={store._id} />;
      })}
    </StyledStoreGrid>
  );
}

const StyledStoreGrid = styled.div<{
  $max: number;
  $maxper: string;
}>`
  gap: 1rem;
  box-sizing: border-box;
  display: grid;

  grid-template-columns: repeat(${({ $max }) => $max}, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));

  @media (max-width: ${MEDIA_MAX_LIMIT}) and (min-width: ${MEDIA_LIMIT}) {
    gap: 0.8rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    gap: 0.4rem;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 1fr);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
  }
`;
