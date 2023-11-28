import AdminTitle from '@/components/AdminTitle';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Input from '@/components/Input';
import Button from '@/components/Button';
import AdminStoreTable from '@/components/AdminStoreTable';
import { Store } from '@/types/index';

export default function AdminStores() {
  const navigate = useNavigate();
  const [fakeData, setFakeData] = useState<Store[]>([
    {
      image: faker.image.url(),
      author: faker.person.fullName(),
      title: faker.lorem.words(),
      startAt: faker.date.recent(),
      endAt: faker.date.future().getTime(),
      createdAt: faker.date.past().getTime(),
      active: false,
    },
    {
      image: faker.image.url(),
      author: faker.person.fullName(),
      title: faker.lorem.words(),
      startAt: faker.date.recent(),
      endAt: faker.date.future().getTime(),
      createdAt: faker.date.past().getTime(),
      active: false,
    },
  ]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<Store[]>(fakeData);

  const handleEdit = () => {
    navigate('#')
  }

  const handleDelete = () => {
    navigate('#')
  }

  const activeBtn = (index: number) => {
    const updatedData = [...fakeData];
    updatedData[index].active = !updatedData[index].active;
    setFakeData(updatedData);
  }


  const handleSearch = () => {
    const filtered = fakeData.filter(
      (store) =>
        store.author.toLowerCase().includes(searchText.toLowerCase()) ||
        store.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* h2 타이틀 */}
      <AdminTitle title='팝업스토어 관리' />

      {/* 등록버튼 */}
      <AddBtn>
        <Button color='primary' onClick={handleSearch}>
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
      <StyledSearch>
        <div>
          <Input
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <Button color='primary' onClick={handleSearch}>
          검색
        </Button>
      </StyledSearch>
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
`

const StyledSearch = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-top: 3em;

& Input {
  width:220px;
}

Button {
  width:80px;
  margin-left: 0.6em;
}
`

