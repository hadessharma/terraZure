"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center">
      {loading ? (
        <LoadingSpinner className="h-8 w-8" />
      ) : (
        <div className="h-[40%] w-[60%] shadow-md border-2 rounded-md flex py-4">
          <div className="w-[40%] flex items-center justify-center border-r-2">
            <div className="w-[250px] h-[250px] rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={user?.profilePic}
                alt="NF"
              />
            </div>
          </div>
          <div className="w-[60%] flex flex-col items-start justify-center gap-2 px-4">
            <p className="text-md text-gray-400">Username: {user?.name}</p>
            <p className="text-md text-gray-400">
              Email Address: {user?.email}
            </p>
            <p className="text-md text-gray-400">
              Organization:{" "}
              {user.organization ? user.organization : "Not entered yet."}
            </p>
            <p className="text-md text-gray-400">
              Position: {user.position ? user.position : "Not entered yet."}
            </p>
            <p className="text-md text-gray-400">
              Total Subscriptions: {user?.subscriptions?.length}
            </p>
            <p className="text-md text-gray-400">
              Total Resources: {user?.resources?.length}
            </p>
            <Button
              className="mt-3 w-full font-semibold text-md"
              variant="outline"
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
