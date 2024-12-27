import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import { verifyUser } from "./Store/userSlice";
import LandingPage from "./pages/Landing_Page";
import MainLayout from "./pages/Profile_Page";

import { useSocketConnect } from "./hooks/SocketConnect";
import SocialMain from "./container/SocialMain";
import { connectRooms } from "./event/connectRooms";
import { useSocketRecieveMessage } from "./event/recieveMessage";
import { useSocketMarkAsRead } from "./event/markAsRead";
import { useSocketUserReadReceipts } from "./event/recieveRecipient";
import { useSocketDeleteMessage } from "./event/deleteMessage";
import LoadNotifications from "./hooks/LoadNotifications";
import { useSocketNotifications } from "./event/Notifications";
import { useSocketAcceptFriendRequest } from "./event/AcceptRequest";
import {useSocketGroupChatName} from "./event/ChatGroupName";
import {useSocketGroupChatIcon} from "./event/ChatGroupIcon";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch,isAuthenticated]);
  useSocketConnect();
  connectRooms();
  LoadNotifications();
  useSocketMarkAsRead();
  useSocketRecieveMessage();
  useSocketUserReadReceipts();
  useSocketDeleteMessage();
  useSocketNotifications();
  useSocketAcceptFriendRequest();
  useSocketGroupChatName();
  useSocketGroupChatIcon();
  return (
    <Routes>
      {/* Landing Page */}
      <Route path={url.LandingPage} element={isAuthenticated?<SocialMain />:<LandingPage />} />

      {/* Login Page */}
      <Route path={url.Login} element={<LoginMain />} />

    

      <Route path={url.SocialMain} element={isAuthenticated ? <SocialMain/> : <LoginMain />} />
    </Routes>
  );
};

export default App;
