import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { CardImageProps } from '@/types';

export default function CardImage({ image }: CardImageProps) {
  return <Image src={image} alt='store-image' />;
}

const Image = styled.img`
  box-sizing: border-box;
  display: block;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: fill;

  @media (max-width: ${MEDIA_LIMIT}) {
    width: 100px;
    height: 100px;
  }
`;
