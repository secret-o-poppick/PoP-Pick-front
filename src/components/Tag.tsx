import styled from 'styled-components';
import { TAG_STYLE } from '@/assets/styleVariable';
import { TagStyleType } from '@/utils/index';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface TagProps {
  color: TagStyleType;
  title: string;
}

export const HeaderTag = ({ color, title }: TagProps) => {
  return <StyledHeaderTagDiv color={color}>{title}</StyledHeaderTagDiv>;
};

export const StoreTag = ({ color, title }: TagProps) => {
  return <StyledStoreTagDiv color={color}>{title}</StyledStoreTagDiv>;
};

const StyledHeaderTagDiv = styled.div<{ color: TagStyleType }>`
  width: 9em;
  height: 2em;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  color: ${({ color }) => TAG_STYLE[color].color};
  background-color: ${({ color }) => TAG_STYLE[color].backgroundColor};

  position: absolute;
  margin: 10px;
`;

const StyledStoreTagDiv = styled.div<{ color: TagStyleType }>`
  width: 3.5em;
  height: 2em;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  color: ${({ color }) => TAG_STYLE[color].color};
  background-color: ${({ color }) => TAG_STYLE[color].backgroundColor};

  position: absolute;
  margin: 10px;
`;