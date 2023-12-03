import { MEDIA_LIMIT } from "@/assets/styleVariable";
import styled from "styled-components";
import logo from "@/assets/logo.svg";

export default function User() {
  const data = {
    nickname: "Nickname",
    id: "POP USER",
    email: "test@test.com",
    register: false,
  };
  return (
    <>
      <StyledUser>
        <div>
          <div className='userWrapper'>
            <div className='profile'>
              <img src={logo} />
              <div>{data.nickname}</div>
              <div>{data.id}</div>
              <div>{data.email}</div>
            </div>
            <div className='btnsWrapper'>
              {data.register ? (
                <div>+사업자 등록</div>
              ) : (
                <div>+이벤트 새로 등록하기</div>
              )}
              <div className='resign'>탈퇴하기</div>
            </div>
          </div>
          <div className='listWrapper'>
            <div></div>
          </div>
        </div>
      </StyledUser>
    </>
  );
}

const StyledUser = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  padding: 3em;
  box-sizing: border-box;
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 2em;
  }
  .userWrapper {
    width: 30%;
    height: 100%;
    box-shadow: 0 0 10px lightgray;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .profile {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    font-size: 1em;
    font-weight: bold;
    div {
      padding-left: 10px;
    }
    img {
      width: 150px;
      height: 150px;
      border: 2px solid black;
      border-radius: 10px;
    }
  }
  .btnsWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding: 10px;
    box-sizing: border-box;
    & > div {
      border-radius: 10000px;
      padding: 5px 10px;
      font-size: 10px;
      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }
  }
  .listWrapper {
    width: 70%;
    height: 100%;
    display: flex;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    padding: 0;
    height: auto;
    & > div {
      flex-direction: column;
      gap: 0;
    }
    .userWrapper {
      width: 100%;
      .resign {
        display: none;
      }
    }
    .listWrapper {
      width: 100%;
    }
  }
`;
