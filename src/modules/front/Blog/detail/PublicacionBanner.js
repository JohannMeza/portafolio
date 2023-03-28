import React from "react";
import styled from "styled-components";

export default function PublicacionBanner({title}) {
  return (
    <Banner className="pb-[4vw] lg:pb-[3vw]">
      <div>
        <h1 className="text-title-2 lg:text-title-1  text-center px-4 text-white font-Poppins font-semibold">
          {title}
        </h1>
      </div>
    </Banner>
  );
}

const Banner = styled.div`
  height: 13vw;
  min-height: 160px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: linear-gradient(
    90deg,
    rgba(136, 1, 111, 0.9) 0%,
    rgba(22, 15, 111, 0.9) 100%
  );
`;
