import styled from 'styled-components';
import Tab from '@/components/Tab';
import { CATEGORY_TAB, CategoryDataType } from '@/pages/Admin/AdminCategories';

interface TabsProps {
  tabs: CategoryDataType[];
  activeTab: CATEGORY_TAB;
  handleChange: (index: CATEGORY_TAB) => void;
}

export default function Tabs({ tabs, activeTab, handleChange }: TabsProps) {
  return (
    <StyledContainer>
      <StyledTabs>
        {tabs.map((tab) => (
          <Tab
            key={tab.index}
            index={tab.index}
            activeTab={activeTab}
            label={tab.label}
            onChange={handleChange}
          />
        ))}
      </StyledTabs>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledTabs = styled.div`
  display: flex;
`;

const TabContent = styled.div``;
