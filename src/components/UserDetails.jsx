import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../custom-hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import FriendCard from "./FriendCard";

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(id);
  const [friends, setFriends] = useState([]);
  const [friendPage, setFriendPage] = useState(1);
  const [details, setDetails] = useState(null);

  const { data, error, isLoading } = useFetch(
    `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${user}/friends/${friendPage}/10/`
  );

  useEffect(() => {
    console.log(data?.data?.list);
    setFriends((prevFrinends) => {
      if (data?.data?.list) {
        return [...prevFrinends, ...data.data.list];
      }
      return prevFrinends;
    });
    console.log(friends);
  }, [data]);

  const fetchMoreData = () => {
    setFriendPage((prevPage) => prevPage + 1);
  };

  const {
    data: singleData,
    isLoading: singleIsLoading,
    error: singleError,
  } = useFetch(
    `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${user}`
  );

  useEffect(() => {
    console.log(singleData?.data);
    setDetails(singleData?.data);
  }, [singleData]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex flex-row flex-wrap gap-[50px]">
        <div className="w-64 h-64">
          <img
            className="object-cover w-full h-full"
            src={details?.imageUrl}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-start border-2 border-black px-2 relative pr-[300px]">
          <legend className="absolute left-2 -top-8 text-xl">Info</legend>
          <p className="font-medium text-lg">{`${details?.prefix} ${details?.name} ${details?.lastName}`}</p>
          <p className="text-gray-500">{details?.title}</p>
          <p className="mt-4">{`Email - ${details?.email}`}</p>
          <p>{`IP Address - ${details?.ip}`}</p>
          <p>{`Job Area - ${details?.jobArea}`}</p>
          <p>{`Job Type - ${details?.jobType}`}</p>
        </div>
        <div className="flex flex-col justify-center border-2 border-black p-1 px-5 relative">
          <legend className="absolute left-2 -top-8 text-xl">Adress</legend>{" "}
          <p>{`${details?.company?.name} ${details?.company?.suffix}`}</p>
          <p className="text-gray-500">{details?.title}</p>
          <p className="mt-4">{`City - ${details?.address?.city}`}</p>
          <p>{`Country - ${details?.address?.country}`}</p>
          <p>{`State - ${details?.address?.state}`}</p>
          <p>{`Street Address - ${details?.address?.streetAdress}`}</p>
          <p>{`ZIP Code: - ${details?.address?.zipCode}`}</p>
        </div>
      </div>

      <h1 className="font-bold text-3xl my-5 mt-12">Friends</h1>
      <InfiniteScroll
        dataLength={friends?.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<p>Loading...</p>}
        style={{ overflow: "hidden" }}
      >
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {friends?.map((friend, index) => {
            return <FriendCard key={index} friend={friend} />;
          })}
        </div>
        {error && <p>Error: {error}</p>}
      </InfiniteScroll>
    </div>
  );
}
