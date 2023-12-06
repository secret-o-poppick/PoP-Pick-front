import { useState } from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface CardIconProps {
  icon: IconType;
  count?: number;
  onClick?: () => Promise<number> | Promise<void>;
  color?: string;
  selected?: boolean;
  selectedIcon?: IconType;
}

export default function CardIcon({
  icon: Icon,
  count,
  onClick,
  color = '#FF5C40',
  selected = false,
  selectedIcon: SelectedIcon,
}: CardIconProps) {
  const [checked, setChecked] = useState(selected);
  const [data, setData] = useState(count ?? 0);

  const handleClick = async () => {
    if (!onClick) return;

    const response = await onClick();
    setChecked((prev) => !prev);
    if (response) {
      setData(response);
    }
  };

  return (
    <Container $color={color}>
      {checked && SelectedIcon ? (
        <SelectedIcon onClick={handleClick} fill={checked && color} />
      ) : (
        <Icon onClick={handleClick} />
      )}
      {count && <IconCount>{data}</IconCount>}
    </Container>
  );
}

const Container = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;

  & > svg:hover {
    cursor: pointer;
    color: ${({ $color }) => $color};
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: row;
  }
`;

const IconCount = styled.p`
  font-size: 12px;
`;
