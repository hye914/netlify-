import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";
import {
  Container, Table, Thead, Tbody, Tr, Th, Td
} from "./style";  
import SearchBar from "../../component/common/SearchBar";
import instance from "../../axios/instance";
import { UserContext } from '../../component/user/UserContext';

const ApiDetailPage = () => {
  const { user } = useContext(UserContext); 
  const userId = user ? user.user_id : null;

  const { apiId } = useParams();
  console.log("apiId:", apiId);
  const [apiDetail, setApiDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([]);

  const toggleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    const requestOptions = {
      method: newIsLiked ? 'POST' : 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
      data: JSON.stringify({ user_id: userId, api_id: parseInt(apiId) })
    };

    instance(`/api/like`, requestOptions)
      .then(response => {
        console.log("Like status changed:", response.data);
      })
      .catch(error => {
        console.error("Error updating like status:", error);
      });
  };

  const handleGoButtonClick = () => {
    window.location.href = apiDetail.base_url;
  };

  useEffect(() => {
    if (!apiId) {
      console.error("apiId is not defined");
      return;
    }

    // Fetch API details
    instance.get(`/api/data?api_id=${apiId}`, {
      headers: { Accept: "application/json" }
    })
      .then(response => {
        setApiDetail(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching API details:", error);
        setApiDetail(null);
      });

    // Fetch like list
    if (userId) {
      instance.get(`/api/like/list?user_id=${userId}`, {
        headers: { Accept: "application/json" }
      })
        .then(response => {
          const likedApi = response.data.result.find(item => item.api_id === parseInt(apiId));
          if (likedApi) {
            setIsLiked(true);
          }
        })
        .catch(error => {
          console.error("Error fetching like list:", error);
        });
    }

    // Fetch questions
    instance.get(`/api/forums?type=question&api_id=${apiId}`, {
      headers: { Accept: "application/json" }
    })
      .then(response => {
        const questionTitles = response.data.result.slice(0, 3).map(question => question.title);
        setQuestions(questionTitles);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
      });
  }, [apiId, userId]);

  const handleEndpointClick = (endpoint) => {
    setSelected(endpoint);
  };

  const renderTable = (data, includeRequired = false) => (
    <Table>
      <Thead>
        <Tr>
          <Th>변수 이름</Th>
          <Th>설명</Th>
          {includeRequired && <Th>필수 여부</Th>}
          <Th>타입</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.sort((a, b) => includeRequired ? b.required - a.required : 0)
          .map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
              {includeRequired && (
                <Td>
                  <S.RequiredTag required={item.required}>
                    {item.required ? "필수" : "선택"}
                  </S.RequiredTag>
                </Td>
              )}
              <Td>
                <S.StatusTag {...S.getStatusColor('type', item.type || "null")}>
                  {item.type || "null"}
                </S.StatusTag>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );

  if (!apiDetail) {
    return <div>Loading...</div>;
  }

  return (
    <S.Container>
      <SearchBar />
      <S.AboutApi>
        <S.ColDiv>
          <S.Favicon src={apiDetail.favicon || "/img/default_api.png"} alt="API Favicon" />
          <p>API 등록자 : {apiDetail.user_id}</p>
          <p>#{apiDetail.pricepolicy} <br/><br/> #{apiDetail.category}</p>
        </S.ColDiv>
        <S.ColDiv>
          <S.Example isProvided={apiDetail.example_code_provided === 1}>
            {apiDetail.example_code_provided === 1 ? "예시코드 제공" : "예시코드 미제공"}
          </S.Example>
          <h2>{apiDetail.name}</h2>
          <p>{apiDetail.description}</p>
        </S.ColDiv>
        <S.ColDiv>
          <S.HeartButton onClick={toggleLike} isLiked={isLiked}>
            {isLiked ? "❤️" : "🤍"}
          </S.HeartButton>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {apiDetail.view} Views
          </p>
          <S.GoButton onClick={handleGoButtonClick}>URL 이동</S.GoButton>
        </S.ColDiv>
      </S.AboutApi>
      <S.InfoContainer>
        <S.Endpoint>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
              <S.P>ENDPOINT 목록</S.P>
              {apiDetail.endpoints.map((endpoint, index) => (
                <S.EndpointBox key={index} onClick={() => handleEndpointClick(endpoint)}>
                  <S.Method>{endpoint.method}</S.Method>
                  <p>{endpoint.endpoint}</p>
                </S.EndpointBox>
              ))}
            </div>
            {selected && (
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                <S.P>클릭한 ENDPOINT에 대한 설명</S.P>
                <S.Description>{selected.description}</S.Description>
              </div>
            )}
          </div>
          <p style={{color:`black`,fontWeight:`400`, fontSize:`15px`, marginTop:`20px`}}>※ 궁금한 endpoint를 클릭하세요</p>
          {selected && (
            <>
              <S.P>REQUEST변수</S.P>
              {renderTable(selected.requests, true)}
              <S.P>RESPONSE 변수</S.P>
              {renderTable(selected.responses)}
            </>
          )}

          <S.P>해당 API에 달린 질문들 </S.P>
          {questions.length > 0 ? (
            <ul>
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          ) : (
            <p>해당 API와 관련된 질문이 없습니다.</p>
          )}
        </S.Endpoint>
      </S.InfoContainer>
    </S.Container>
  );
};

export default ApiDetailPage;
