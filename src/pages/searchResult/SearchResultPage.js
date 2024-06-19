import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiCard from "../../component/searchResult/ApiCard";
import DetailedView from "../searchResult/DetailResult";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";

const SearchResultPage = () => {
  const location = useLocation();
  const [selectedApi, setSelectedApi] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 추가
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 추가

  const endpoint = location.state?.endpoint || "/api/list";
  const resultMessage =
    location.state?.resultMessage || "전체 API를 검색한 결과";

  useEffect(() => {
    fetch(`${endpoint}?sort=likes&page=${currentPage}`) // 페이지 번호 추가
      .then((response) => response.json())
      .then((data) => {
        console.log(endpoint);
        console.log(data);
        setApiData(data.result);
        setTotalPages(data.totalPages); // 총 페이지 수 설정
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setApiData([]);
      });
  }, [endpoint, currentPage]); 

  const handleApiClick = (api) => {
    setSelectedApi(api);
  };

  const handleCloseDetailView = () => {
    setSelectedApi(null);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "prev" && prevPage > 1) {
        return prevPage - 1;
      } else if (direction === "next" && prevPage < totalPages) {
        return prevPage + 1;
      } else {
        return prevPage;
      }
    });
  };

  return (
    <>
      <S.DisplayRow>
        <S.PageContainer>
          <SearchBar isDetailActive={selectedApi !== null} />
          <p style={{ fontSize: "20px", marginLeft: "10%" }}>{resultMessage}</p>
          <S.CardGrid>
            {apiData.map((api, index) => (
              <S.CardGridItem key={index} onClick={() => handleApiClick(api)}>
                <ApiCard
                  icon={api.favicon || "/img/default_api.png"}
                  views={api.view}
                  title={api.name}
                  description={api.description}
                />
              </S.CardGridItem>
            ))}
          </S.CardGrid>

          <S.Pagination>
            <S.PaginationItem
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              이전
            </S.PaginationItem>
            <span>{currentPage} / {totalPages}</span>
            <S.PaginationItem
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              다음
            </S.PaginationItem>
          </S.Pagination>
        </S.PageContainer>
        {selectedApi && (
          <DetailedView api={selectedApi} onClose={handleCloseDetailView} />
        )}
      </S.DisplayRow>
    </>
  );
};

export default SearchResultPage;
