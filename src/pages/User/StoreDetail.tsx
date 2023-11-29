import styled from "styled-components";
import { useState } from "react";
// icons
import logo from "@/assets/logo.svg";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

export default function StoreDetail() {
  const title = "도구리 막내클럽 <실수 세탁소>";
  const [tags, setTags] = useState<string[]>(["팝업", "유료"]);
  const likes = "99k";

  return (
    <>
      <StyledDetail>
        <div className='detailWrapper'>
          <div className='contentWrapper'>
            <img src={logo} />
          </div>
          <div className='contentWrapper'>
            <h1>{title}</h1>
            <div className='tagsAndBtnsWrapper'>
              <div className='tagsWrapper'>
                {tags.map((tag) => (
                  <div className='tag'>{tag}</div>
                ))}
              </div>
              <div className='btnsWrapper'>
                <div className='likes'>
                  <FaRegHeart />
                  {likes}
                </div>
                <div className='bookmark'>
                  <FaRegBookmark />
                </div>
              </div>
            </div>
            <div className='date'>date</div>
            <div>
              <div className='map'>map</div>
              <div className='infosWrapper'>
                <div className='info'>서울시 마포구 동교로</div>
                <div className='info'>1인 15,000원</div>
                <div className='info'>서울시 마포구 동교로</div>
              </div>
            </div>
            <p>
              막내들이 행복한 세상을 위해 도구리가 창단한 비밀 조직 ‘막내클럽’이
              이번에는 막내들의 실수를 깨끗하게 지워주는 실수 세탁소로
              돌아왔습니다. 이곳에서 모든 나만의 아찔한 실수를 은밀하게 세탁하고
              당당한 막내로 다시 태어나보세요!
            </p>
          </div>
        </div>
      </StyledDetail>
    </>
  );
}

const StyledDetail = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .detailWrapper {
    width: 90%;
    height: 50%;
    box-shadow: 0 0 10px lightgray;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background-color: gray;
    }
    .contentWrapper {
      width: 50%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      h1 {
        font-size: 1.5em;
      }
    }
  }
  .tagsAndBtnsWrapper {
    display: flex;
    justify-content: space-between;
  }
  .tagsWrapper {
    display: flex;
  }
  .tag {
    margin-right: 10px;
    box-shadow: 0 0 5px lightgray;
    border-radius: 5px;
  }
  .btnsWrapper {
    display: flex;
  }
  .likes {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
