import { Avatar } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "../../components/Form/ProfileForm";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className="container py-10">
      <h3 className="uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide">
        My profile
      </h3>
      <div className="flex justify-center pb-10">
        <div className="w-full md:w-2/3 lg:w-3/5 xl:w-2/5 2xl:w-1/3 px-0 sm:px-10 md:px-0 flex flex-col items-center">
          <Avatar src={user.avatar} size={120} />
          {!isEdit ? (
            <>
              <p className="mt-5 mb-4 text-3xl font-semibold">{user.name}</p>
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
                className="w-full px-5 py-2.5 rounded-lg bg-gray-500 text-white text-lg font-medium focus:outline-none focus:ring-4 transition duration-300"
              >
                Edit Profile
              </button>
              <div className="w-full text-xl font-semibold">
                <p className="mt-5 mb-4">
                  ID: <span className="font-normal">{user.id}</span>
                </p>
                <p className="my-4">
                  Email:{" "}
                  <span className="font-normal break-all">{user.email}</span>
                </p>
                <p className="my-4">
                  Password:{" "}
                  <span className="text-gray-400 font-normal">
                    [Hidden for security reasons]
                  </span>
                </p>
                <p className="my-4">
                  Phone number:{" "}
                  <span className="font-normal break-all">
                    {user.phoneNumber}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div className="w-full">
              <ProfileForm user={user} setIsEdit={setIsEdit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
