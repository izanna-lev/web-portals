/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../store/hooks";
import { IMAGE_PREFIXES } from "../../constants";

import "./index.scss";

const ProfilePage = () => {
  const profileData = useAppSelector((state) => state.profile.data);

  return (
    <section className="profilePage" id="profilePage">
      <div className="dashboard">
        <div className="heading">
          <div className="heading-text">Profile</div>
        </div>
      </div>

      <div className="profile">
        <img
          className="profile-image"
          src={IMAGE_PREFIXES.IMAGE_AVERAGE + profileData.picture}
          alt="signinImage"
        />
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
