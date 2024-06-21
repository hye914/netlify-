import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axios/instance.js";
import { StyledTable, Th, Td, TdFavi } from "./Style";

const Table = ({ url, row }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const defaultFavicon = "/img/hedgehog.png"; 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log("Request URL:", url); 
      console.log(instance); 
      try {
        const response = await instance.get(url, {
          withCredentials: true
        });
        setData(response.data.result);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        console.log(error.response);

        let errorMessage = "서버에서 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.";

        if (error.response) {
          errorMessage += ` (HTTP ${error.response.status}: ${error.response.statusText})`;
        } else if (error.request) {
          errorMessage += " (서버에서 응답이 없습니다.)";
        } else {
          errorMessage += ` (요청 오류: ${error.message})`;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <pre>{error.toString()}</pre>
      </div>
    );
  }

  const handleRowClick = (id) => {
    navigate(`/api-details/${id}`);
  };

  const getRowValue = (item) => {
    switch (row) {
      case "좋아요 수":
        return item.likes;
      case "조회 수":
        return item.views;
      default:
        return null;
    }
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <Th>제공처</Th>
          <Th>API 이름</Th>
          <Th>카테고리</Th>
          <Th>{row}</Th>
          <Th>가격 정책</Th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.api_id} onClick={() => handleRowClick(item.api_id)}>
              <TdFavi
                src={item.favicon || defaultFavicon}
                alt={`${item.name} favicon`}
              />
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{getRowValue(item)}</Td>
              <Td>{item.pricepolicy}</Td>
            </tr>
          ))
        ) : (
          <tr>
            <Td colSpan="5">데이터가 없습니다</Td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
};

export default Table;
