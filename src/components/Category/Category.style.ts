import styled from 'styled-components';
import {
  MdCheck,
  MdClear,
  MdOutlineModeEdit,
  MdOutlineDeleteOutline,
  MdOutlineAdd,
  MdOutlineHorizontalRule,
} from 'react-icons/md';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const StyledMdCheck = styled(MdCheck)`
  cursor: pointer;
  color: #515357;
  &:hover {
    color: #1778f2;
  }
`;

export const StyledMdOutlineModeEdit = styled(MdOutlineModeEdit)`
  cursor: pointer;
  color: #515357;
  &:hover {
    color: #1778f2;
  }
`;

export const StyledMdOutlineDeleteOutline = styled(MdOutlineDeleteOutline)`
  cursor: pointer;
  color: #515357;
  &:hover {
    color: #eb5b42;
  }
`;

export const StyledMdClear = styled(MdClear)`
  cursor: pointer;
  color: #515357;
  &:hover {
    color: #eb5b42;
  }
`;

export const StyledMdOutlineAdd = styled(MdOutlineAdd)`
  cursor: pointer;
`;

export const StyledMdOutlineHorizontalRule = styled(MdOutlineHorizontalRule)`
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 150px;
`;
