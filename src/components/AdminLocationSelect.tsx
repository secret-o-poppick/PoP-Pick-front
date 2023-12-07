import React, { useEffect } from 'react';
import styled from 'styled-components';
import SelectBox from '@/components/SelectBox';

import { SelectBoxOption } from '@/types/index';

interface LocationCategoryInputProps {
  category1Option: SelectBoxOption[];
  category2Option: SelectBoxOption[];
  handleLoc1Category: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLoc2Category: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LocationCategoryInput: React.FC<LocationCategoryInputProps> = ({
  category1Option,
  category2Option,
  handleLoc1Category,
  handleLoc2Category,
}) => (
  <StyledInput>
    <label id='labels'>지역 카테고리</label>
    <div id='selectBox'>
      <SelectBox onChange={handleLoc1Category} options={category1Option} />
      <SelectBox onChange={handleLoc2Category} options={category2Option} />
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
