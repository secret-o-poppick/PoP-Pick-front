import { newStoreDataType } from '@/types/index';
import axios from 'axios';

export const adminStoreCreate = async (data: newStoreDataType) => {
  try {
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

    geocoder.addressSearch(detail1, async (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const x = Number(result[0].x);
        const y = Number(result[0].y);

        const json = JSON.stringify({
          title: name,
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
          x,
          y,
          detail1,
          detail2,
          zipCode,
        });

        formData.append('data', json);

        const response = await axios.post(
          'http://localhost:3310/api/admin/stores',
          formData
        );

        return response;
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
