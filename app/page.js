"use client";

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { LoadingSpinner } from "@/components/loading-spinner";
import SubscriptionModal from "@/components/modals/subscription";
import WelcomePage from "@/components/welcomePage";
import { change } from "@/lib/redux/actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user");
      setUser(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleClick = async (id) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sid", id);
      dispatch(change(localStorage.getItem("sid")));
    }
    router.push(`/subscription`);
  };

  return (
    <div className="h-[calc(100vh-60px)]">
      {user?.email ? (
        <>
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSpinner className="w-8 h-8" />
            </div>
          ) : (
            <div className="flex flex-col p-6 gap-3">
              <h1 className="text-3xl font-semibold underline">
                Hello {user?.name},
              </h1>
              <div className="w-full flex items-end justify-between">
                <p className="text-md font-semibold">Your Subscriptions</p>
                <SubscriptionModal type="new" loadUser={loadUser} />
              </div>
              <Separator />
              <div className="flex flex-wrap gap-3 w-full p-2 justify-center md:justify-start">
                {user?.subscriptions?.length > 0 ? (
                  user?.subscriptions.map((s, i) => (
                    <div key={i} className="flex flex-col gap-3 mb-4">
                      <div
                        className="cursor-pointer border-2 rounded-md flex flex-col gap-2 items-start shadow-md px-6 py-4 hover:bg-gray-100 transition-all"
                        onClick={() => handleClick(s._id)}
                      >
                        <p className="text-sm font-semibold">
                          Name: {s.subscriptionName}
                        </p>
                        <p className="text-sm text-gray-400">
                          Id: {s.subscriptionId}
                        </p>
                        <p className="text-sm text-gray-400">
                          Total Resources: {s.resources.length}
                        </p>
                      </div>
                      <div className="flex w-full gap-2 items-center justify-between">
                        <SubscriptionModal
                          type="edit"
                          loadUser={loadUser}
                          totalResources={s.resources.length}
                          id={s?._id}
                        />
                        <SubscriptionModal
                          type="delete"
                          loadUser={loadUser}
                          id={s?._id}
                          totalResources={s.resources.length}
                          name={s?.subscriptionName}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-semibold text-gray-500">
                    You currently do not have any subscription. Create to start
                    working.
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <WelcomePage />
      )}
    </div>
  );
}
