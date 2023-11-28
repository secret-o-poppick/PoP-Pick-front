import styled from "styled-components";

export default function Footer() {
  return (
    <>
      <StyledFooter>
        <h1>@ 2023 Elice SW7 pop-pick Inc. All Rights Reserved</h1>
        <div id='infos'>
          <div id='wrapper'>
            <span>상호명 : (주)POP-PICK</span>
            <span>대표 : 정현지</span>
            <span>사업자등록번호 : 123-45-67890</span>
          </div>
          <div>주소 : 서울 성동구 아차산로17길 48 엘리스랩</div>
          <div>문의 : pop_pick7@test.com</div>
        </div>
      </StyledFooter>
    </>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  height: 300px;
  background-color: #ffe6ab;
  overflow: hidden;
  margin-top: auto;
  & > * {
    padding-left: 30px;
    display: flex;
  }
  h1 {
    height: 20%;
    font-size: 20px;
    border-bottom: 1px solid black;
    align-items: center;
    @media (max-width: 500px) {
      & {
        font-size: 15px;
      }
    }
  }
  #infos {
    height: 80%;
    line-height: 50px;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 500px) {
      & > * {
        font-size: 0.8em;
      }
    }
  }
  #wrapper > span {
    margin-right: 10px;
    white-space: nowrap;
  }
`;
