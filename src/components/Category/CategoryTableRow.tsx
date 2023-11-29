import { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import {
  ButtonWrapper,
  StyledMdCheck,
  StyledMdClear,
  StyledMdOutlineDeleteOutline,
  StyledMdOutlineModeEdit,
  TableRow,
} from '@/components/Category/Category.style';

interface CategoryTableRowProps {
  item?: any;
  onAddClick: (value: string) => void;
  onToggleClick: (id: number) => void;
  onUpdateClick: (id: number, value: string) => void;
  onDeleteClick: (id: number) => void;
}

export default function CategoryTableRow({
  item,
  onAddClick,
  onToggleClick,
  onUpdateClick,
  onDeleteClick,
}: CategoryTableRowProps) {
  const [value, setValue] = useState<string>(item ? item.name : '');

  const handleToggleItem = () => {
    if (!onToggleClick) return;

    onToggleClick(item._id);
    setValue(item ? item.name : '');
  };

  const handleAddItem = () => {
    if (!onAddClick) return;

    onAddClick(value);
    setValue('');
  };

  const handleUpdateItem = () => {
    if (!onUpdateClick) return;
    onUpdateClick(item._id, value);
  };

  const handleDeleteItem = () => {
    if (!onDeleteClick) return;
    onDeleteClick(item._id);
  };

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>
        {item && !item.onEdit ? (
          item?.name
        ) : (
          <Input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
      </TableCell>
      <TableCell>
        <ButtonWrapper>
          {item && item.onEdit ? (
            <>
              <StyledMdCheck size={22} onClick={handleUpdateItem} />
              <StyledMdClear size={22} onClick={handleToggleItem} />
            </>
          ) : item && !item.onEdit ? (
            <>
              <StyledMdOutlineModeEdit size={22} onClick={handleToggleItem} />
              <StyledMdOutlineDeleteOutline
                size={22}
                onClick={handleDeleteItem}
              />
            </>
          ) : (
            <>
              <StyledMdCheck size={22} onClick={handleAddItem} />
            </>
          )}
        </ButtonWrapper>
      </TableCell>
    </TableRow>
  );
}

const TableCell = styled.td`
  padding: 1rem;

  &:nth-child(3) {
    display: flex;
    gap: 2rem;
    text-align: left;
  }
`;
