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

export type StoreType = {
  _id: string;
  title: string;
  brandName: string;
  adultVerification: boolean;
  startDate: string;
  endDate: string;
  images: string;
  isActive: boolean;
  views: number;
  likes: number;
  isFree: boolean;
  fee: number;
  event: string;
  socialLink: string;
  desc: string;
  etc: string;
  categoryId: CategoryType;
  locationId: string[];
};

export type StoreData = {
  storeId: string;
  title: string;
  tag: string;
  adultVerification: boolean;
  image: string;
  startDate: string;
  endDate: string;
  location: string;
  likes: number;
};

export type User = {
  _id: string;
  name: string;
  nickName: string;
  role: string;
  image: string;
};

export type CategoryType = {
  _id: string;
  name: string;
};

export type optionsProp = {
  value: string;
  label: string;
};

export type Location = {
  x: number;
  y: number;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  withdrawal: () => void;
};

export type CardImageProps = {
  image: string;
  alt?: string;
};

export type CardItemProps = {
  title: string;
  startDate: string;
  endDate: string;
  likes: number;
};

export type newStoreDataType = {
  name: string;
  brandName: string;
  category: string;
  mainImageNumber: number;
  images: IFileTypes[];
  adultVerification: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  fee: string;
  event: string;
  socialLink: string;
  desc: string;
  etc: string;
  detail1: string | undefined;
  detail2: string;
  zipCode: string | undefined;
};
