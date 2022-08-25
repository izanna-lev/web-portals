/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */


import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IMAGE_PREFIXES } from "../../constants";
import { useEffect } from "react";
import "./index.scss";

const ProfilePage = () => {
  const profileData = useAppSelector((state: {
    profile: {
      data: {
        name: string,
        email: string,
        phoneNumber: string,
        picture: string,
        device: string,
        fcmToken: string,
        _id: string,
      }
    }
  }) => state.profile.data);


  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profileData._id) {
    }
  }, []);
  
  return (
    <section className="profilePage" id="profilePage">
      <div className="dashboard">
        <div className="heading">
          <div className="heading-text">Profile</div>
        </div>
      </div>

      <div className="profile">
        <img className="profile-image" src={IMAGE_PREFIXES.IMAGE_AVERAGE + profileData.picture} alt="signinImage" />
        <div className="profile-details">
          <div className="profile-name">{profileData.name}</div>
          <div className="profile-text">{profileData.email}</div>
          <div className="profile-text">{profileData.phoneNumber}</div>
        </div>
      </div>
    </section>
  );
};


export default ProfilePage;
