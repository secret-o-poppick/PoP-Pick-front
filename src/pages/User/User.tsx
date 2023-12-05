import { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { MEDIA_LIMIT } from '@/assets/styleVariable';

import FilterButton from '@/components/FilterButton';
import Pagination from '@/components/Pagination';
import { useAuth } from '@/context/AuthContext';
import MyPageCard from '@/components/MyPageCard/Card';
import axios from 'axios';

import { StoreType } from '@/types';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import { useLocation } from 'react-router-dom';
import StoreGrid from '@/components/StoreGrid';
import StoreCard from '@/components/Store/Card';

interface optionsProp {
  value: string;
  label: string;
}
type SelectedType = 'bookmark' | 'like';

export default function User() {
  const [selected, setSelected] = useState<SelectedType>('bookmark');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const { user, accessToken } = useAuth();
  const [stores, setStores] = useState<StoreType[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const perPage = 6;
  const totalPages = Math.ceil(stores.length / perPage);

  const handlePageChange = (index: number) => {
    setCurrentPage(index);
  };

  const selectOptions = [
    {
      value: 'latetes',
      label: '최신 오픈 순',
    },
    {
      value: 'likes',
      label: '좋아요 순',
    },
    {
      value: 'views',
      label: '조회수 순',
    },
  ];

  const getBookmarks = useCallback(async () => {
    const response = await axios.get<StoreType[]>(
      `${REACT_APP_BACKEND_HOST}/api/users/bookmarks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  }, [accessToken]);

  const getLikees = useCallback(async () => {
    const response = await axios.get<StoreType[]>(
      `${REACT_APP_BACKEND_HOST}/api/users/likes`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookmarks();
        setStores(response);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, [getBookmarks]);

  const handleFilterButton = async (s: SelectedType) => {
    if (s === 'bookmark') {
      setSelected('bookmark');
      setCurrentPage(1);
      const response = await getBookmarks();
      setStores(response);
    } else if (s === 'like') {
      setSelected('like');
      setCurrentPage(1);
      const response = await getLikees();
      setStores(response);
    }
  };

  const handleFilter = (e: optionsProp | null) => {
    console.log(`${e?.label}으로 필터링 : value = ${e?.value}`);
  };

  return (
    <Container>
      <MyPageCard user={user} />
      <ListWrapper>
        <ListTopWrapper>
          <FilterButtonWrapper>
            <FilterButton
              onClick={() => handleFilterButton('bookmark')}
              color='notice'
              selected={selected === 'bookmark'}
            >
              북마크
            </FilterButton>
            <FilterButton
              onClick={() => handleFilterButton('like')}
              color='error'
              selected={selected === 'like'}
            >
              좋아요
            </FilterButton>
          </FilterButtonWrapper>

          <Select
            options={selectOptions}
            onChange={handleFilter}
            defaultValue={selectOptions[0]}
          />
        </ListTopWrapper>

        <StyledStoreGrid>
          {stores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </StyledStoreGrid>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={handlePageChange}
          size='md'
        />
      </ListWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 90px);
  gap: 2rem;

  @media (max-width: ${MEDIA_LIMIT}) {
    height: 100%;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: ${MEDIA_LIMIT}) {
    padding: 0;
    gap: 0.4rem;
  }
`;

const ListTopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: column;
    gap: 1rem;
    padding: 0.4rem 0.2rem;

    & > div {
      width: 100%;
      display: flex;
    }

    & > div:first-child {
      justify-content: flex-start;
    }

    & > div:last-child {
      justify-content: flex-end;
    }
  }
`;

const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledStoreGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  box-sizing: border-box;

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      padding: 0.4rem 0.2rem;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
