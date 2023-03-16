import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../custom-hooks/useFetch";

export default function FriendCard({ friend }) {
  return (
    <Link to={`/users/${friend.id}`}>
      <div 
      onClick={() => window.location.reload()}
      className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={friend.imageUrl} alt="Card Image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{`${friend.prefix} ${friend.name} ${friend.lastName}`}</div>
          <p className="text-gray-700 text-base">{friend.title}</p>
        </div>
      </div>
    </Link>
  );
}
