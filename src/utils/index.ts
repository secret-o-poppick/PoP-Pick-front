export type ButtonStyleType = 'default' | 'primary' | 'error';
export type PopPickStyleType = 'default' | 'primary' | 'error' | 'notice';
export type TagStyleType = 'header' | StoreType;
export type StoreType = 'popup' | 'exhibit' | 'adult';

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
