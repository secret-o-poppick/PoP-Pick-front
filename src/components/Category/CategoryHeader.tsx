import styled from 'styled-components';
import { TableRow } from '@/components/Category/Category.style';

export default function CategoryHeader() {
  return (
    <TableRow>
      <TableHeader>#</TableHeader>
      <TableHeader>이름</TableHeader>
      <TableHeader>비고</TableHeader>
    </TableRow>
  );
}

const TableHeader = styled.th`
  background-color: #e4edff;
  font-weight: 700;
  padding: 1rem;

  &:nth-child(1) {
    width: 40px;
  }

  &:nth-child(2) {
    width: 200px;
    text-align: left;
  }

  &:nth-child(3) {
    text-align: left;
  }
`;
