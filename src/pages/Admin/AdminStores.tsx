import React, { useState } from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import AdminTitle from '@/components/AdminTitle';
import AdminStoreTable from '@/components/AdminStoreTable';
import AdminStoreSearch from '@/components/AdminStoreSearch';
import { Store } from '@/types/index';

export default function AdminStores() {
  const navigate = useNavigate();
  const [fakeData, setFakeData] = useState<Store[]>(generateFakeData(2));
  const [filteredData, setFilteredData] = useState<Store[]>(fakeData);

  const handleEdit = () => navigate('#');
  const handleDelete = () => navigate('#');
  const activeBtn = (index: number) => {
    const updatedData = [...fakeData];
    updatedData[index].active = !updatedData[index].active;
    setFakeData(updatedData);
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
        <Button color='primary' onClick={handleRegister}>
          등록
        </Button>
      </AddBtn>

      {/* 테이블 */}
      <AdminStoreTable
        data={filteredData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        activeBtn={activeBtn}
      />

      {/* 검색창 */}
      <AdminStoreSearch handleSearch={handleSearch} />

      {/* 페이지네이션 */}
    </>
  );
}

const AddBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.2em;

  Button {
    width: 80px;
  }
`;
