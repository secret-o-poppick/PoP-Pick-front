import LocationCategoryTableRow from '@/components/Category/LocationCategoryTableRow';

interface LocationCategoryProps {
  items?: any[];
}

export default function LocationCategoryBody({ items }: LocationCategoryProps) {
  return (
    <>
      {items?.map((item, index) => {
        return <LocationCategoryTableRow key={index} item={item} />;
      })}
    </>
  );
}
