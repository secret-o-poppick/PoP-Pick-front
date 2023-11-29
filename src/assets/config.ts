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
