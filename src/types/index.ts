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

export type AddressData = {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
};

export type StoreCreateStepProps = {
  handleChange: (
    input: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
};

export type AddressInputProps = {
  addressData: AddressData | null;
  setAddressData: React.Dispatch<React.SetStateAction<AddressData | null>>;
  isModalOpen: boolean;
  openPostCode: () => void;
  closePostCode: () => void;
  detailAddress: string;
  setDetailAddress: React.Dispatch<React.SetStateAction<string>>;
};
