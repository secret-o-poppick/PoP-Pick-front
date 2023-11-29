import LocationCategoryHeader from '@/components/Category/LocationCategoryHeader';
import LocationCategoryBody from '@/components/Category/LocationCategoryBody';
import { TBody, THead, Table } from '@/components/Category/Category.style';

interface LocationCategoryProps {
  items?: any[];
}

export default function LocationCategory({ items }: LocationCategoryProps) {
  return (
    <Table>
      <THead>
        <LocationCategoryHeader />
      </THead>
      <TBody>
        <LocationCategoryBody items={items} />
      </TBody>
    </Table>
  );
}
