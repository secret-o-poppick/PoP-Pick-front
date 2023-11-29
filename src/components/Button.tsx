import styled from 'styled-components';
import { BUTTON_STYLE } from '@/assets/styleVariable';
import { ButtonStyleType } from '@/utils/index';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: ButtonStyleType;
  children: string;
  onClick?: () => void;
  full?: boolean;
}

export default function Button({
  type = 'button',
  color = 'default',
  children,
  onClick,
  full = false,
}: ButtonProps) {
  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <StyledButton type={type} color={color} onClick={handleClick} $full={full}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ color: ButtonStyleType; $full: boolean }>`
  width: ${({ $full }) => $full && '100%'};
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  background-color: ${({ color }) => BUTTON_STYLE[color].backgroundColor};
  color: ${({ color }) => BUTTON_STYLE[color].color};

  &:hover {
    background-color: ${({ color }) => BUTTON_STYLE[color].hoverColor};
  }

  &:active {
    background-color: ${({ color }) => BUTTON_STYLE[color].activeColor};
  }
`;
