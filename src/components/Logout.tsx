import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import { TbLogout2 } from "react-icons/tb";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/admin/login')
    }

    return (
        <>
            <StyledLogout onClick={handleLogout}>
                <TbLogout2 />로그아웃
            </StyledLogout >
        </>
    );
}


const StyledLogout = styled.button`
display: flex;
align-items: center;
justify-content: center;
column-gap: 5px;
border-radius: 20px;
height: 32px;
border: 2px solid #cfd8dc ;
background-color: #fff;
font-weight: bold;

&:hover{
    cursor: pointer;
}
`;
