import { useState } from 'react';
import styled from 'styled-components';
import LocationCategoryBody from '@/components/Category/LocationCategoryBody';
import {
  ButtonWrapper,
  StyledMdOutlineAdd,
  StyledMdOutlineDeleteOutline,
  StyledMdOutlineHorizontalRule,
  StyledMdOutlineModeEdit,
  TableRow,
} from '@/components/Category/Category.style';

interface CategoryTableRowProps {
  item: any;
}

export default function LocationCategoryTableRow({
  item,
}: CategoryTableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <TableRow>
        {[1, 2, 99].map((i) => (
          <TableCell key={i}>
            {i === item.depth && (
              <>
                {isExpanded ? (
                  <StyledMdOutlineHorizontalRule
                    size={18}
                    onClick={toggleAccordion}
                  />
                ) : (
                  <StyledMdOutlineAdd size={18} onClick={toggleAccordion} />
                )}
              </>
            )}
          </TableCell>
        ))}

        <TableCell $depth={item.depth}>
          <p>{item?.name}</p>
        </TableCell>
        <TableCell>
          <ButtonWrapper>
            <StyledMdOutlineModeEdit size={22} />
            <StyledMdOutlineDeleteOutline size={22} />
          </ButtonWrapper>
        </TableCell>
      </TableRow>
      {isExpanded && <LocationCategoryBody items={item.items ?? []} />}
    </>
  );
}

const TableCell = styled.td<{ $depth?: number }>`
  padding: 0.8rem 1rem;
  text-align: center;

  &:nth-child(4) {
    width: 200px;
    text-align: left;
    & > p {
      display: inline-block;
      padding-left: ${({ $depth }) => `${(($depth ?? 0) - 1) * 20}px`};
    }
  }
`;
