import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { CardImageProps } from '@/types'

export default function CardImage({ image, alt = 'profile' }: CardImageProps) {
  return <Image src={image} alt={alt} />;
}

const Image = styled.img`
  width: 150px;
  height: 150px;
  border: 2px solid black;
  border-radius: 10px;

  @media (max-width: ${MEDIA_LIMIT}) {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
`;
