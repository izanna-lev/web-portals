/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NAVIGATE } from "../../constants";

import "./index.scss";
import { useEffect } from "react";
import { SET_NAVIGATION } from "../../store/slices/navigation";
import { UserIcon } from "../../components/UserIcon";

const ProfilePage = () => {
  const profileData = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SET_NAVIGATION({ value: NAVIGATE.PROFILE }));
  }, [dispatch]);

  return (
    <main className="content-container" id="profilePage">
      <section className="content-top">
        <h2 className="content-heading">Profile</h2>
      </section>

      <section className="profile">
        <UserIcon image={profileData.image} width={"10rem"} height={"10rem"} />
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
