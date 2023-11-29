import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import styled from 'styled-components';
import AdminTitle from '@/components/AdminTitle';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';
import { data } from '@/data/user';

export default function AdminUsers() {
  const location = useLocation();
  const navigate = useNavigate();

  const [items] = useState(data);

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(page);

  // 한 페이지에 보여줄 아이템 갯수
  const perPage = 10;

  // 전체 페이지 수
  const totalPages = Math.ceil(items.length / perPage);

  // 현재 페이지에 표시할 데이터 범위 계산
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage - 1, items.length - 1);

  const handlePageChange = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <>
      <AdminTitle title='유저 관리' />
      <ButtonWrapper>
        <Button onClick={() => navigate('/admin/users/create')} color='primary'>
          유저등록
        </Button>
      </ButtonWrapper>
      <Table>
        <THead>
          <TableRow>
            <TableHeader>#</TableHeader>
            <TableHeader>이메일</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>SNS</TableHeader>
            <TableHeader>권한</TableHeader>
            <TableHeader>팝업스토어 갯수</TableHeader>
            <TableHeader>등록일</TableHeader>
            <TableHeader>권한신청</TableHeader>
            <TableHeader>수정</TableHeader>
            <TableHeader>삭제</TableHeader>
          </TableRow>
        </THead>
        <TBody>
          {items
            .filter((item, i) => i >= startIndex && i <= endIndex)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item._id}</TableCell>
                <TableCell>
                  <StyledLink to='/admin/users/1'>{item.email}</StyledLink>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sns}</TableCell>
                <TableCell>{item.auth}</TableCell>
                <TableCell>{item.popCount}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.businessNumberFlg ? '신청' : '-'}</TableCell>
                <TableCell>
                  <StyledMdOutlineModeEdit size={22} />
                </TableCell>
                <TableCell>
                  <StyledMdOutlineDeleteOutline size={22} />
                </TableCell>
              </TableRow>
            ))}
        </TBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const ButtonWrapper = styled.div`
  margin: 1rem 0;
  width: 140px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  text-align: center;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  background-color: #e4edff;
  font-weight: 700;
  padding: 1rem;

  &:nth-child(1) {
    width: 40px;
  }

  &:nth-child(2) {
  }

  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    width: 80px;
  }

  &:nth-child(6) {
    width: 120px;
  }

  &:nth-child(7),
  &:nth-child(8) {
    width: 80px;
  }

  &:nth-child(9),
  &:nth-child(10) {
    width: 40px;
  }
`;

const TableCell = styled.td`
  padding: 1rem;

  &:nth-child(3) {
  }
`;

const StyledMdOutlineModeEdit = styled(MdOutlineModeEdit)`
  cursor: pointer;
  color: #515357;
  &:hover {
    color: #1778f2;
  }
`;

const StyledMdOutlineDeleteOutline = styled(MdOutlineDeleteOutline)`
  cursor: pointer;
  color: #515357;
  &:hover {
    color: #eb5b42;
  }
`;
