import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface AdminSearchProps {
    handleSearch: (text: string) => void;
}

const AdminSearch: React.FC<AdminSearchProps> = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(searchText);
        }
    };

    const handleClickSearch = () => {
        handleSearch(searchText);
    };

    return (
        <StyledSearch>
            <div>
                <Input
                    type='text'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder='작성자명이나 제목을 입력하세요.'
                />
            </div>
            <Button color='primary' onClick={handleClickSearch}>
                검색
            </Button>
        </StyledSearch>
    );
}

const StyledSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    margin-top: 3em;

    & Input {
        width: 300px;
    }

    Button {
        width: 80px;
        margin-left: 0.6em;
    }
`

export default AdminSearch;
