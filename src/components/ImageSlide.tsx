import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import styled from 'styled-components';
import { useRef, useCallback } from 'react';

import { images } from '@/data/sliderImage';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { HeaderTag } from '@/components/Tag';

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  arrow: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  centerPadding: string;
}

export default function ImageSlide() {
  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: '0px',
  };
  const slickRef = useRef<any>(null);

  const previousButtonAction = useCallback(
    () => slickRef.current.slickPrev(),
    []
  );
  const nextButtonAction = useCallback(() => slickRef.current.slickNext(), []);

  return (
    <StyledSliderContainer>
      <Slider {...settings} ref={slickRef}>
        {images.map((image, index) => (
          <div className='imageContainer' key={index}>
            <HeaderTag color='header' title='오늘의 POP PICK!' />
            <img src={image.url} alt={`slide-${index}`} />
            <StyledPrevArrow onClick={previousButtonAction}>
              <IoIosArrowBack size={55} color='white' />
            </StyledPrevArrow>
            <StyledNextArrow onClick={nextButtonAction}>
              <IoIosArrowForward size={55} color='white' />
            </StyledNextArrow>
          </div>
        ))}
      </Slider>
    </StyledSliderContainer>
  );
}

const StyledSliderContainer = styled.div`
  width: 100%;
  height: 320px;
  margin: auto;
  position: relative;

  & .slick-slider {
    height: 320px;
  }

  & .imageContainer {
    height: 320px;
    position: relative;
  }

  & .imageContainer img {
    height: 320px;
    width: 100%;
  }

  & .slick-prev {
    left: -30px;
    position: absolute;
  }

  & .slick-next {
    right: -30px;
  }
`;

const StyledPrevArrow = styled.div`
  position: absolute;
  top: 45%;
  left: 1px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledNextArrow = styled.div`
  position: absolute;
  top: 45%;
  right: 1px;

  &:hover {
    cursor: pointer;
  }
`;
