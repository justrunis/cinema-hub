import { dateFormating, formatDate } from "../../utils/formatting";
import { useState } from "react";

export default function UserProfile() {
  const [user] = useState({
    username: "JohnDoe",
    email: "johndoe@hotmail.com",
    role: "Admin",
    creationDate: "2021-09-01",
  });

  return (
    <div className="max-h-100 overflow-y-auto w-full">
      <div className="flex flex-col items-center gap-2 text-primary">
        <p className="text-3xl font-bold">{user.username}</p>
        <img
          src="https://static.thenounproject.com/png/363639-200.png"
          alt="User Avatar"
          className="w-20 h-20 rounded-full"
        />
        <p className="text-lg font-light">Email: {user.email}</p>
        <p className="text-lg font-light">Role: {user.role}</p>
        <p className="text-lg font-light">
          Member since {formatDate(user.creationDate)}
        </p>
      </div>
    </div>
  );
}
