import styled from 'styled-components';

interface ProgressBarProps {
  currentPage: number;
  totalPage: number;
}

export default function StepProgressBar({
  currentPage,
  totalPage,
}: ProgressBarProps) {
  const percent = Math.ceil(((currentPage - 1) / (totalPage - 1)) * 100);

  return (
    <Container $percent={percent}>
      {Array.from({ length: totalPage }, (_, index) => index + 1).map(
        (page) => (
          <Item key={page} $completed={page <= currentPage}>
            {page}
          </Item>
        )
      )}
    </Container>
  );
}

const Container = styled.div<{ $percent: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      #3498db ${({ $percent }) => $percent}%,
      #aaa ${({ $percent }) => $percent}%,
      #aaa ${({ $percent }) => 100 - $percent}%
    );
    transform: translateY(-50%);
    z-index: -1;
  }
`;

const Item = styled.div<{ $completed: boolean }>`
  border: 1px solid ${({ $completed }) => ($completed ? '#3498db' : '#aaa')};
  background-color: ${({ $completed }) => ($completed ? '#3498db' : '#fff')};
  color: ${({ $completed }) => ($completed ? '#fff' : '#aaa')};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
`;
