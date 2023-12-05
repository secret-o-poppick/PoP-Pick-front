import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";

import { MEDIA_LIMIT, MEDIA_MAX_LIMIT } from "@/assets/styleVariable";
import { StoreTag } from "@/components/Tag";
// import { data } from "@/data/stores";

//icons
import { IoMdRefresh } from "react-icons/io";
import { TbLocation } from "react-icons/tb";

export default function Map() {
  const [datas, setDatas] = useState([]);

  const mapObj = useRef<any>();
  const [markers, setMarkers] = useState<any>([]);
  const infoWindows: any = [];

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

  const getDatas = async () => {
    const bounds = mapObj.current.getBounds();
    const SW = bounds.getSouthWest();
    const NE = bounds.getNorthEast();
    const boundLimits = {
      x1: SW.Ma,
      x2: NE.Ma,
      y1: SW.La,
      y2: NE.La,
    };
    const response = await fetch(
      `http://localhost:3310/api/address?x1=${boundLimits.x1}&x2=${boundLimits.x2}&y1=${boundLimits.y1}&y2=${boundLimits.y2}`
    );
    const resJson = await response.json();
    setDatas(resJson);
  };

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
      const container = document.getElementById("map");
      const options = {
        center: currentLatLng,
        level: 5,
      };
      mapObj.current = new kakao.maps.Map(container, options);
      getDatas();
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

  useEffect(() => {
    refreshMap();
  }, [datas]);

  const refreshMap = async () => {
    // 마커 리셋
    markers.forEach((marker: any) => {
      marker.setMap(null);
    });
    setMarkers([]);
    infoWindows.forEach((window: any) => {
      window.close(mapObj.current);
    });
    infoWindows.splice(0, infoWindows.length);

    datas.forEach((data: any) => {
      const { x, y } = data;
      const marker = new kakao.maps.Marker({
        map: mapObj.current,
        position: new kakao.maps.LatLng(x, y),
        title: data.store.title,
        isClicked: false,
      });

      const infoContent = `<div class='infoWindow'>
        <img src=${data.store.images[0]}/>
        <div>
          <div>${data.store.title}</div>
          <div>${data.store.startDate} ~ ${data.store.endDate}</div>
          <div>${data.detail1}</div>
          <div>상세보기</div>
        </div>
      </div>`;
      // 인포윈도우를 생성합니다
      const infoWindow = new kakao.maps.InfoWindow({
        content: infoContent,
        removable: true,
      });
      infoWindows.push(infoWindow);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
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
        currentLocation.current.x,
        currentLocation.current.y
      ),
      radius: 50, // 미터 단위의 원의 반지름입니다
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
      map: mapObj.current,
    });
    markers.push(circle);
  };

  const toCurrentLocation = () => {
    const moveLatLon = new kakao.maps.LatLng(
      currentLocation.current.x,
      currentLocation.current.y
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
              <StyledStoreGrid>
                <div>
                  {datas.map((data: any, index: number) => {
                    const store = data.store;
                    /**페이지 네이션으로 처리하기 */
                    if (index >= 6) {
                      return;
                    }
                    // type ???????
                    const title = store.type === "popup" ? "팝업" : "전시";
                    const sd = new Date(store.startDate);
                    const ed = new Date(store.endDate);
                    const startDate = `${sd.getFullYear()}-${sd.getMonth()}-${sd.getDate()}`;
                    const endDate = `${ed.getFullYear()}-${ed.getMonth()}-${ed.getDate()}`;

                    return (
                      <div key={index} className='storeInfoDiv'>
                        <div className='storeInfoTagDiv'>
                          {/* color 뭔지 모르겠어요 ㅜㅜ (store.categoryId.name)을 사용하려고 했는데 한글입니다...*/}
                          <StoreTag color={"popup"} title={title} />
                          {store.adultVerification && (
                            <StoreTag color='adult' title='성인' />
                          )}
                        </div>
                        <img src={store.images[0]} />

                        <div className='storeInfoContents'>
                          <h3>{store.title}</h3>
                          <p>
                            {startDate} ~ {endDate}
                          </p>
                          <p>{data.detail1}</p>
                          <div className='storeIconsDiv'>
                            <FaRegHeart style={{ marginRight: 10 }} />
                            <FaRegBookmark />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledStoreGrid = styled.div`
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  margin-right: 1em;
  box-sizing: border-box;
  & > div:first-child {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33%);
    grid-auto-rows: 50%;
    gap: 1em;
  }
  .storeInfoDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .storeInfoTagDiv {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      position: absolute;
    }
    img {
      width: 100%;
      height: 60%;
      border: 1px solid black;
      border-radius: 10px;
      object-fit: cover;
    }
    .storeInfoContents {
      width: 100%;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 5px;
      box-sizing: border-box;
      h3 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .storeIconsDiv {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  @media (max-width: ${MEDIA_MAX_LIMIT}) and (min-width: ${MEDIA_LIMIT}) {
    & > div:first-child {
      grid-template-columns: repeat(2, 50%);
      grid-auto-rows: 33%;
    }
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    margin: 0;
    padding: 0 1em;
    & > div:first-child {
      grid-template-columns: repeat(1, 100%);
      grid-auto-rows: 30%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .storeInfoDiv {
      display: flex;
      flex-direction: row;
      align-items: normal;
      .storeInfoTagDiv {
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
      }
      img {
        border: 1px solid black;
        width: 50%;
        height: 100%;
      }
      .storeInfoContents {
        height: 100%;
        width: 50%;
        padding: 10% 0 0 1em;
      }
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
        height: ${$isListOpened ? "90%" : "5%"};
        .list {
          visibility: ${$isListOpened ? "visible" : "hidden"};
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
