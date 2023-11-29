import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import styled from 'styled-components';

interface PaginationProps {
  // 현재 페이지
  currentPage: number;

  // 한 페이지에 보여줄 아이템 갯수
  perPage: number;

  // 전체 페이지 수
  totalPages: number;

  // Pagination 보여질 최대 버튼 수
  count?: number;

  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  perPage,
  count = 10,
  onPageChange,
}: PaginationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(
    (page: number) => {
      const searchParams = new URLSearchParams(location.search);

      searchParams.set('page', page.toString());
      searchParams.set('perPage', perPage.toString());

      const newSearch = searchParams.toString();
      const url = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;

      onPageChange(page);
      navigate(url);
    },
    [navigate, location.pathname, location.search, onPageChange, perPage]
  );

  const renderPageButtons = () => {
    const buttons = [];

    // 시작 페이지, 마지막 페이지
    let startPage = Math.max(1, currentPage - Math.floor(count / 2));
    let endPage = Math.min(startPage + count - 1, totalPages);

    // 시작 페이지
    startPage = Math.max(1, endPage - count + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationItem
          key={i}
          $isActive={i === currentPage}
          onClick={() => handleClick(i)}
        >
          {i}
        </PaginationItem>
      );
    }

    return buttons;
  };

  return (
    <PaginationContainer>
      {currentPage > 1 && (
        <PaginationItem onClick={() => handleClick(currentPage - 1)}>
          <HiOutlineChevronLeft />
        </PaginationItem>
      )}

      {renderPageButtons()}

      {currentPage < totalPages && (
        <PaginationItem onClick={() => handleClick(currentPage + 1)}>
          <HiOutlineChevronRight />
        </PaginationItem>
      )}
    </PaginationContainer>
  );
}

const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin: 1.6rem 0;
`;

const PaginationItem = styled.li<{ $isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;

  background-color: ${({ $isActive }) => ($isActive ? '#3498db' : '#ddd')};
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#333')};
  cursor: pointer;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#3498db' : '#aaa')};
  }
`;
