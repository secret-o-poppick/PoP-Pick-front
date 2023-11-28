import styled from "styled-components";
import logoImg from "@/assets/logo.svg";
import { MEDIA_LIMIT } from "@/assets/styleVariable";

export default function Header() {
  return (
    <>
      <StyledHeader>
        <div id='logo'>
          <img src={logoImg} alt='logo' />
          <h1>Pop Pick</h1>
        </div>
        <div id='search'>
          <div></div>
        </div>
        <div id='user'>
          <div id='login'>➡️</div>
          <div id='userinfo'>🙂</div>
        </div>
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  height: 90px;
  padding: 20px;
  box-shadow: 0 0 0 2px cyan;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  background-color: white;
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      height: 90px;
      padding: 20px;
    }
  }

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #logo {
    width: 20%;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    white-space: nowrap;
    img {
      width: 2rem;
      margin-right: 10px;
    }
    @media (max-width: ${MEDIA_LIMIT}) {
      & {
        width: 15%;
      }
      & > h1 {
        visibility: hidden;
        color: transparent;
      }
    }
  }
  #search {
    width: 50%;
    height: 100%;
    div {
      width: 100%;
      height: 100%;
      border-radius: 1000px;
      box-shadow: 0 3px 10px lightgray;
    }
    @media (max-width: ${MEDIA_LIMIT}) {
      & {
        width: 70%;
      }
    }
  }
  #user {
    width: 20%;
    display: flex;
    justify-content: flex-end;

    @media (max-width: ${MEDIA_LIMIT}) {
      & {
        width: 15%;
      }
    }
  }
`;
