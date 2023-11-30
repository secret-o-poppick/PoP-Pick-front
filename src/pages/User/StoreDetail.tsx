import styled from "styled-components";
import { MEDIA_LIMIT } from "@/assets/styleVariable";
// icons
import logo from "@/assets/logo.svg";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoIosGlobe } from "react-icons/io";

export default function StoreDetail() {
  const data = {
    title: "도구리 막내클럽 <실수 세탁소>",
    tags: ["팝업", "유료"],
    likes: "99k",
    date: "2023.10.20~2023.10.30",
    location: "서울시 마포구 동교로 29길 34",
    price: "1인 15,000원",
    sns: "SNS 바로가기",
    subscribe: `막내들이 행복한 세상을 위해 도구리가 창단한 비밀 조직 ‘막내클럽’이
  이번에는 막내들의 실수를 깨끗하게 지워주는 실수 세탁소로
  돌아왔습니다. 이곳에서 모든 나만의 아찔한 실수를 은밀하게 세탁하고
  당당한 막내로 다시 태어나보세요!막내들이 행복한 세상을 위해 도구리가 창단한 비밀 조직 ‘막내클럽’이
  이번에는 막내들의 실수를 깨끗하게 지워주는 실수 세탁소로
  돌아왔습니다. 이곳에서 모든 나만의 아찔한 실수를 은밀하게 세탁하고
  당당한 막내로 다시 태어나보세요!`,
  };

  return (
    <>
      <StyledDetail>
        <div>
          <div className='imgWrapper'>
            <img src={logo} />
          </div>
          <div className='contentWrapper'>
            <div>
              <h1>{data.title}</h1>
              <div className='tagsAndBtnsWrapper'>
                <div className='tagsWrapper'>
                  {data.tags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                  ))}
                </div>
                <div className='btnsWrapper'>
                  <div className='btns'>
                    <FaRegHeart />
                    <div>{data.likes}</div>
                  </div>
                  <div className='btns'>
                    <FaRegBookmark />
                  </div>
                </div>
              </div>
              <div className='date'>{data.date}</div>
              <div className='infosAndSubWrapper'>
                <div className='infosWrapper'>
                  <div>
                    <div>
                      <IoIosPin />
                    </div>
                    <div>{data.location}</div>
                  </div>
                  <div>
                    <div>
                      <AiOutlineDollarCircle />
                    </div>
                    <div>{data.price}</div>
                  </div>
                  <div>
                    <div>
                      <IoIosGlobe />
                    </div>
                    <div>{data.sns}</div>
                  </div>
                </div>
                <p>{data.subscribe}</p>
              </div>
            </div>
            <div className='map'></div>
          </div>
        </div>
      </StyledDetail>
    </>
  );
}

const StyledDetail = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3em;
  box-sizing: border-box;
  & > div {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px lightgray;
    border-radius: 20px;
    display: flex;
    padding: 2em;
    gap: 2em;
    box-sizing: border-box;
  }
  .imgWrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .contentWrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > div:first-child {
      height: 60%;
      padding: 2em 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: contain;
    /* box-shadow: 0 0 10px black; */
    background-color: #eee;
  }
  h1 {
    font-size: 1.5em;
    font-weight: bold;
    word-break: keep-all;
  }
  .date {
    color: gray;
  }
  .tagsAndBtnsWrapper {
    height: 2em;
    display: flex;
    justify-content: space-between;
    .tagsWrapper {
      display: flex;
      & > div {
        width: 50px;
        margin-right: 10px;
        box-shadow: 0 0 5px lightgray;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eb5a43;
        color: white;
      }
    }
    .btnsWrapper {
      display: flex;
      width: 15%;
      gap: 10px;
      justify-content: flex-end;
      .btns > div {
        width: 100%;
        font-size: 10px;
        text-align: center;
      }
      .btns > svg {
        width: 100%;
        height: 60%;
      }
    }
  }
  .infosAndSubWrapper {
    height: 50%;
    display: flex;
    gap: 0 20px;

    .infosWrapper {
      width: 50%;
      height: 100%;
      padding: 1em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      word-break: keep-all;
      box-sizing: border-box;
      background-color: #eee;
      border-radius: 10px;
      & > div {
        display: flex;
        align-items: center;
        div:first-child,
        svg {
          margin-right: 10px;
          width: 30px;
          height: 30px;
        }
      }
    }

    p {
      width: 50%;
      height: 100%;
      padding: 1em;
      border: 2px solid black;
      border-radius: 10px;
      overflow: auto;
      word-break: keep-all;
      display: flex;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .map {
    height: 40%;
    background-color: lightgreen;
    border-radius: 10px;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    height: auto;
    padding: 0;
    & > div:first-child {
      width: 100%;
      flex-direction: column;
      padding: 0;
    }
    .imgWrapper {
      width: 100%;
      padding: 0;
      img {
        border-radius: 0;
      }
    }
    .contentWrapper {
      width: 100%;
      padding: 0;
      & > div:first-child {
        padding-top: 0;
      }
    }
    h1,
    .tagsAndBtnsWrapper,
    .date {
      padding: 10px 20px;
    }
    .infosAndSubWrapper {
      flex-direction: column;
      .infosWrapper {
        width: 100%;
        gap: 20px;
        margin: 1em 0;
        border-radius: 0;
      }
      p {
        width: 100%;
        border-radius: 0;
        border-left: none;
        border-right: none;
        margin-top: 1em;
      }
    }
    .map {
      height: 30vh;
      border-radius: 0;
      margin-bottom: 2em;
    }
  }
`;
