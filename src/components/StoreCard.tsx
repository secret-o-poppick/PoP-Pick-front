import { formatDate } from "@/utils";
import { StoreTag } from "./Tag";
import styled from "styled-components";
import { Link } from "react-router-dom";

//icons
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MEDIA_LIMIT } from "@/assets/styleVariable";

export default function StoreCard({ storeData }: any) {
  const {
    storeId,
    index,
    title,
    tag,
    adultVerification,
    image,
    startDate,
    endDate,
    location,
    likes,
  } = storeData;
  return (
    <StyledCard key={index}>
      <div className='tags'>
        <StoreTag color={"popup"} title={tag} />
        {adultVerification && <StoreTag color='adult' title='성인' />}
      </div>

      <Link className='imgLink' to={`/stores/${storeId}`}>
        <img src={image} />
      </Link>

      <div className='contents'>
        <Link to={`/stores/${storeId}`}>
          <h3>{title}</h3>
        </Link>
        <p>
          {startDate} ~ {endDate}
        </p>
        <p>{location}</p>
        <div className='btnsWrapper'>
          <div className='btns'>
            <FaRegHeart />
            <div>{likes}</div>
          </div>
          <div className='btns'>
            <FaRegBookmark />
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .tags {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    gap: 10px;
  }
  .imgLink {
    width: 100%;
    height: 100%;
    height: 60%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  .contents {
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: 10px;
    a {
      color: black;
    }
    h3,
    p {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .btnsWrapper {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    .btns {
      display: flex;
      flex-direction: column;
      svg {
        width: 16px;
        height: 16px;
      }
      div {
        width: 100%;
        font-size: 10px;
        text-align: center;
      }
    }
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    display: flex;
    flex-direction: row;
    align-items: normal;
    gap: 1em;
    .tags {
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }
    img {
      width: 50%;
      height: 100%;
    }

    .contents {
      height: 100%;
      width: 50%;
      padding-top: 35px;
    }
  }
`;
