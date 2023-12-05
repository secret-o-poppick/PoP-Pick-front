import styled from 'styled-components';
import { TAG_STYLE } from '@/assets/styleVariable';
import { TagStyleType } from '@/utils/index';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface TagProps {
  color: TagStyleType;
  title: string;
}

export default function CardTag({ color, title }: TagProps) {
  return <StyledStoreTagDiv color={color}>{title}</StyledStoreTagDiv>;
}

const StyledStoreTagDiv = styled.div<{ color: TagStyleType }>`
  width: 3.5em;
  height: 2em;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  color: ${({ color }) => TAG_STYLE[color].color};
  background-color: ${({ color }) => TAG_STYLE[color].backgroundColor};

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 3rem;
      height: 1.5em;
      font-weight: 400;
      font-size: 0.8rem;
      margin: 0;
    }
  }
`;
