import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link to={`/users/${user.id}`}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={user.imageUrl} alt="Card Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${user.prefix} ${user.name} ${user.lastName}`}</div>
        <p className="text-gray-700 text-base">{user.title}</p>
      </div>
    </div>
    </Link>
  );
}
