import { newStoreDataType } from '@/types/index';
// const { kakao } = window as any;
import axios from 'axios';

export const adminStoreCreate = async (data: newStoreDataType) => {
  const formData = new FormData();
  const name = data.name;
  const brandName = data.brandName;
  const category = data.category;
  const mainImageNumber = data.mainImageNumber;
  const adultVerification = data.adultVerification;
  const startDate = data.startDate;
  const endDate = data.endDate;
  const fee = data.fee;
  const event = data.event;
  const socialLink = data.socialLink;
  const desc = data.desc;
  const etc = data.etc;
  const detail1 = data.detail1;
  const detail2 = data.detail2;
  const zipCode = data.zipCode;

  data.images.map((image) => {
    formData.append('file', image.object);
  });

  //   const geocoder = new kakao.maps.services.Geocoder();

  //   const lat = geocoder.addressSearch(detail1, (result: any, status: any) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       return result;
  //     }
  //   });

  //   console.log(lat);

  const json = JSON.stringify({
    name,
    brandName,
    category,
    mainImageNumber,
    adultVerification,
    startDate,
    endDate,
    fee,
    event,
    socialLink,
    desc,
    etc,
    detail1,
    detail2,
    zipCode,
  });

  formData.append('data', json);

  try {
    const response = await axios.post(
      'http://localhost:3310/api/admin/stores',
      formData
    );
  } catch (error) {
    console.error('Error:', error);
  }
};
