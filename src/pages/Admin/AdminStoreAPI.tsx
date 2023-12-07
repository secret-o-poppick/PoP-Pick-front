import { newStoreDataType } from '@/types/index';
import axios from 'axios';

export const adminStoreCreate = async (data: newStoreDataType) => {
  const formData = new FormData();
  const name = data.name;
  const brandName = data.brandName;
  const category = data.category;
  const mainImageNumber = data.mainImageNumber;
  const adultVerification = data.adultVerification;
  const locationId = data.locationId;
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

  const { kakao } = window as any;
  const geocoder = new kakao.maps.services.Geocoder();

  const arr: number[] = [];

  geocoder.addressSearch(detail1, (result: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result[0]);

      const x = Number(result[0].x);
      const y = Number(result[0].y);

      arr.push(x);
      arr.push(y);

      return result;
    }
  });

  const json = JSON.stringify({
    name,
    brandName,
    category,
    mainImageNumber,
    adultVerification,
    locationId,
    startDate,
    endDate,
    fee,
    event,
    socialLink,
    desc,
    etc,
    x: arr[0],
    y: arr[1],
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
