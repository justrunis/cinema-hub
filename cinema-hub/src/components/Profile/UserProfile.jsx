import { dateFormating, formatDate } from "../../utils/formatting";

export default function UserProfile({ user }) {
  return (
    <div className="bg-base-300 rounded-lg shadow-md p-4 w-full text-primary">
      <p className="text-3xl font-bold">{user.username}</p>
      <p className="text-lg font-light">Email: {user.email}</p>
      <p className="text-lg font-light">Role: {user.role}</p>
      <p className="text-lg font-light">
        Member since {formatDate(user.creationDate)}
      </p>
    </div>
  );
}
