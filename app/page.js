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
    <div className="min-h-[calc(100vh-60px)] bg-muted/20 p-8">
      {user?.email ? (
        <>
          {loading ? (
            <div className="flex h-full w-full items-center justify-center min-h-[500px]">
              <LoadingSpinner className="w-10 h-10 text-primary" />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Welcome back, {user?.name?.split(" ")[0]}!
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your cloud infrastructure and deployments.
                  </p>
                </div>
                <SubscriptionModal type="new" loadUser={loadUser} />
              </div>

              <Separator className="bg-border" />

              {/* Subscriptions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user?.subscriptions?.length > 0 ? (
                  user?.subscriptions.map((s, i) => (
                    <div
                      key={i}
                      className="group relative bg-card text-card-foreground border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                    >
                      {/* Card Header & Content */}
                      <div
                        className="p-6 cursor-pointer flex-1"
                        onClick={() => handleClick(s._id)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {/* Initials Icon */}
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                              {s.subscriptionName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg leading-none tracking-tight group-hover:text-primary transition-colors">
                                {s.subscriptionName}
                              </h3>
                              {s.isDemo ? (
                                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">Demo Mode</span>
                              ) : (
                                <span className="text-[10px] uppercase font-bold tracking-wider text-green-600 bg-green-600/10 px-2 py-0.5 rounded-full mt-1 inline-block">Active</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subscription ID:</span>
                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground/80 truncate max-w-[120px]" title={s.subscriptionId}>
                              {s.subscriptionId}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Resources:</span>
                            <span className="font-medium">{s.resources.length}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-end gap-2">
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
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-muted rounded-xl bg-muted/5">
                    <div className="bg-background p-4 rounded-full shadow-sm mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.117 48.117 0 0 0-3.424-.387m-4.522-.174a48.344 48.344 0 0 0-3.478-.397m-12 .562c.79-.015 1.534-.049 2.268-.103a11.015 11.015 0 0 1 2.218-4.73l.89-.959a1.125 1.125 0 0 1 1.587-.042l1.65 1.485a.75.75 0 0 0 1.033.023l1.84-1.65a1.125 1.125 0 0 1 1.591-.004l1.522 1.458a.75.75 0 0 0 1.05.029l1.625-1.572A1.125 1.125 0 0 1 22.014 4.1h2.238a11.013 11.013 0 0 1 2.222 4.734c.732.053 1.474.088 2.263.102m-19.5 0a2.18 2.18 0 0 0-.75 1.661v3.788c0 1.12.795 2.071 1.884 2.21a48.11 48.11 0 0 0 3.16.27" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">No Subscriptions Found</h3>
                    <p className="text-muted-foreground max-w-sm mt-1 mb-6">
                      Get started by creating your first Azure subscription to manage resources.
                    </p>
                    <SubscriptionModal type="new" loadUser={loadUser} />
                  </div>
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
