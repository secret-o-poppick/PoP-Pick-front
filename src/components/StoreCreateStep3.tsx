import React, { useState } from 'react';
import styled from 'styled-components';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Button from '@/components/Button';
import SelectBox from '@/components/SelectBox';
import { AUTH_LOCATION_CATEGORY_OPTIONS1, AUTH_LOCATION_CATEGORY_OPTIONS2, AUTH_LOCATION_CATEGORY_OPTIONS3 } from '@/assets/config';

interface StoreCreateStepProps {
    handleChange: (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextStep: () => void;
}

const StoreCreateStep3: React.FC<StoreCreateStepProps> = () => {
    const today = new Date();
    const defaultSelected: DateRange = {
        from: today,
        to: addDays(today, 0),
    };
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    const handleClick = () => {
        setIsDetailVisible(!isDetailVisible);
    };

    return (
        <>
            <StyledContent>
                <StyledInput>
                    <label id='labels'>일시</label>
                    <div id='dateInput'>
                        <div id='buttons'>
                            <button className='dateInputBtn' onClick={handleClick}>
                                {range?.from ? format(range.from, 'PPP', { locale: ko }) : null}
                            </button>
                            <FaLongArrowAltRight />
                            <button className='dateInputBtn' onClick={handleClick}>
                                {range?.to ? format(range.to, 'PPP', { locale: ko }) : null}
                            </button>
                        </div>
                        {isDetailVisible && (
                            <StyledDateDetail>
                                <Button type='button' color='primary' onClick={handleClick}>저장</Button>
                                <StyledDayPicker
                                    mode='range'
                                    defaultMonth={today}
                                    selected={range}
                                    onSelect={setRange}
                                    locale={ko}
                                />
                            </StyledDateDetail>
                        )}
                    </div>
                </StyledInput>
                <StyledInput>
                    <label id='labels'>지역 카테고리</label>
                    <div id='selectBox'>
                        <SelectBox
                            options={AUTH_LOCATION_CATEGORY_OPTIONS1}
                        />
                        <SelectBox
                            options={AUTH_LOCATION_CATEGORY_OPTIONS2}
                        />
                        <SelectBox
                            options={AUTH_LOCATION_CATEGORY_OPTIONS3}
                        />
                    </div>
                </StyledInput>
            </StyledContent>
        </>
    );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  height:500px;
  row-gap: 50px;
`;

const StyledInput = styled.div`
  display: flex;

  #labels {
    width: 150px;
    font-size: 1rem;
    font-weight: 700;
    color: #333;
    display: inline-block;
  }

  #dateInput{
    display: flex;
    align-self: flex-start;
    flex-direction: column;
  }

  .dateInputBtn {
    background-color: transparent;
    padding: 0.6em 1em;
    border-radius: 5px;
    cursor: pointer;
  }

  #buttons{
    display: flex;
    column-gap: 1em;
    align-items: center;
  }

  #selectBox{
    display: flex;
    column-gap: 1em;
  }
`;

const StyledDateDetail = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &>Button{
    width:50px;
    font-size: 0.7em;
    padding: 6px;
    margin: 20px 20px 0 0;
    align-self: flex-end;
  }
`;

const StyledDayPicker = styled(DayPicker)`
  box-shadow: 0 0 10px lightgray;
  padding: 10px;
  margin: 6px;
  border-radius: 10px;
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #1778f2;
  }
  .rdp-day {
    color: gray;
    display: flex;
    align-items: center;
  }
  .rdp-day_today:not(.rdp-day_outside) {
    font-weight: 800;
    color: black;
  }
  .rdp-day_selected {
    background-color: #ffcb52;
    color: black;
    &:hover {
      background-color: #ff5c40;
    }
  }
`;

export default StoreCreateStep3;
