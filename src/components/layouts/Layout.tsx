import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Outlet />
      <div
        style={{
          height: "300vh",
          backgroundColor: "lightgray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "100px",
        }}
      >
        test scroll
      </div>
      <Footer />
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
