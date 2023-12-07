import { SelectBoxOption } from '@/types';

export const AUTH_OPTIONS: SelectBoxOption[] = [
  { value: '일반', label: '일반' },
  { value: '등록자', label: '등록자' },
  { value: '관리자', label: '관리자' },
];

export const AUTH_FILTER_OPTIONS: SelectBoxOption[] = [
  { value: '일반', label: '일반 유저만 보기' },
  { value: '등록자', label: '등록자만 보기' },
  { value: '관리자', label: '관리자만 보기' },
];

export const AUTH_LOCATION_CATEGORY_OPTIONS2: SelectBoxOption[] = [
  { value: '구로구', label: '구로구' },
  { value: '구리시', label: '구리시' },
  { value: '남양주시', label: '남양주시' },
];

export const AUTH_LOCATION_CATEGORY_OPTIONS3: SelectBoxOption[] = [
  { value: '구로 1가', label: '구로 1가' },
  { value: '구로 2가', label: '구로 2가' },
  { value: '구로 3가', label: '구로 3가' },
  { value: '인창동', label: '인창동' },
  { value: '토평동', label: '토평동' },
  { value: '수택동', label: '수택동' },
  { value: '교문동', label: '교문동' },
  { value: '도농동', label: '도농동' },
  { value: '호평동', label: '호평동' },
];

export const AUTH_ACTIVE_VALID_OPTIONS: SelectBoxOption[] = [
  { value: '숨기기', label: '숨긴 게시물' },
  { value: '숨기기 해제', label: '안숨긴 게시물' },
];

export const { REACT_APP_BACKEND_HOST } = process.env;
