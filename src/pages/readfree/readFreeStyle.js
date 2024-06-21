import styled, { css } from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;

export const MainContentWrapper = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(245, 245, 251);
`;

export const MainContent = styled.div`
  width: 80%;
  padding: 20px;
  background-color: rgb(245, 245, 251 );
  margin-left:auto;
  margin-right:auto;
`;

export const PostContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const PostTitleBox = styled.div`
  background-color: #8A94FF;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  h2 {
    flex-grow: 1;
    margin: 0;
    padding-left: 10px;
  }
`;

export const PostMetaBox = styled.div`
  background-color: #F0F4FF;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostContentBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #8A94FF;
  height: 300px;
`;

export const PostActions = styled.div`
  margin-top: 20px;

  button {
    padding: 8px 12px;
    margin-right: 10px;
    background-color: #5060FF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    background-color: #4050D4;
  }
`;

export const CommentsSection = styled.div`
  margin-top: 20px;
`;

export const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    margin: 0;
  }

  button {
    padding: 8px 12px;
    background-color: #5060FF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #4050D4;
    }
  }
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  textarea {
    width: calc(100% - 10px);
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #8A94FF;
    border-radius: 4px;
    height: 80px;
    background-color: #ffffff;
  }

  button {
    width: 5%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 8px 12px;
    background-color: #5060FF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #4050D4;
    }
  }
`;

export const CommentItem = styled.div`
  padding: 15px;
  border: 1px solid #8A94FF;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;

  ${(props) => props.isAuthor && css`
    border: 2px solid #5060FF;
  `}
`;

export const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  span:first-child {
    ${(props) => props.isAuthor && css`
      color: #5060FF;
      font-weight: bold;
    `}
  }
`;

export const CommentActions = styled.div`
  margin-top: 10px;

  button {
    padding: 8px 12px;
    margin-right: 10px;
    background-color: #5060FF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background-color: #4050D4;
    }
  }
`;

export const Pagination = styled.div`
  width: 80%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const PaginationButton = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin: 0 2px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#5060FF' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};

  &:hover {
    background-color: #4050d4;
    color: white;
  }
`;

export const Container = styled.div`
  background-color: rgb(245, 245, 251);
  width: 84vw;
  min-height: 100vh;
`;