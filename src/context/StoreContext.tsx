import { createContext, useState, useContext } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { AddressData } from '@/types/index';

interface StoreProviderProps {
  children: React.ReactNode;
}

interface StoreCreateStep1ContextType {
  // 주최 브랜드
  brand: string;
  brandHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // 팝업&전시
  category: string;
  categoryHandler: (value: string) => void;
  // 팝업 스토어 이름
  eventName: string;
  eventNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface StoreCreateStep3ContextType {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  isDetailVisible: boolean;
  handleClick: () => void;
  addressData: AddressData | null;
  setAddressData: React.Dispatch<React.SetStateAction<AddressData | null>>;
  detailAddress: string;
  setDetailAddress: React.Dispatch<React.SetStateAction<string>>;
}

interface StoreCreateStep4ContextType {
  adult: string;
  setAdult: React.Dispatch<React.SetStateAction<string>>;
  isFree: string;
  setIsFree: React.Dispatch<React.SetStateAction<string>>;
  cost: string;
  setCost: React.Dispatch<React.SetStateAction<string>>;
}

interface StoreCreateStep5ContextType {
  social: string;
  setSocial: React.Dispatch<React.SetStateAction<string>>;
  promotion: string;
  setPromotion: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  etc: string;
  setEtc: React.Dispatch<React.SetStateAction<string>>;
}

export const StoreCreateStep1Context =
  createContext<StoreCreateStep1ContextType | null>(null);

export const StoreCreateStep3Context =
  createContext<StoreCreateStep3ContextType | null>(null);

export const StoreCreateStep4Context =
  createContext<StoreCreateStep4ContextType | null>(null);

export const StoreCreateStep5Context =
  createContext<StoreCreateStep5ContextType | null>(null);

export const StoreCreateStep5Provider = ({ children }: StoreProviderProps) => {
  const [social, setSocial] = useState('');
  const [promotion, setPromotion] = useState('');
  const [desc, setDesc] = useState('');
  const [etc, setEtc] = useState('');

  return (
    <StoreCreateStep5Context.Provider
      value={{
        social,
        setSocial,
        promotion,
        setPromotion,
        desc,
        setDesc,
        etc,
        setEtc,
      }}
    >
      {children}
    </StoreCreateStep5Context.Provider>
  );
};

export const StoreCreateStep4Provider = ({ children }: StoreProviderProps) => {
  const [adult, setAdult] = useState('');
  const [isFree, setIsFree] = useState('');
  const [cost, setCost] = useState('');

  return (
    <StoreCreateStep4Context.Provider
      value={{
        adult,
        setAdult,
        isFree,
        setIsFree,
        cost,
        setCost,
      }}
    >
      {children}
    </StoreCreateStep4Context.Provider>
  );
};

const today = new Date();

const defaultSelected: DateRange = {
  from: today,
  to: addDays(today, 0),
};

export const StoreCreateStep3Provider = ({ children }: StoreProviderProps) => {
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleClick = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [detailAddress, setDetailAddress] = useState('');

  return (
    <StoreCreateStep3Context.Provider
      value={{
        range,
        setRange,
        handleClick,
        isDetailVisible,
        addressData,
        setAddressData,
        detailAddress,
        setDetailAddress,
      }}
    >
      {children}
    </StoreCreateStep3Context.Provider>
  );
};

export const StoreCreateStep1Provider = ({ children }: StoreProviderProps) => {
  const [category, setCategory] = useState('');
  const [eventName, setEventName] = useState('');
  const [brand, setBrand] = useState('');

  const categoryHandler = (value: string) => {
    setCategory(value);
  };

  const eventNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const brandHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  return (
    <StoreCreateStep1Context.Provider
      value={{
        brand,
        category,
        eventName,
        categoryHandler,
        eventNameHandler,
        brandHandler,
      }}
    >
      {children}
    </StoreCreateStep1Context.Provider>
  );
};

export const useCreateStoreStep1Context = () => {
  const context = useContext(StoreCreateStep1Context);
  if (!context) {
    throw new Error('에러입니다!!');
  }

  return context;
};

export const useCreateStoreStep3Context = () => {
  const context = useContext(StoreCreateStep3Context);
  if (!context) {
    throw new Error('에러입니다!!');
  }

  return context;
};

export const useCreateStoreStep4Context = () => {
  const context = useContext(StoreCreateStep4Context);
  if (!context) {
    throw new Error('에러입니다!!');
  }

  return context;
};

export const useCreateStoreStep5Context = () => {
  const context = useContext(StoreCreateStep5Context);
  if (!context) {
    throw new Error('에러입니다!!');
  }

  return context;
};
