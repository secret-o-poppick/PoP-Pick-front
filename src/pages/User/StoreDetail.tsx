import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { useEffect, useRef } from 'react';
import { storeInfo } from '@/data/coordinate';
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StoreTag } from '@/components/Tag';

// icons
import logo from '@/assets/logo.svg';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import {} from 'react-icons/fa';
import { IoIosPin } from 'react-icons/io';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { IoIosGlobe } from 'react-icons/io';
import ImageSlide from '@/components/ImageSlide';
import { images } from '@/data/sliderImage';
import { MdLocationPin } from 'react-icons/md';

import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import { formatDate } from '@/utils';
import { StoreType } from '@/types';

export default function StoreDetail() {
  const params = useParams();
  const [data, setData] = useState<StoreType | null>(null);
  const getData = async () => {
    const url = `http://localhost:3310/api/stores/${params.storeId}`;

    const response = await axios.get(url);
    setData(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  //likes & bookmark
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  // kakao map
  const { kakao } = window as any;
  let map: any;

  const toCurrentLocation = () => {
    const moveLatLon = new kakao.maps.LatLng(
      data?.address.x ?? 23,
      data?.address.y ?? 123
    );
    map.setCenter(moveLatLon);
  };

  useEffect(() => {
    if (!data) return;
    const LatLng = new kakao.maps.LatLng(data.address.x, data.address.y);

    const container = document.getElementById('map_detail');
    const options = {
      center: LatLng,
      level: 3,
    };
    map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({ position: LatLng, map: map });
  }, [data]);
  // kakao map

  return (
    <>
      {data && (
        <StyledDetail>
          <div>
            <div className='imgWrapper'>
              <ImageSlide images={data.images.map((imgArr) => imgArr.url)} />
            </div>
            <div className='contentWrapper'>
              <div>
                <h1>{data.title}</h1>
                <div className='tagsAndBtnsWrapper'>
                  <div className='tagsWrapper'>
                    <StoreTag color={'popup'} title={data.categoryId.name} />
                    {data.adultVerification ? (
                      <StoreTag color={'adult'} title={'성인'} />
                    ) : null}
                  </div>
                  <div className='btnsWrapper'>
                    <div>{data.views} views</div>
                    <div>{data.likes} likes</div>

                    <button
                      onClick={() => {
                        setIsLike((cur) => !cur);
                      }}
                    >
                      {isLike ? <FaHeart fill='red' /> : <FaRegHeart />}
                    </button>
                    <button
                      onClick={() => {
                        setIsBookmark((cur) => !cur);
                      }}
                    >
                      {isBookmark ? (
                        <FaBookmark fill='blue' />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </button>
                  </div>
                </div>
                <div className='date'>
                  {formatDate(data.startDate)} ~ {formatDate(data.endDate)}
                </div>
                <div className='infosAndSubWrapper'>
                  <div className='infosWrapper'>
                    <div>
                      <div>
                        <IoIosPin />
                      </div>
                      <div>{data.address.detail1}</div>
                    </div>
                    <div>
                      <div>
                        <AiOutlineDollarCircle />
                      </div>
                      <div>{data.fee.toLocaleString()} 원</div>
                    </div>
                    <div>
                      <div>
                        <IoIosGlobe />
                      </div>
                      <div>
                        <Link to={data.socialLink}>{data.socialLink}</Link>
                      </div>
                    </div>
                  </div>
                  <div className='extra'>
                    <p>{data.desc}</p>
                    <p>{data.etc}</p>
                    <p>{data.event}</p>
                  </div>
                </div>
              </div>
              <div className='mapWrapper'>
                <div className='loadingMap'>지도를 불러오는중</div>
                <div id='map_detail'></div>

                <div className='currentLocBtn' onClick={toCurrentLocation}>
                  <MdLocationPin />
                </div>
              </div>
            </div>
          </div>
        </StyledDetail>
      )}
    </>
  );
}

const StyledDetail = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  & > div {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px lightgray;
    display: flex;
    box-sizing: border-box;
  }
  .imgWrapper {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 0 10px lightgray;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .contentWrapper {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3em;
    box-sizing: border-box;
    & > div:first-child {
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 2em;
    }
  }
  h1 {
    font-size: 1.5em;
    font-weight: bold;
    word-break: keep-all;
  }
  .date {
    color: gray;
  }
  .tagsAndBtnsWrapper {
    height: 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tagsWrapper {
      display: flex;
    }
    .btnsWrapper {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;
      div {
        font-size: 10px;
      }
      button {
        padding: 0;
        border: none;
        background-color: transparent;
      }
      svg {
        width: 20px;
        height: 20px;
        &:hover {
          fill: lightgray;
        }
      }
    }
  }
  .infosAndSubWrapper {
    height: 60%;
    display: flex;
    gap: 0 20px;

    .infosWrapper {
      width: 50%;
      height: 100%;
      padding: 1em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      word-break: keep-all;
      box-sizing: border-box;
      background-color: #eee;
      border-radius: 10px;
      & > div {
        width: 100%;
        display: flex;
        align-items: center;
        div:first-child,
        svg {
          margin-right: 10px;
          width: 30px;
          height: 30px;
        }
        div:last-child {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          a {
            color: black;
          }
        }
      }
    }

    .extra {
      width: 50%;
      height: 100%;
      box-shadow: 0 0 5px lightgray inset;
      border-radius: 10px;
      overflow: auto;
      word-break: keep-all;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &::-webkit-scrollbar {
        display: none;
      }
      p {
        width: 100%;
        box-shadow: 0 0px 2px lightgray;
        padding: 1em;
        box-sizing: border-box;
      }
    }
  }
  .mapWrapper {
    height: 50%;
    border-radius: 10px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px lightgray;
    background-color: gray;
    .loadingMap {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1em;
      font-weight: bold;
    }
    #map_detail {
      width: 100%;
      height: 100%;
    }
    .currentLocBtn {
      z-index: 1;
      width: 30px;
      height: 30px;
      border: 3px solid #1778f2;
      border-radius: 50%;
      color: #1778f2;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      margin: 1em;
      position: absolute;
      top: 0;
      svg {
        width: 60%;
        height: 60%;
      }
      &:hover {
        background-color: #cce3ff;
      }
    }
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    height: auto;
    padding: 0;
    & > div:first-child {
      width: 100%;
      flex-direction: column;
      padding: 0;
      border-radius: 0;
    }
    .imgWrapper {
      width: 100%;
      padding: 0;
      img {
        border-radius: 0;
      }
    }
    .contentWrapper {
      width: 100%;
      padding: 0;
      & > div:first-child {
        padding-top: 0;
      }
    }
    h1,
    .tagsAndBtnsWrapper,
    .date {
      padding: 10px 20px;
    }
    .infosAndSubWrapper {
      flex-direction: column;
      .infosWrapper {
        width: 100%;
        gap: 20px;
        margin: 1em 0;
        border-radius: 0;
      }
      .extra {
        width: 100%;
        border-radius: 0;
        border-left: none;
        border-right: none;
        margin-top: 1em;
      }
    }
    .mapWrapper {
      .loadingMap {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1em;
        font-weight: bold;
      }
      #map_detail {
        height: 30vh;
        border-radius: 0;
        margin-bottom: 2em;
      }
    }
  }
`;
