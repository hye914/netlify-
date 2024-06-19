import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StyledTable, Th, Td, TdFavi } from "./Style";

const Table = ({ url, row }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);

        if (Array.isArray(response.data.result)) {
          setData(response.data.result);
          console.log("Fetched data:", response.data.result);
        } else {
          console.error("Unexpected response data format:", response.data);
          setError("Unexpected response data format.");
        }
      } catch (error) {
        if (error.response) {
          // 서버가 상태 코드를 반환했지만 범위가 2xx가 아님
          console.error("서버 응답 오류:", error.response);
          setError(`서버 오류: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          // 요청이 만들어졌으나 응답을 받지 못함
          console.error("응답을 받지 못했습니다:", error.request);
          setError("서버에서 응답을 받지 못했습니다. 네트워크 상태를 확인해 주세요.");
        } else {
          // 요청 설정 중에 오류가 발생
          console.error("요청 오류:", error.message);
          setError(`요청 오류: ${error.message}`);
        }
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
    return <div>데이터를 가져오는 중 오류가 발생했습니다: {error}</div>;
  }

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
