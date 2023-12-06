import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

import { MEDIA_LIMIT } from '@/assets/styleVariable';
// import { data } from "@/data/stores";
import StoreGrid from '@/components/StoreGrid';
import { StoreType } from '@/types';
import axios from 'axios';
import { Location } from '@/types';

//icons
import { IoMdRefresh } from 'react-icons/io';
import { TbLocation } from 'react-icons/tb';
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';
import { formatDate } from '@/utils';

export default function Map() {
  const [storeDatas, setStoreDatas] = useState<StoreType[]>([]);

  const [isListOpened, setListOpened] = useState<boolean>(false);
  const listOpenHandler = () => {
    setListOpened((cur) => !cur);
  };

  // kakao map
  const mapObj = useRef<any>();
  const [markers, setMarkers] = useState<any>([]);
  const infoWindows: any = [];
  const { kakao } = window as any;

  const currentLocation = useRef<Location>({
    x: 0,
    y: 0,
  });

  const getDatas = async () => {
    const bounds = mapObj.current.getBounds();
    const SW = bounds.getSouthWest();
    const NE = bounds.getNorthEast();
    const boundLimits = {
      x1: SW.La,
      x2: NE.La,
      y1: SW.Ma,
      y2: NE.Ma,
    };
    const response = await axios.get(
      `http://localhost:3310/api/address?x1=${boundLimits.x1}&x2=${boundLimits.x2}&y1=${boundLimits.y1}&y2=${boundLimits.y2}`
    );
    console.log(response.data);
    setStoreDatas(response.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      currentLocation.current = {
        x: position.coords.longitude, //경도
        y: position.coords.latitude, //위도
      };
      const currentLatLng = new kakao.maps.LatLng(
        currentLocation.current.y,
        currentLocation.current.x
      );
      const container = document.getElementById('map');
      const options = {
        center: currentLatLng,
        level: 5,
      };
      mapObj.current = new kakao.maps.Map(container, options);
      getDatas();
    });
  }, []);

  useEffect(() => {
    refreshMap();
  }, [storeDatas]);

  const refreshMap = async () => {
    if (!storeDatas) return;
    // 마커 리셋
    markers.forEach((marker: any) => {
      marker.setMap(null);
    });
    setMarkers([]);
    infoWindows.forEach((window: any) => {
      window.close(mapObj.current);
    });
    infoWindows.splice(0, infoWindows.length);

    storeDatas.forEach((data) => {
      const marker = new kakao.maps.Marker({
        map: mapObj.current,
        position: new kakao.maps.LatLng(data.address.y, data.address.x),
        title: data.title,
        isClicked: false,
      });

      const infoContent = `<div class='infoWindow'>
        <img src=${data.images.find((img) => img.isMain)?.url}/>
        <div>
          <div>${data.title}</div>
          <div>${formatDate(data.startDate)} ~ ${formatDate(data.endDate)}</div>
          <div>${data.address.detail1}</div>
          <a href="http://localhost:3000/stores/${data._id}">상세보기</a>
        </div>
      </div>`;
      // 인포윈도우를 생성합니다
      const infoWindow = new kakao.maps.InfoWindow({
        content: infoContent,
        removable: true,
      });
      infoWindows.push(infoWindow);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커 위에 인포윈도우를 표시합니다
        infoWindows.forEach((window: any) => {
          window.close(mapObj.current);
        });
        infoWindow.open(mapObj.current, marker);
      });

      setMarkers((cur: any) => {
        const newArr = [...cur];
        newArr.push(marker);
        return newArr;
      });
    });
    // 현위치 표시
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(
        currentLocation.current.y,
        currentLocation.current.x
      ),
      radius: 50, // 미터 단위의 원의 반지름입니다
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
      map: mapObj.current,
    });
    markers.push(circle);
  };

  const toCurrentLocation = () => {
    const moveLatLon = new kakao.maps.LatLng(
      currentLocation.current.y,
      currentLocation.current.x
    );
    mapObj.current.setCenter(moveLatLon);
    mapObj.current.setLevel(5);
  };
  // kakao map

  return (
    <>
      <StyledMap $isListOpened={isListOpened}>
        <div>
          <div className='mapWrapper'>
            <div className='loadingMap'>지도를 불러오는중</div>
            <div id='map'></div>
            <div className='mapBtns'>
              <div
                id='refreshBtn'
                onClick={() => {
                  getDatas();
                  refreshMap();
                }}
              >
                <IoMdRefresh />
              </div>
              <div id='currentLocBtn' onClick={toCurrentLocation}>
                <TbLocation />
              </div>
            </div>
          </div>
          <div className='listWrapper'>
            <div className='listBtn' onClick={listOpenHandler}>
              <div></div>
            </div>
            <div className='list'>
              {storeDatas.length !== 0 ? (
                <StoreGrid storeDatas={storeDatas} max={3} />
              ) : (
                <div className='none'>검색된 스토어가 없습니다.</div>
              )}

              <StyledPaginationDiv>
                페이지네이션 들어갈 자리
              </StyledPaginationDiv>
            </div>
          </div>
        </div>
      </StyledMap>
    </>
  );
}

const StyledPaginationDiv = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMap = styled.div<{
  $isListOpened: boolean;
}>`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  & > div:first-child {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .mapWrapper {
    width: 100%;
    height: 100%;
    background-color: gray;
    box-shadow: 0 0 10px gray;
    position: relative;
    overflow: hidden;
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
    .mapBtns {
      top: 0;
      z-index: 1;
      margin-top: 1em;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      position: absolute;
      div {
        width: 40px;
        height: 40px;
        border: 3px solid #1778f2;
        border-radius: 50%;
        color: #1778f2;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin-right: 1em;
        &:hover {
          background-color: #cce3ff;
        }
        svg {
          width: 60%;
          height: 60%;
        }
      }
    }
    #map {
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }
  .listWrapper {
    width: 100%;
    height: 100%;
    background-color: white;
    .listBtn {
      display: none;
    }
    .list {
      width: 100%;
      height: 100%;
      position: relative;
      .none {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
      }
    }
  }
  .infoWindow {
    width: 400px;
    height: 150px;
    display: flex;
    img {
      width: 40%;
      height: 100%;
    }
    & > div {
      width: 60%;
      height: 100%;
      padding: 1em;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    padding: 0;
    & > div:first-child {
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 0;
      position: relative;
      box-shadow: none;
      justify-content: flex-end;
    }
    .mapWrapper {
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    }
    .listWrapper {
      margin-top: auto;
      position: absolute;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -5px 10px -10px black;
      transition-duration: 0.5s;

      ${({ $isListOpened }) => css`
        height: ${$isListOpened ? '90%' : '5%'};
        .list {
          visibility: ${$isListOpened ? 'visible' : 'hidden'};
        }
      `}

      .list {
        transition-duration: 0.5s;
        height: calc(100% - 30px);
      }

      .listBtn {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 20px 20px 0 0;
        & > div {
          width: 80px;
          height: 5px;
          background-color: gray;
          border-radius: 1000px;
        }
      }
    }
  }
`;
