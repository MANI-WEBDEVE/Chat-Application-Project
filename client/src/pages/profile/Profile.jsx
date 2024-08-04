import { useAppStore } from "@/store";

const Profile = () => {
  const { userInfo } = useAppStore()
  return (
    <div>
      <h1>profile</h1>
      <div>Email: {userInfo.id}</div>
    </div>
  );
};

export default Profile;
