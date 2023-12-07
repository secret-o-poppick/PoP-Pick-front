import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StoreCreateStep1 from '@/components/StoreCreateStep1';
import StoreCreateStep2 from '@/components/StoreCreateStep2';
import StoreCreateStep3 from '@/components/StoreCreateStep3';
import StoreCreateStep4 from '@/components/StoreCreateStep4';
import StoreCreateStep5 from '@/components/StoreCreateStep5';
import StepProgressBar from '@/components/StepProgressBar';
import AdminTitle from '@/components/AdminTitle';
import Button from '@/components/Button';
import { IFileTypes, AddressData, LocCategoryType } from '@/types/index';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

import {
  StoreCreateStep1Context,
  StoreCreateStep3Context,
  StoreCreateStep4Context,
  StoreCreateStep5Context,
} from '@/context/StoreContext';

import { adminStoreCreate } from './AdminStoreAPI';
import { getLoactionCategories } from '@/components/LocationCatgoryAPI';

const AdminStoreEdit = () => {
  const [page, setPage] = useState<number>(1);
  const [uploadedImages, setUploadedImages] = useState<IFileTypes[]>([]);
  const [mainImage, setMainImage] = useState<number>(0);
  const [category, setCategory] = useState('exhibition');
  const [locCategories, setlocCategories] = useState<string[]>([]);
  const [eventName, setEventName] = useState('');
  const [brand, setBrand] = useState('');
  const navigate = useNavigate();

  const today = new Date();
  const defaultSelected: DateRange = {
    from: today,
    to: addDays(today, 0),
  };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [detailAddress, setDetailAddress] = useState('');

  const [adult, setAdult] = useState('');
  const [isFree, setIsFree] = useState('');
  const [cost, setCost] = useState('0');

  const [social, setSocial] = useState('');
  const [promotion, setPromotion] = useState('');
  const [desc, setDesc] = useState('');
  const [etc, setEtc] = useState('');

  const nextStep = () => {
    console.log('Next step clicked');
  };

  const handleInputChange =
    (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`${input} changed: ${e.target.value}`);
    };

  const categoryHandler = (value: string) => {
    setCategory(value);
  };

  const eventNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const brandHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const handleClick = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  const PageDisplay = () => {
    if (page === 1)
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
          <StoreCreateStep1
            nextStep={nextStep}
            handleChange={handleInputChange}
          />
        </StoreCreateStep1Context.Provider>
      );
    else if (page === 2)
      return (
        <StoreCreateStep2
          setMainImage={setMainImage}
          nextStep={nextStep}
          handleChange={handleInputChange}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
      );
    else if (page === 3)
      return (
        <StoreCreateStep3Context.Provider
          value={{
            range,
            setRange,
            handleClick,
            locCategories,
            setlocCategories,
            isDetailVisible,
            addressData,
            setAddressData,
            detailAddress,
            setDetailAddress,
          }}
        >
          <StoreCreateStep3
            locationCategory={locationCategory}
            nextStep={nextStep}
            handleChange={handleInputChange}
          />
        </StoreCreateStep3Context.Provider>
      );
    else if (page === 4)
      return (
        <StoreCreateStep4Context.Provider
          value={{ adult, setAdult, isFree, setIsFree, cost, setCost }}
        >
          <StoreCreateStep4
            nextStep={nextStep}
            handleChange={handleInputChange}
          />
        </StoreCreateStep4Context.Provider>
      );
    else
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
          <StoreCreateStep5
            nextStep={nextStep}
            handleChange={handleInputChange}
          />
        </StoreCreateStep5Context.Provider>
      );
  };

  const handleNext = () => {
    const selectedImages = uploadedImages;
    if (page === 2 && selectedImages.length === 0) {
      alert('이미지 파일을 첨부하세요.');
    } else if (page < 5) {
      setPage((currPage) => currPage + 1);
    } else {
      const adultVerification = adult === 'required' ? true : false;
      const formData = new FormData();

      uploadedImages.forEach((image) => {
        formData.append('files', image.object);
      });

      const data = {
        //팝업&전시회 이름
        name: eventName,
        //주최 브랜드명
        brandName: brand,
        //분류 카테고리
        category,
        //이미지들
        mainImageNumber: mainImage,
        // 사진
        images: uploadedImages,
        //성인 인증 여부
        adultVerification,
        // 지역 카테고리
        locationId: locCategories,
        startDate: range?.from,
        endDate: range?.to,
        fee: cost,
        event: promotion,
        socialLink: social,
        desc,
        etc,
        detail1: addressData?.address,
        detail2: detailAddress,
        zipCode: addressData?.zonecode,
      };

      adminStoreCreate(data);
      navigate('/admin/stores');
    }
  };

  const handlePrev = () => {
    setPage((currPage) => currPage - 1);
  };

  const [locationCategory, setLocationCategory] = useState<LocCategoryType[]>(
    []
  );

  useEffect(() => {
    getLoactionCategories().then((res) => setLocationCategory(res));
  }, []);

  return (
    <>
      <div>
        <AdminTitle title='팝업스토어 등록' />
      </div>
      <div>
        <div style={{ margin: 'auto', width: '50%' }}>
          <StepProgressBar currentPage={page} totalPage={5} />
        </div>

        <div>{PageDisplay()}</div>
        <StyledButton>
          {page > 1 && (
            <div>
              <Button onClick={handlePrev}>이전</Button>
            </div>
          )}
          <div>
            <Button color='primary' onClick={handleNext}>
              {page === 5 ? '등록' : '다음'}
            </Button>
          </div>
        </StyledButton>
      </div>
    </>
  );
};

const StyledButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
  margin-top: 1em;

  & Button {
    width: 80px;
  }
`;

export default AdminStoreEdit;
