import React, { useEffect, useState, useContext } from "react"; // Import useContext
import {
  NavBarContainer,
  MenuItem,
  MenuIcon,
  UserProfile,
  UserName,
  UserStatus,
  Logo,
  LogoIcon,
  TitleDochi,
  TitleApis,
  MenuItemContainer,
} from "./Style";
import {
  FaHome,
  FaSearch,
  FaQuestionCircle,
  FaInfoCircle,
  FaUserCircle,
} from "react-icons/fa";
import { redirect, useNavigate } from "react-router-dom";
import { UserContext } from '../../component/user/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user);

  const homeClick = () => {
    navigate("/");
  };

  const resultClick = () => {
    navigate("/allresult");
  };

  const qnaClick = () => {
    navigate("/board");
  };

  const myClick = () => {
    if (user) {
      navigate("/mypage");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const loginClick = () => {
    navigate("/login");
  };

  const logout = async () => {
    try {
      setUser(null); // Clear user data
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <NavBarContainer>
      <Logo>
        <TitleDochi>도치</TitleDochi>
        <TitleApis>APIS</TitleApis>
        <LogoIcon src="/img/dochi.png" alt="Dochi" />
      </Logo>
      <MenuItemContainer>
        <MenuItem onClick={homeClick} style={{ cursor: "pointer" }}>
          <MenuIcon>
            <FaHome />
          </MenuIcon>
          <span>Home</span>
        </MenuItem>
        <MenuItem onClick={resultClick} style={{ cursor: "pointer" }}>
          <MenuIcon>
            <FaSearch />
          </MenuIcon>
          <span>API 전체 조회</span>
        </MenuItem>
        <MenuItem onClick={qnaClick} style={{ cursor: "pointer" }}>
          <MenuIcon>
            <FaQuestionCircle />
          </MenuIcon>
          <span>Q&A</span>
        </MenuItem>
        {user ? (
          <MenuItem onClick={logout}>
            <MenuIcon>
              <FaInfoCircle />
            </MenuIcon>
            <span>로그아웃</span>
          </MenuItem>
        ) : (
          <MenuItem onClick={loginClick}>
            <MenuIcon>
              <FaInfoCircle />
            </MenuIcon>
            <span>로그인</span>
          </MenuItem>
        )}
      </MenuItemContainer>
      <UserProfile>
        <FaUserCircle size={40} />
        {user ? (
          <div onClick={myClick} style={{ cursor: "pointer" }}>
            <UserName>Id :{user.user_id}</UserName>
            <UserStatus>LevelPoint: {user.levelpoint}</UserStatus>
          </div>
        ) : (
          <div onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            <UserName>로그인해주세요</UserName>
          </div>
        )}
      </UserProfile>
    </NavBarContainer>
  );
};

export default NavBar;
