import React, { useContext } from "react";
import Banner from "../../component/main/Banner";
import CategoryIcons from "../../component/main/CategoryIcons";
import PostBoard from "../../component/main/PostBoard";
import Table from "../../component/main/Table";
import SearchBar from "../../component/common/SearchBar";
import * as S from "./style";
import PostBoard2 from "../../component/main/PostBoard2";
import { UserContext } from '../../component/user/UserContext';

const MainPage = () => {
  const userContext = useContext(UserContext);

  console.log(userContext.user);

  return (
    <S.MainWrapper>
      <SearchBar />
      <CategoryIcons />
      <S.BannerWrapper>
        <Banner />
      </S.BannerWrapper>
      <S.PWrapper>
        <S.PP>좋아요 수 많은 TOP API</S.PP>
        <S.PP>조회수 수 많은 TOP API</S.PP>
      </S.PWrapper>
      <S.TableWrapper>
        <S.Rdiv>
          <Table
            url="/api/list/top?type=likes"
            row="좋아요 수"
          />
          <Table
            url="/api/list/top?type=views"
            row="조회 수"
          />
        </S.Rdiv>
      </S.TableWrapper>
      <S.TableWrapper2>
        <PostBoard />
        <PostBoard2 />
      </S.TableWrapper2>
    </S.MainWrapper>
  );
};

export default MainPage;
