import CategoryTableHeader from '@/components/Category/CategoryHeader';
import CategoryBody from '@/components/Category/CategoryBody';
import { TBody, THead, Table } from '@/components/Category/Category.style';

interface CategoryProps {
  items?: any[];
}

export default function Category({ items }: CategoryProps) {
  return (
    <Table>
      <THead>
        <CategoryTableHeader />
      </THead>
      <TBody>
        <CategoryBody items={items} />
      </TBody>
    </Table>
  );
}
