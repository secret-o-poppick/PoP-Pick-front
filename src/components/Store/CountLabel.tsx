import styled from 'styled-components';

interface CountLabelProps {
  count: number;
  label: string;
}

export default function CountLabel({ count, label }: CountLabelProps) {
  return (
    <Container>
      <span>{count}</span>
      <span>{label}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-size: 0.9rem;
`;
