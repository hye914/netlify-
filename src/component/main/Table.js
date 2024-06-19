import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      
      try {
        const response = await axios.get(url);
        setData(response.data.result);
        console.log("Fetched data:", response.data.result);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        console.log(error.response);

        let errorMessage = "서버에서 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.";

        if (error.response) {
          // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
          errorMessage += ` (HTTP ${error.response.status}: ${error.response.statusText})`;
        } else if (error.request) {
          // 요청이 만들어졌지만 응답을 받지 못한 경우
          errorMessage += " (서버에서 응답이 없습니다.)";
        } else {
          // 요청을 설정하는 중에 오류가 발생한 경우
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
              <Td>{item.likes}</Td>
              <Td>{item.pricepolicy}</Td>
            </tr>
          ))
        ) : (
          <tr>
            <Td colSpan="4">데이터가 없습니다</Td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
};

export default Table;


