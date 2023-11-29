import { useState } from 'react';
import Category from '@/components/Category/Category';
import LocationCategory from '@/components/Category/LocationCategory';
import AdminTitle from '@/components/AdminTitle';
import Tabs from '@/components/Tabs';
import { data } from '@/data/locationCategory';
import { data as categoryData } from '@/data/category';

export enum CATEGORY_TAB {
  CATEGORY = 0,
  LOCATION_CATEGORY,
}

export interface CategoryDataType {
  label: string;
  index: CATEGORY_TAB;
  content: React.ReactNode;
}

const tabs: CategoryDataType[] = [
  {
    index: CATEGORY_TAB.CATEGORY,
    label: '분류 카테고리',
    content: <Category items={categoryData} />,
  },
  {
    index: CATEGORY_TAB.LOCATION_CATEGORY,
    label: '지역 카테고리',
    content: <LocationCategory items={data} />,
  },
];

export default function AdminCategories() {
  const [activeTab, setActiveTab] = useState<CATEGORY_TAB>(
    CATEGORY_TAB.CATEGORY
  );

  const handleTabChange = (index: CATEGORY_TAB) => {
    setActiveTab(index);
  };

  const tab = tabs.filter((tab) => tab.index === activeTab)?.[0];

  return (
    <>
      <AdminTitle title={`카테고리 관리 (${tab.label})`} />
      <Tabs tabs={tabs} activeTab={activeTab} handleChange={handleTabChange} />
    </>
  );
}
