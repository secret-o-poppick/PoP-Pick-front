import { ButtonStyleType } from '@/utils';

export const MEDIA_LIMIT = '700px';

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
