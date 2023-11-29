export type AuthOption = '일반' | '등록자' | '관리자';

export type SelectBoxOption = {
  value: string;
  label: string;
};

export type Store = {
  image: string;
  author: string;
  title: string;
  startAt: number | Date;
  endAt: number | Date;
  createdAt: number;
  active: boolean;
  subRows?: Store[];
};
export type IFileTypes = {
  id: number;
  object: File;
};
