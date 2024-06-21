import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axios/instance.js";

import { Card, Board, Header, BoardContainer } from "./Style";

const PostBoard2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    instance
      .get("/api/forums/top?type=question")
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setError("데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const handleCardClick = (postId) => {
    navigate(`/readQnA/${postId}`);
  };

  return (
    <BoardContainer>
      <Header>Q&A 게시판</Header>
      <Board>
        {data.length > 0 ? (
          data.map((item, index) => (
            <Card key={index} onClick={() => handleCardClick(item.id)}>
              {index + 1}. {item.title}
            </Card>
          ))
        ) : (
          <Card>데이터가 없습니다</Card>
        )}
      </Board>
    </BoardContainer>
  );
};

export default PostBoard2;
