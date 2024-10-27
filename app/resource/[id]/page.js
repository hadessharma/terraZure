"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import camelCaseToCapitalizeWithSpace from "@/lib/camelCaseToCapital";
import returnDetails from "@/lib/returnDetails";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Resource({ params }) {
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [resource, setResource] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    loadResource();
  }, [id]);

  const loadResource = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/resource/single/${id}`);
      // console.log(res.data.data);
      setResource(res.data.data);
      const response = await axios.get(`/api/file/${res.data.data.name}`);
      console.log(response);
      if (response.data.status === 200) {
        setContent(response.data.content);
      } else {
        throw new Error("Failed to fetch");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] w-full">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:p-4 p-2">
          <h4 className="text-2xl font-bold underline text-center my-4">
            {resource &&
              resource.type &&
              camelCaseToCapitalizeWithSpace(resource.type)}
          </h4>
          <div className="flex justify-evenly gap-3 flex-col">
            <div className="flex flex-col gap-3 ">
              <h4 className="text-xl font-bold underline">Details:</h4>
              <div className="flex flex-col gap-2 shadow-md px-2 md:px-8 py-3 rounded-md border-2">
                <div className="flex gap-2">
                  <p className="font-semibold">Name</p>: <p>{resource?.name}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Subscription</p>:{" "}
                  <p>{resource?.subscriptionId?.subscriptionName}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Subscription ID</p>:{" "}
                  <p>{resource?.subscriptionId?.subscriptionId}</p>
                </div>
                {resource.details && returnDetails(resource.details)}
              </div>
            </div>
            <div className="flex flex-col gap-3 overflow-hidden">
              <h4 className="text-xl font-bold underline">Terraform Code:</h4>
              <div className="shadow-md whitespace-pre-wrap px-2 md:px-8 py-3 rounded-md border-2">
                <pre className="whitespace-pre-wrap ">{content}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
