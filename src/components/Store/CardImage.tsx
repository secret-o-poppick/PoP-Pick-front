import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

interface CardImageProps {
  image: string;
}

export default function CardImage({ image }: CardImageProps) {
  return <Image src={image} alt='store-image' />;
}

const Image = styled.img`
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 100%;

  @media (max-width: ${MEDIA_LIMIT}) {
    width: 100px;
    height: 100px;
  }
`;
