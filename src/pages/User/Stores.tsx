import styled from "styled-components";
import Select from "react-select";
import axios from "axios";

import { FaRegHeart, FaRegBookmark } from "react-icons/fa";

import { MEDIA_LIMIT } from "@/assets/styleVariable";
import { StoreTag } from "@/components/Tag";
import FilterButton from "@/components/FilterButton";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StoreType, StoreData } from "@/types";
import StoreGridSide from "@/components/StoreGrid";
import { formatDate } from "@/utils";

interface optionsProp {
  value: string;
  label: string;
}

export default function Stores() {
  const selectOptions = [
    {
      value: "latests",
      label: "최신 오픈 순",
    },
    {
      value: "likes",
      label: "좋아요 순",
    },
    {
      value: "views",
      label: "조회수 순",
    },
  ];

  const [stores, setStores] = useState<StoreType[]>([]);
  const [storeDatas, setStoreDatas] = useState<StoreData[]>([]);
  const location = useLocation();

  useEffect(() => {
    setStoreDatas(
      stores.map((data: any) => {
        const tag = data.type === "popup" ? "팝업" : "전시";
        const startDate = formatDate(data.startDate);
        const endDate = formatDate(data.endDate);
        const storeData = {
          storeId: data._id,
          title: data.title,
          tag,
          adultVerification: data.adultVerification,
          image: data.images[0],
          startDate,
          endDate,
          location: data.title,
          likes: data.likes,
        };
        return storeData;
      })
    );
  }, [stores]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/stores${decodeURIComponent(
            location.search
          )}`
        );
        setStores(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, [location.search]);

  const handleFilterButton = () => {
    console.log("Filter Button click");
  };

  const handleFilter = (e: optionsProp | null) => {
    console.log(`${e?.label}으로 필터링 : value = ${e?.value}`);
  };

  return (
    <>
      <StyledMainButtonDiv>
        <div className='mainButtonDiv'>
          <FilterButton onClick={handleFilterButton} color='primary'>
            전시
          </FilterButton>
          <FilterButton onClick={handleFilterButton} color='notice'>
            팝업
          </FilterButton>
          <FilterButton onClick={handleFilterButton} color='error'>
            성인
          </FilterButton>
        </div>

        <StyledFilterDiv>
          <div>
            <Select
              options={selectOptions}
              onChange={handleFilter}
              defaultValue={selectOptions[0]}
            />
          </div>
        </StyledFilterDiv>
      </StyledMainButtonDiv>

      <StoreGridSide storeDatas={storeDatas} max={4} />

      <StyledPagenationDiv>페이지네이션 들어갈 자리</StyledPagenationDiv>
    </>
  );
}

const StyledPagenationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const StyledMainButtonDiv = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    margin: 20px 0;
  }
`;

const StyledFilterDiv = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 20px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
`;
