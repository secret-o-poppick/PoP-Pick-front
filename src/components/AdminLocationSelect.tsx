import React from 'react';
import styled from 'styled-components';
import SelectBox from '@/components/SelectBox';
import { AUTH_LOCATION_CATEGORY_OPTIONS1, AUTH_LOCATION_CATEGORY_OPTIONS2, AUTH_LOCATION_CATEGORY_OPTIONS3 } from '@/assets/config';

interface LocationCategoryInputProps { }

const LocationCategoryInput: React.FC<LocationCategoryInputProps> = () => (
  <StyledInput>
    <label id='labels'>지역 카테고리</label>
    <div id='selectBox'>
      <SelectBox options={AUTH_LOCATION_CATEGORY_OPTIONS1} />
      <SelectBox options={AUTH_LOCATION_CATEGORY_OPTIONS2} />
      <SelectBox options={AUTH_LOCATION_CATEGORY_OPTIONS3} />
    </div>
  </StyledInput>
);

const StyledInput = styled.div`
    display: flex;

    #labels {
        width: 150px;
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        display: inline-block;
    }

    #selectBox {
        display: flex;
        column-gap: 1em;
    }
`;


export default LocationCategoryInput;
