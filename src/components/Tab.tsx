import styled from 'styled-components';
import { CATEGORY_TAB } from '@/pages/Admin/AdminCategories';

interface TabProps {
  label: string;
  index: CATEGORY_TAB;
  activeTab: CATEGORY_TAB;
  onChange: (index: CATEGORY_TAB) => void;
}

export default function Tab({ index, activeTab, label, onChange }: TabProps) {
  return (
    <StyledTab>
      <RadioInput
        type='radio'
        id={`tab-${index}`}
        name='tabGroup'
        checked={index === activeTab}
        onChange={() => onChange(index)}
      />

      <TabLabel htmlFor={`tab-${index}`} $active={index === activeTab}>
        {label}
      </TabLabel>
    </StyledTab>
  );
}

const StyledTab = styled.div`
  display: flex;
`;

const RadioInput = styled.input`
  display: none;
`;

const TabLabel = styled.label<{ $active: boolean }>`
  padding: 0.8rem 1.6rem;
  border: 1px solid #e4edff;
  background-color: ${(props) => (props.$active ? '#e4edff' : '#fff')};
  color: ${(props) => (props.$active ? '#000' : '#000')};
  cursor: pointer;
`;
