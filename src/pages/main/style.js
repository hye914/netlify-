/*메인 페이지 style임*/

import styled from "styled-components";

export const MainWrapper = styled.div`
  background-color: rgb(245, 245, 251);
  width: 84vw;
`;

export const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostBoardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const TableWrapper = styled.div`
  display: flex;

  width: 80%;
  justify-content: space-between;
  margin-top: 10px;
`;

export const PWrapper = styled.div`
  display: flex;
  margin-left:130px;
  width: 83%;
  justify-content: space-between;
  margin-top: 10px;
`;

export const TableWrapper2 = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  justify-content: space-between;
  margin-top: 70px;
  padding-bottom: 100px;
`;

export const Rdiv = styled.div`
  display: flex;
  & > :first-child {
    margin-left: 140px;
    width:560px;
  }

  & > :last-child {
    margin-left: 60px;
    width:560px;

  }
`;

export const PP = styled.p`
 font-weight: 700;
 font-size: 20px;
 color:#5061ff;
`;