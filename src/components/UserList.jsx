import React, { useEffect, useState } from "react";
import useFetch from "../custom-hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import UserCard from "./UserCard";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useFetch(
    `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/10`
  );

  useEffect(() => {
    console.log(data?.data?.list);
    setUsers((prevUsers) => {
      if (data?.data?.list) {
        return [...prevUsers, ...data.data.list];
      }
      return prevUsers;
    });
    console.log(users);
  }, [data]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={users?.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<p>Loading...</p>}
      style={{ overflow: "hidden" }}
    >
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {users?.map((user, index) => {
        return (
          <UserCard key={index} user={user}/>
        )
      })}
      </div>
      {error && <p>Error: {error}</p>}
    </InfiniteScroll>
  );
}
