import { ChangeEvent, FC } from "react";
import { getFirstLetter } from "../../utils/funcHelper";
import "./../../scss/user-item.scss";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";

interface UserItemProps {
  onClick: (e: any, type: string) => void;
  currentUserData: any;
  type: string;
}

const UserItem: FC<UserItemProps> = ({ onClick, currentUserData, type }) => {
  return (
    <>
      <div className="d-flex item-wrapper">
        <div className="flex-fill">
          <div className="logo-wrapper">
            <p className="logo">{getFirstLetter(currentUserData.full_name)}</p>
          </div>
          <div className="name-wrapper">
            <h5>{currentUserData.full_name}</h5>
          </div>

          <div className="time-wrapper">
            <p>{currentUserData.created_at}</p>
          </div>
        </div>

        <div className="btn-wrapper flex-fill">
          {type == "all" ? (
            <>
              <button
                onClick={() => onClick(currentUserData, "add-follow")}
                title="follow user"
                className="btn btn-primary"
              >
                <FavoriteIcon />
              </button>

              <button
                onClick={() => onClick(currentUserData, "add-friend")}
                title="add friend"
                className="btn btn-danger"
              >
                <PersonAddAltIcon />
              </button>

              <button
                onClick={() => onClick(currentUserData, "add-peer")}
                title="add peer"
                className="btn btn-info"
              >
                <GradeIcon />
              </button>
            </>
          ) : (
            <>
              {type == "followers" ? (
                <></>
              ) : (
                <>
                  <button
                    onClick={() => onClick(currentUserData, "remove")}
                    className="btn btn-danger"
                  >
                    <PersonAddDisabledIcon />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserItem;
