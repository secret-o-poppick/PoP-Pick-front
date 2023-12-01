import styled from 'styled-components';

interface AvatarProps {
  image?: string;
}

export default function Avatar({ image }: AvatarProps) {
  return (
    <Container>{image && <AvatarImage src={image} alt='profile' />}</Container>
  );
}

const Container = styled.div``;

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
