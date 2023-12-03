import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";

import { MEDIA_LIMIT, MEDIA_MAX_LIMIT } from "@/assets/styleVariable";
import { StoreTag } from "@/components/Tag";
import { data } from "@/data/stores";

//icons
import { IoMdRefresh } from "react-icons/io";
import { TbLocation } from "react-icons/tb";

import { coordinate } from "@/data/coordinate";

export default function Map() {
  const [stores, setStores] = useState(data);
  const [isListOpened, setListOpened] = useState<boolean>(false);
  const listOpenHandler = () => {
    setListOpened((cur) => !cur);
  };

  // kakao map
  const { kakao } = window as any;
  interface Location {
    x: number;
    y: number;
  }
  const currentLocation = useRef<Location>({
    x: 0,
    y: 0,
  });

  let map: any;

  const markers: any = [];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      currentLocation.current = {
        x: position.coords.latitude, //위도
        y: position.coords.longitude, //경도
      };

      const currentLatLng = new kakao.maps.LatLng(
        currentLocation.current.x,
        currentLocation.current.y
      );
      console.log(currentLatLng);
      const container = document.getElementById("map");
      const options = {
        center: currentLatLng,
        level: 3,
      };
      map = new kakao.maps.Map(container, options);

      refreshMap();

      // 마커로 좌표 로깅
      // const marker = new kakao.maps.Marker({
      //   map: map,
      //   position: currentLatLng,
      // });
      // kakao.maps.event.addListener(marker, "dragend", function () {
      //   const loc = marker.getPosition();
      //   console.log(`${loc.La}, ${loc.Ma}`);
      // });

      // 지도 이동시 가운데 좌표 로깅
      // kakao.maps.event.addListener(map, "center_changed", function () {
      //   const latlng = map.getCenter();
      //   const msg = `${latlng.getLat()}, ${latlng.getLng()}`;
      //   console.log(msg);
      // });
    });
  }, []);

  const refreshMap = () => {
    // 마커 리셋
    markers.forEach((marker: any) => {
      marker.setMap(null);
    });

    const bounds = map.getBounds();
    const SW = bounds.getSouthWest();
    const NE = bounds.getNorthEast();
    const boundLimits = {
      x1: SW.La,
      x2: NE.La,
      y1: SW.Ma,
      y2: NE.Ma,
    };

    // 확인용 타임아웃
    // setTimeout(() => {
    const positions = coordinate.filter(
      (loc) =>
        loc[1] > boundLimits.x1 &&
        loc[1] < boundLimits.x2 &&
        loc[2] > boundLimits.y1 &&
        loc[2] < boundLimits.y2
    );

    positions.forEach((loc) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(loc[2], loc[1]),
        title: loc[0],
      });
      markers.push(marker);
      console.log(marker, markers);
    });
    // 현위치 표시
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(
        currentLocation.current.x,
        currentLocation.current.y
      ),
      radius: 30, // 미터 단위의 원의 반지름입니다
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
      map: map,
    });
    markers.push(circle);
    // }, 1000);
  };

  const toCurrentLocation = () => {
    const moveLatLon = new kakao.maps.LatLng(
      currentLocation.current.x,
      currentLocation.current.y
    );
    map.setCenter(moveLatLon);
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
              <div id='refreshBtn' onClick={refreshMap}>
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
              <StyledStoreGrid>
                {stores.map((store, index) => {
                  /**페이지 네이션으로 처리하기 */
                  if (index >= 6) {
                    return;
                  }
                  const title = store.type === "popup" ? "팝업" : "전시";

                  return (
                    <div key={index} className='storeInfoDiv'>
                      <div className='storeInfoTagDiv'>
                        <StoreTag color={store.type} title={title} />
                        {store.adultVerification && (
                          <div className='tagMargin'>
                            <StoreTag color='adult' title='성인' />
                          </div>
                        )}
                      </div>
                      <img src={store.images[0]} />

                      <div className='storeInfoContents'>
                        <h3>{store.name}</h3>
                        <p>{store.date}</p>
                        <p>{store.address}</p>
                        <div className='storeIconsDiv'>
                          <FaRegHeart style={{ marginRight: 10 }} />
                          <FaRegBookmark />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </StyledStoreGrid>

              <StyledPagenationDiv>
                페이지네이션 들어갈 자리
              </StyledPagenationDiv>
            </div>
          </div>
        </div>
      </StyledMap>
    </>
  );
}

const StyledPagenationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const StyledStoreGrid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 50%);

  & .storeInfoTagDiv {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
  }

  & .storeInfoDiv {
    /* margin-bottom: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  & .storeInfoDiv .tagMargin {
    margin-right: 140px;
  }

  & > .storeInfoDiv img {
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
  }

  & .storeIconsDiv {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  & .storeInfoDiv .tagMargin {
    margin-right: 140px;
  }

  & > .storeInfoDiv > .storeInfoContents {
    width: 100%;
    h3 {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      padding: 0 25px;
      grid-template-columns: repeat(1, 100%);
      position: relative;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    & .storeInfoDiv {
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      position: relative;
    }
    & .storeInfoDiv .tagMargin {
      margin-right: 120px;
    }

    & .storeInfoTagDiv {
      width: 340px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      position: absolute;
      top: 0;
      right: 0;
    }

    & > .storeInfoDiv img {
      border: 1px solid black;
      margin-right: 10px;
      width: 150px;
      height: 150px;
    }

    & > .storeInfoDiv > .storeInfoContents {
      height: 130px;
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  @media (min-width: ${MEDIA_MAX_LIMIT}) {
    & {
      grid-template-columns: repeat(3, 33%);
    }
  }
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
        height: ${$isListOpened ? "90%" : "5%"};
        .list {
          visibility: ${$isListOpened ? "visible" : "hidden"};
        }
      `}

      .list {
        transition-duration: 0.5s;
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
