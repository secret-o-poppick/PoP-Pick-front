import { StoreType } from '@/utils/index';
//TODO: images 부분은 추후에 수정해야함
import logoImg from '@/assets/logo.svg';

export const data: {
  name: string;
  date: string;
  address: string;
  images: string[];
  type: StoreType;
  adultVerification: boolean;
}[] = [
  {
    name: '도구리 막내 클럽',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    images: [logoImg],
    type: 'popup',

    adultVerification: false,
  },
  {
    name: 'UFF : Feel House',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    type: 'exhibit',
    images: [logoImg],
    adultVerification: false,
  },
  {
    name: '무진장 블랙 프라이데이',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    type: 'popup',
    images: [logoImg],
    adultVerification: false,
  },
  {
    name: '플롭 선양 페스티벌',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    type: 'popup',
    images: [logoImg],
    adultVerification: true,
  },
  {
    name: '도구리 막내 클럽',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    type: 'popup',
    images: [logoImg],
    adultVerification: false,
  },
  {
    name: 'UFF : Feel House',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    type: 'exhibit',
    images: [logoImg],
    adultVerification: false,
  },
  {
    name: '무진장 블랙 프라이데이',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    type: 'popup',
    images: [logoImg],
    adultVerification: false,
  },
  {
    name: '플롭 선양 페스티벌',
    date: '2023.10.20 ~ 2023.10.30',
    address: '서울시 성동구',
    type: 'popup',
    images: [logoImg],
    adultVerification: true,
  },
];
