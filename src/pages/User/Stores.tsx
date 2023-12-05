import styled from "styled-components";
import Select from "react-select";
import axios from "axios";

import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';

import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { StoreTag } from '@/components/Tag';
import FilterButton from '@/components/FilterButton';

import { useState, useEffect } from "react";
import { StoreType, StoreData } from "@/types";
import StoreGridSide from "@/components/StoreGrid";
import { formatDate } from "@/utils";
import { useLocation, useNavigate } from 'react-router-dom';

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
      value: 'likes',
      label: '좋아요 순',
    },
    {
      value: 'views',
      label: '조회수 순',
    },
  ];

  const [stores, setStores] = useState<StoreType[]>([]);
  const [storeDatas, setStoreDatas] = useState<StoreData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate()

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

    // 카테고리 탭
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3310/api/categories');
        setCategories(response.data.map((category: { name: string }) => category.name));
      } catch (error) {
        console.error('Error', error);
      }
    };

    // 전시/팝업 데이터 불러오기
    const fetchTabData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const selectedCategory = searchParams.get('categoryId');

        const response = await axios.get(`http://localhost:3310/api/stores?${searchParams}`);

        if (!selectedCategory) {
          setStores(response.data);
          return;
        }
        const filteredStores = response.data.filter((store: StoreType) => {
          return store.categoryId.name === selectedCategory;
        });

        setStores(filteredStores);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
    fetchCategories();
    fetchTabData();
  }, [location.search]);


  // 전시/팝업 탭 클릭
  const categoryFilterHandler = async (selectedCategory: string) => {
    const searchParams = new URLSearchParams(location.search);
    const isCategorySelected = searchParams.get('categoryId') === selectedCategory;

    if (isCategorySelected) {
      searchParams.delete('categoryId');
    } else {
      searchParams.set('categoryId', selectedCategory);
    }

    navigate(`/stores?${searchParams}`);
  };

  // 성인 탭 클릭
  const adultFilterHandler = () => {
    const searchParams = new URLSearchParams(location.search);
    const isAdultVerification = searchParams.get('adultVerification') === 'true';

    if (isAdultVerification) {
      searchParams.delete('adultVerification');
    } else {
      searchParams.set('adultVerification', 'true');
    }

    navigate(`/stores?${searchParams}`)
  };

  // 드롭박스
  const handleFilter = (e: optionsProp | null) => {
    console.log(`${e?.label}으로 필터링 : value = ${e?.value}`);
  };

  return (
    <>
      <StyledMainButtonDiv>
        <div className='mainButtonDiv'>
          <FilterButton onClick={() => categoryFilterHandler(categories[0])} color='primary'>
            {categories[0]}
          </FilterButton>
          <FilterButton onClick={() => categoryFilterHandler(categories[1])} color='notice'>
            {categories[1]}
          </FilterButton>
          <FilterButton onClick={adultFilterHandler} color='error'>
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
