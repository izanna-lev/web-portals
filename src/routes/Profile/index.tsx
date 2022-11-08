/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UserIcon } from "../../components/UserIcon";
import { FaRegEdit } from "react-icons/fa";
import { Create } from "../../api/Create";
import { API, IMAGE } from "../../constants";
import "./index.scss";
import { useEffect } from "react";
import { setBackground } from "../../util";
import { ICON } from "../../assets/index";

const ProfilePage = () => {
  const profileData = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const updateProfileImage = (e: any) => {
    const selectedImage = e.target.files;
    if (selectedImage[0]) {
      dispatch(
        Create(
          API.UPDATE_PROFILE_IMAGE,
          {},
          true,
          selectedImage[0],
          API.PROFILE
        )
      );
    }
  };

  useEffect(() => {
    setBackground(
      profileData.image
        ? `${IMAGE.AVERAGE}${profileData.image}`
        : ICON.USER_PLACEHOLDER,
      "profile-image-wrapper",
      "cover"
    );
  }, [profileData.image]);

  return (
    <main className="content-container" id="profilePage">
      <section className="content-top">
        <h2 className="content-heading">Profile</h2>
      </section>

      <section className="profile">
        <div className="profile-image-container">
          <div
            className="profile-image-wrapper"
            id="profile-image-wrapper"
          ></div>
          <div className="profile-edit-container">
            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={updateProfileImage}
              hidden
            />
            <label htmlFor="upload" id="profileImage">
              <FaRegEdit className="profile-edit--icon" />
            </label>
          </div>
        </div>
        <div className="profile-details">
          <h4 className="profile-name">{profileData.name}</h4>
          <a href={`mailto:${profileData.email}`} className="profile-text">
            {profileData.email}
          </a>
          <a
            href={`tel:${profileData.phoneCode}${profileData.phoneNumber}`}
            className="profile-text"
          >
            {profileData.phoneCode}
            {`${profileData.phoneCode ? "-" : ""}`}
            {profileData.phoneNumber}
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
