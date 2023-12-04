import styled from "styled-components";

import Stores from "./Stores";
import ImageSlide from "@/components/ImageSlide";
import { HeaderTag } from "@/components/Tag";
import { images } from "@/data/sliderImage";

/**
 * TODO :추후 이미지 슬라이드 사진들로 바뀔 예정
 */
import logoImg from "@/assets/logo.svg";
import { MEDIA_LIMIT } from "@/assets/styleVariable";

export default function Main() {
  return (
    <>
      <StyledMainHeader>
        <ImageSlide images={images} />
      </StyledMainHeader>

      <Stores />
    </>
  );
}

const StyledMainHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 320px;
  background-color: gray;

  & .mainHeaderDiv img {
    width: 100%;
    height: 320px;
  }
  .slick-arrow {
    display: none !important;
  }
`;
