import AdminTitle from '@/components/AdminTitle';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Input from '@/components/Input';
import Button from '@/components/Button';

export type Store = {
  image: string
  author: string
  title: string
  startAt: number | Date
  endAt: number | Date
  createdAt: number
  active: boolean
  subRows?: Store[]
}

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
      <StyledTable>
        <thead>
          <tr>
            <th>사진</th>
            <th>작성자(계정)</th>
            <th>제목</th>
            <th>시작일시</th>
            <th>종료일시</th>
            <th>작성일시</th>
            <th>게시물 수정</th>
            <th>게시물 삭제</th>
            <th>게시물 숨기기</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td id='alertText' colSpan={9}>일치하는 정보가 없습니다.</td>
            </tr>
          ) : (
            filteredData.map((store, index) => (
              <tr key={index}>
                <td><img src={store.image} width='120px' alt={store.title} /></td>
                <td>{store.author}</td>
                <td>{store.title}</td>
                <td>{new Date(store.startAt).toLocaleTimeString()}</td>
                <td>{new Date(store.endAt).toLocaleTimeString()}</td>
                <td>{new Date(store.createdAt).toLocaleTimeString()}</td>
                <td><button id='editBtn' onClick={handleEdit}>수정하기</button></td>
                <td><button id='deleteBtn' onClick={handleDelete}>삭제하기</button></td>
                <td>
                  <button id='activeBtn' onClick={() => activeBtn(index)}>
                    {store.active
                      ? '게시물 숨기기'
                      : '게시물 숨기기 해제'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>

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

const StyledTable = styled.table`
width:100%;
text-align: center;
font-size: 0.75em;

& thead {
  border-bottom:1px solid #888;
}

& th {
  padding: 1rem;
  vertical-align: middle;
}

& th:first-child{
  width:120px;
}
& th:nth-child(2){
  width:180px;
}
& th:nth-child(4){
  width:70px;
}
& th:nth-child(5){
  width:70px;
}
& th:nth-child(6){
  width:70px;
}
& th:nth-child(7){
  width:80px;
}
& th:nth-child(8){
  width:80px;
}
& th:last-child{
  width:140px;
}
& td{
  padding: 0.5rem 1rem;
  vertical-align: middle;
  border-bottom:1px solid #eee;
  word-break: keep-all;
}

#alertText{
  height:140px;
}

#editBtn, #deleteBtn, #activeBtn{
  background-color: transparent;
  border:none;
  text-decoration: underline;
  cursor: pointer;
}
`
