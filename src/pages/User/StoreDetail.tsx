import styled from 'styled-components';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { useEffect, useRef } from 'react';
import { storeInfo } from '@/data/coordinate';

// icons
import logo from '@/assets/logo.svg';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';
import { IoIosPin } from 'react-icons/io';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { IoIosGlobe } from 'react-icons/io';
import ImageSlide from '@/components/ImageSlide';
import { images } from '@/data/sliderImage';
import { MdLocationPin } from 'react-icons/md';

export default function StoreDetail() {
  const data = storeInfo;
  const tags = [];
  if (data.adultVerification) {
    tags.push('성인');
  }
  if (data.type === 'popup') {
    tags.push('팝업');
  }

  // kakao map
  const { kakao } = window as any;

  let map: any;

  const toCurrentLocation = () => {
    const moveLatLon = new kakao.maps.LatLng(
      data.coordinate.x,
      data.coordinate.y
    );
    map.setCenter(moveLatLon);
  };

  useEffect(() => {
    const LatLng = new kakao.maps.LatLng(data.coordinate.x, data.coordinate.y);

    const container = document.getElementById('map_detail');
    const options = {
      center: LatLng,
      level: 3,
    };
    map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({ position: LatLng, map: map });
  }, []);
  // kakao map

  return (
    <>
      <StyledDetail>
        <div>
          <div className='imgWrapper'>
            <ImageSlide images={images} />
          </div>
          <div className='contentWrapper'>
            <div>
              <h1>{data.title}</h1>
              <div className='tagsAndBtnsWrapper'>
                <div className='tagsWrapper'>
                  {tags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                  ))}
                </div>
                <div className='btnsWrapper'>
                  <div className='btns'>
                    <FaRegHeart />
                    <div>{data.likes}</div>
                  </div>
                  <div className='btns'>
                    <FaRegBookmark />
                  </div>
                </div>
              </div>
              <div className='date'>{data.date}</div>
              <div className='infosAndSubWrapper'>
                <div className='infosWrapper'>
                  <div>
                    <div>
                      <IoIosPin />
                    </div>
                    <div>
                      {data.city} {data.distirct}
                    </div>
                  </div>
                  <div>
                    <div>
                      <AiOutlineDollarCircle />
                    </div>
                    <div>{data.price}</div>
                  </div>
                  <div>
                    <div>
                      <IoIosGlobe />
                    </div>
                    <div>{data.sns}</div>
                  </div>
                </div>
                <p>{data.subscribe}</p>
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
      object-fit: contain;
      background-color: lightgray;
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
      height: 60%;
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
    .tagsWrapper {
      display: flex;
      & > div {
        width: 50px;
        margin-right: 10px;
        box-shadow: 0 0 5px lightgray;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eb5a43;
        color: white;
      }
    }
    .btnsWrapper {
      display: flex;
      width: 15%;
      gap: 10px;
      justify-content: flex-end;
      .btns > div {
        width: 100%;
        font-size: 10px;
        text-align: center;
      }
      .btns > svg {
        width: 100%;
        height: 60%;
      }
    }
  }
  .infosAndSubWrapper {
    height: 50%;
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
        display: flex;
        align-items: center;
        div:first-child,
        svg {
          margin-right: 10px;
          width: 30px;
          height: 30px;
        }
      }
    }

    p {
      width: 50%;
      height: 100%;
      padding: 1em;
      box-shadow: 0 0 5px lightgray inset;
      border-radius: 10px;
      overflow: auto;
      word-break: keep-all;
      display: flex;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .mapWrapper {
    height: 40%;
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
      p {
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
