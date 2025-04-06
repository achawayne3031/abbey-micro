import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axiosInstance from "../../config/AxiosConfig";
import { ToasterAlert } from "../../utils/ToasterAlert";
import UserItem from "../../components/widget/UserItem";
import { getData, logOut } from "../../utils/LocalStorage";
import { IUser } from "../../interfaces/screens/IUser";
import { useNavigate } from "react-router";
import "../../scss/dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
    getRegisteredUsers();

    const userData = getData();
    setCurrentUserData(userData);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [friendsData, setFriendData] = useState([]);

  const [allRegUserData, setAllRegUserData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState<IUser | any>();
  const [userProfileData, setUserProfileData] = useState<IUser | any>();

  //   const [followersData, setFollowersData] = useState([]);

  const getUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/users/profile");
      setIsLoading(false);
      ToasterAlert(response.data.message, "success");
      setUserProfileData(response.data.data);
      setFollowersData(response.data.data.followers);
      setFollowingData(response.data.data.following);
      setFriendData(response.data.data.friends);
      setPeerData(response.data.data.peer);

      console.log(response.data.data.following, "following......");
      console.log(response.data.data.followers, "follower......");
    } catch (error: any) {
      setIsLoading(false);
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const getRegisteredUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/");
      setAllRegUserData(response.data.data);
    } catch (error: any) {
      setIsLoading(false);
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const logOutUser = () => {
    logOut();
    navigate("/");
  };

  const handleUserClick = async (e: any, type: string) => {
    let url = "";
    let payload: any = {};

    switch (type) {
      case "add-follow":
        payload.userId = e.id.toString();
        url = "/follower/follow-user";
        break;

      case "add-friend":
        payload.userId = e.id.toString();
        url = "/friend/add-friend";

        break;

      case "add-peer":
        payload.peerId = e.id.toString();
        url = "/peer/add-peer";

        break;

      default:
        break;
    }

    try {
      const response = await axiosInstance.post(url, payload);

      if (response.data.statusCode == 200) {
        ToasterAlert(response.data.message, "success");
        getUserProfile();
        getRegisteredUsers();
      }
    } catch (error: any) {
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const handleRemoveUserClick = async (e: any, type: string) => {
    let url = "";
    let payload: any = {};

    switch (type) {
      case "unfollow":
        payload.userId = e.id.toString();
        url = "/follower/unfollow-user";
        break;

      case "unfriend":
        payload.friendId = e.id.toString();
        url = "/friend/unfriend";

        break;

      case "remove-peer":
        payload.peerId = e.id.toString();
        url = "/peer/remove-peer";

        break;

      default:
        break;
    }

    try {
      const response = await axiosInstance.post(url, payload);

      if (response.data.statusCode == 200) {
        ToasterAlert(response.data.message, "success");
        getUserProfile();
        getRegisteredUsers();
      }
    } catch (error: any) {
      ToasterAlert(error.response.data.message, "error");
    }
  };

  return (
    <>
      <Container className="mt-4">
        <div className="profile-icon-wrapper">
          <div className="text-center">
            <AccountCircleIcon fontSize="large" />
          </div>
          <button
            className="btn btn-info logout-btn"
            onClick={() => logOutUser()}
          >
            Logout
          </button>
        </div>

        <div className="profile-text-wrapper">
          <h4>{currentUserData?.full_name}</h4>
          <h4>{currentUserData?.email}</h4>
        </div>

        <Tabs
          defaultActiveKey="registered"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="registered" title="Registered Users List">
            <div className="p-4">
              {allRegUserData
                ? allRegUserData.map((userItem: any) => {
                    return (
                      <UserItem
                        type="all"
                        onClick={(e, type) => {
                          handleUserClick(e, type);
                        }}
                        currentUserData={userItem}
                      />
                    );
                  })
                : ""}
            </div>
          </Tab>

          <Tab eventKey="Following" title="Following">
            <div className="p-4">
              {followingData
                ? followingData.map((userItem: any) => {
                    return (
                      <UserItem
                        type="following"
                        onClick={() => {}}
                        currentUserData={userItem.user}
                      />
                    );
                  })
                : ""}
            </div>
          </Tab>

          <Tab eventKey="Followers" title="Followers">
            <div className="p-4">
              {followersData
                ? followersData.map((userItem: any) => {
                    return (
                      <UserItem
                        type="followers"
                        onClick={(e, type) => {
                          handleRemoveUserClick(e, "unfollow");
                        }}
                        currentUserData={userItem.user}
                      />
                    );
                  })
                : ""}
            </div>
          </Tab>

          <Tab eventKey="Peers" title="Peers">
            <div className="p-4">
              {peerData
                ? peerData.map((userItem: any) => {
                    return (
                      <UserItem
                        type="peers"
                        onClick={(e, type) => {
                          handleRemoveUserClick(e, "remove-peer");
                        }}
                        currentUserData={userItem.peer}
                      />
                    );
                  })
                : ""}
            </div>
          </Tab>

          <Tab eventKey="Friends" title="Friends">
            <div className="p-4">
              {friendsData
                ? friendsData.map((userItem: any) => {
                    return (
                      <UserItem
                        type="friends"
                        onClick={(e, type) => {
                          handleRemoveUserClick(e, "unfriend");
                        }}
                        currentUserData={userItem.friend}
                      />
                    );
                  })
                : ""}
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Dashboard;
