import { useState } from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import AdminTitle from '@/components/AdminTitle';
import AdminStoreTable from '@/components/AdminStoreTable';
import AdminStoreSearch from '@/components/AdminStoreSearch';
import { Store } from '@/types/index';
import Pagination from '@/components/Pagination';
import SelectBox from '@/components/SelectBox';
import { AUTH_ACTIVE_VALID_OPTIONS } from '@/assets/config';

export default function AdminStores() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fakeData, setFakeData] = useState<Store[]>(generateFakeData(35));

  // 목업데이터
  const [filteredData, setFilteredData] = useState<Store[]>(fakeData);

  const handleEdit = () => navigate('#');
  const handleDelete = () => navigate('#');

  // 활성화/비활성화 버튼
  const activeBtn = (index: number) => {
    const updatedData = [...fakeData];
    updatedData[index].active = !updatedData[index].active;
    setFakeData(updatedData);
  };

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(page);

  // 한 페이지에 보여줄 아이템 개수
  const perPage = 10;

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredData.length / perPage);

  // 현재 페이지에 표시할 데이터 범위 계산
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage - 1, filteredData.length - 1);

  const handlePageChange = (index: number) => {
    setCurrentPage(index);
  };


  const handleSearch = (text: string) => {
    const filtered = fakeData.filter(
      (store) =>
        store.author.toLowerCase().includes(text.toLowerCase()) ||
        store.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRegister = () => {
    navigate('/admin/stores/create')
  }

  function generateFakeData(count: number): Store[] {
    return Array.from({ length: count }, () => ({
      image: faker.image.url(),
      author: faker.person.fullName(),
      title: faker.lorem.words(),
      startAt: faker.date.recent(),
      endAt: faker.date.future().getTime(),
      createdAt: faker.date.past().getTime(),
      active: false,
    }));
  }

  return (
    <>
      {/* h2 타이틀 */}
      <AdminTitle title='팝업스토어 관리' />

      {/* 등록버튼 */}
      <AddBtn>
        <SelectBox options={AUTH_ACTIVE_VALID_OPTIONS} defaultValue='숨기기' />
        <Button color='primary' onClick={handleRegister}>
          등록
        </Button>
      </AddBtn>

      {/* 테이블 */}
      <AdminStoreTable
        data={filteredData.slice(startIndex, endIndex + 1)}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        activeBtn={activeBtn}
      />

      {/* 검색창 */}
      <AdminStoreSearch handleSearch={handleSearch} />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

const AddBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.2em;
  column-gap: 1em;
`;
