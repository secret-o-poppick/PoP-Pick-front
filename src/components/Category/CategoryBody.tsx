import { useState } from 'react';
import CategoryTableRow from '@/components/Category/CategoryTableRow';

interface CategoryProps {
  items?: any[];
}
export default function CategoryBody({ items }: CategoryProps) {
  const [data, setData] = useState<any[]>(items ?? []);

  const handleAddItem = (value: string) => {
    if (!value.trim()) return;

    setData((prev) => [...prev, { _id: new Date().getTime(), name: value }]);
  };

  const handleToggleItem = (id: number) => {
    setData((prev) =>
      prev.map((data) =>
        data._id === id ? { ...data, onEdit: !data.onEdit } : { ...data }
      )
    );
  };

  const handleUpdateItem = (id: number, value: string) => {
    setData((prev) =>
      prev.map((data) =>
        data._id === id
          ? { ...data, name: value, onEdit: !data.onEdit }
          : { ...data }
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setData((prev) => prev.filter((data) => data._id !== id));
  };

  return (
    <>
      {data?.map((item, index) => (
        <CategoryTableRow
          key={index}
          item={item}
          onAddClick={handleAddItem}
          onToggleClick={handleToggleItem}
          onUpdateClick={handleUpdateItem}
          onDeleteClick={handleDeleteItem}
        />
      ))}
      <CategoryTableRow
        onAddClick={handleAddItem}
        onToggleClick={handleToggleItem}
        onUpdateClick={handleUpdateItem}
        onDeleteClick={handleDeleteItem}
      />
    </>
  );
}
