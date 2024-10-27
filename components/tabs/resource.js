"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import camelCaseToCapitalizeWithSpace from "@/lib/camelCaseToCapital";
import { Edit2, Trash2 } from "lucide-react";
import ResourceModal from "../modals/resource";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

export default function ResourceTabs({
  resources,
  loading,
  hasMore,
  loadMore,
}) {
  const resourcesByTypes = {};
  resources.forEach((r) => {
    if (resourcesByTypes.hasOwnProperty(r.type)) {
      resourcesByTypes[r.type].push({ id: r._id, name: r.name });
    } else {
      resourcesByTypes[r.type] = [{ id: r._id, name: r.name }];
    }
  });

  const resourcesArray = Object.keys(resourcesByTypes).map((type) => ({
    type,
  }));
  const l = resourcesArray.length;

  const [infoByType, setInfoByType] = useState([]);

  const fetchResourceByType = async (type) => {
    try {
      const res = await axios.get(`/api/resource/type/${type}`);
      setInfoByType(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex flex-wrap h-auto justify-start">
        <TabsTrigger value="all">All Resources</TabsTrigger>
        {resourcesArray.map((r, i) => (
          <TabsTrigger
            value={r.type}
            key={i}
            className={`md:w-[calc(100vw/${l})]`}
            onClick={() => fetchResourceByType(r.type)}
          >
            {camelCaseToCapitalizeWithSpace(r.type)}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-2 h-[60vh] w-full">
        <TabsContent value="all">
          {resources.map((r) => {
            return (
              <div
                key={r._id}
                className="w-full flex items-center justify-between gap-3"
              >
                <ResourceModal title={r.name} id={r._id} />
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-green-500">
                  <Edit2 size={22} />
                </button>
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-red-500">
                  <Trash2 size={22} />
                </button>
              </div>
            );
          })}
          {hasMore && !loading && (
            <Button
              className="mt-2 mb-6 cursor-pointer text-sm"
              onClick={loadMore}
            >
              Load more
            </Button>
          )}
        </TabsContent>
        {infoByType.map((r, j) => {
          return (
            <TabsContent value={r.type} key={j}>
              <div className="w-full flex items-center justify-between gap-3">
                <ResourceModal title={r.name} id={r._id} />
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-green-500">
                  <Edit2 size={22} />
                </button>
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-red-500">
                  <Trash2 size={22} />
                </button>
              </div>
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}
