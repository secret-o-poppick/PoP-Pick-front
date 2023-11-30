import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Store } from '@/types/index';

interface AdminStoreTableProps {
  data: Store[];
  handleEdit: () => void;
  handleDelete: () => void;
  activeBtn: (index: number) => void;
}

const AdminStoreTable: React.FC<AdminStoreTableProps> = ({ data, handleEdit, handleDelete, activeBtn }) => {
  return (
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
        {data.length === 0 ? (
          <tr>
            <td id='alertText' colSpan={9}>일치하는 정보가 없습니다.</td>
          </tr>
        ) : (
          data.map((store, index) => (
            <tr key={index}>
              <td><StyledLink to='/admin/stores/1'><img src={store.image} width='120px' alt={store.title} /></StyledLink></td>
              <td><StyledLink to='/admin/stores/1'>{store.author}</StyledLink></td>
              <td><StyledLink to='/admin/stores/1'>{store.title}</StyledLink></td>
              <td>{new Date(store.startAt).toLocaleTimeString()}</td>
              <td>{new Date(store.endAt).toLocaleTimeString()}</td>
              <td>{new Date(store.createdAt).toLocaleTimeString()}</td>
              <td><button className='btns' onClick={handleEdit}>수정하기</button></td>
              <td><button className='btns' onClick={handleDelete}>삭제하기</button></td>
              <td>
                <button className='btns' onClick={() => activeBtn(index)}>
                  {store.active
                    ? '게시물 숨기기 해제'
                    : '게시물 숨기기'}
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
}
const StyledTable = styled.table`
width:100%;
text-align: center;
font-size: 0.9em;

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

.btns{
  background-color: transparent;
  border:none;
  text-decoration: underline;
  cursor: pointer;
}
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    font-weight: bold;
  }
`
export default AdminStoreTable;