/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../store/hooks";
import { IMAGE } from "../../constants";

import "./index.scss";

const ProfilePage = () => {
  const profileData = useAppSelector((state) => state.profile.data);

  return (
    <main className="content-container" id="profilePage">
      <section className="content-top">
        <h2 className="content-heading">Profile</h2>
      </section>

      <section className="profile">
        <img
          className="profile-image"
          src={IMAGE.AVERAGE + profileData.picture}
          alt={profileData.name}
        />
        <div className="profile-details">
          <h4 className="profile-name">{profileData.name}</h4>
          <a href={`mailto:${profileData.email}`} className="profile-text">
            {profileData.email}
          </a>
          <a href={`tel:${profileData.phoneNumber}`} className="profile-text">
            {profileData.phoneNumber}
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
