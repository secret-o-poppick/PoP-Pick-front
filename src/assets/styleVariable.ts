import { ButtonStyleType, PopPickStyleType, TagStyleType } from '@/utils';

export const MEDIA_LIMIT = '700px';
export const MEDIA_MAX_LIMIT = '1500px';

export const BUTTON_STYLE: Record<
  ButtonStyleType,
  {
    backgroundColor: string;
    color: string;
    hoverColor: string;
    activeColor: string;
  }
> = {
  default: {
    backgroundColor: '#BEBEBE',
    color: '#FFFFFF',
    hoverColor: '#A2A2A2',
    activeColor: '#848484',
  },
  primary: {
    backgroundColor: '#1778F2',
    color: '#FFFFFF',
    hoverColor: '#1253B2',
    activeColor: '#0D437E',
  },
  error: {
    backgroundColor: '#EB5B42',
    color: '#FFFFFF',
    hoverColor: '#C64832',
    activeColor: '#A03E2E',
  },
};

export const TAG_STYLE: Record<
  TagStyleType,
  {
    backgroundColor: string;
    color: string;
  }
> = {
  header: {
    backgroundColor: '#F5C553',
    color: '#ffffff',
  },
  popup: {
    backgroundColor: '#F5C553',
    color: '#ffffff',
  },
  exhibit: {
    backgroundColor: '#1778F2',
    color: '#ffffff',
  },
  adult: {
    backgroundColor: '#EB5B42',
    color: '#ffffff',
  },
};

export const FILTER_BUTTON_STYLE: Record<
  PopPickStyleType,
  {
    backgroundColor: string;
    color: string;
    hoverColor: string;
    hoverBackgroundColor: string;
    activeColor: string;
    border: string;
  }
> = {
  default: {
    backgroundColor: '#ffffff',
    color: '#000000',
    hoverColor: '#ffffff',
    hoverBackgroundColor: '#000000',
    activeColor: '#848484',
    border: '1.5px solid #000000',
  },
  primary: {
    backgroundColor: '#ffffff',
    color: '#1778F2',
    hoverColor: '#ffffff',
    hoverBackgroundColor: '#1778F2',
    activeColor: '#1778F2',
    border: '1.5px solid #1778F2',
  },
  notice: {
    backgroundColor: '#ffffff',
    color: '#F5C553',
    hoverColor: '#ffffff',
    hoverBackgroundColor: '#F5C553',
    activeColor: '#F5C553',
    border: '1.5px solid #F5C553',
  },
  error: {
    backgroundColor: '#ffffff',
    color: '#EB5B42',
    hoverColor: '#ffffff',
    hoverBackgroundColor: '#EB5B42',
    activeColor: '#EB5B42',
    border: '1.5px solid #EB5B42',
  },
};
