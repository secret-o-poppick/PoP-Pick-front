import styled from 'styled-components';
import { FILTER_BUTTON_STYLE } from '@/assets/styleVariable';
import { PopPickStyleType } from '@/utils/index';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: PopPickStyleType;
  children: string;
  onClick?: () => void;
}

export default function FilterButton({
  type = 'button',
  color = 'default',
  children,
  onClick,
}: ButtonProps) {
  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <StyledFilterButton type={type} color={color} onClick={handleClick}>
      {children}
    </StyledFilterButton>
  );
}

const StyledFilterButton = styled.button<{ color: PopPickStyleType }>`
  padding: 0.3rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 40px;
  margin-right: 12px;
  border: ${({ color }) => FILTER_BUTTON_STYLE[color].border};

  background-color: ${({ color }) =>
    FILTER_BUTTON_STYLE[color].backgroundColor};
  color: ${({ color }) => FILTER_BUTTON_STYLE[color].color};

  &:hover {
    background-color: ${({ color }) =>
      FILTER_BUTTON_STYLE[color].hoverBackgroundColor};
    color: ${({ color }) => FILTER_BUTTON_STYLE[color].hoverColor};
  }

  &:active {
    background-color: ${({ color }) =>
      FILTER_BUTTON_STYLE[color].hoverBackgroundColor};
    color: ${({ color }) => FILTER_BUTTON_STYLE[color].hoverColor};
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      padding: 0.5rem 1.5rem;
      font-size: 1.2rem;
    }
  }
`;
