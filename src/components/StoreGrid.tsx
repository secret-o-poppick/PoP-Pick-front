import styled, { css } from 'styled-components';
import StoreCard from './StoreCard';
import { MEDIA_LIMIT, MEDIA_MAX_LIMIT } from '@/assets/styleVariable';
import { StoreType } from '@/types';

// max : 전체화면 페이지는 4로, 절반만 쓰는 페이지는 3으로 해주세요
export default function StoreGrid({
  storeDatas,
  max,
}: {
  storeDatas: StoreType[];
  max: number;
}) {
  const maxper = `${100 / max}%`;

  return (
    <StyledStoreGrid $max={max} $maxper={maxper}>
      <div>
        {storeDatas.map((data, _id) => {
          return <StoreCard storeData={data} key={_id} />;
        })}
      </div>
    </StyledStoreGrid>
  );
}

const StyledStoreGrid = styled.div<{
  $max: number;
  $maxper: string;
}>`
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  & > div:first-child {
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-rows: 50%;
    ${({ $max, $maxper }) => css`
      grid-template-columns: repeat(${$max}, ${$maxper});
    `}
  }

  @media (max-width: ${MEDIA_MAX_LIMIT}) and (min-width: ${MEDIA_LIMIT}) {
    & > div:first-child {
      grid-template-columns: repeat(2, 50%);
      grid-auto-rows: 33%;
    }
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    margin: 0;
    padding: 0 1em;
    & > div:first-child {
      grid-template-columns: repeat(1, 100%);
      grid-auto-rows: 25%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
