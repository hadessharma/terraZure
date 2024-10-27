"use client";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { availableResources } from "@/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Resource() {
  return (
    <div className="flex flex-col p-6 gap-3">
      <p className="font-semibold text-gray-500">
        Select from below resources to create new
      </p>
      <Separator />
      <div className="flex flex-wrap justify-between">
        {availableResources.map((r) => (
          <Card key={r.id} className="w-[19%] relative">
            <CardHeader>
              <CardTitle className="text-center mb-2">{r.name}</CardTitle>
              <CardDescription className="flex items-center justify-center">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-[full] h-[200px] object-cover"
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-500 h-[100px] overflow-hidden">
              {r.description}
            </CardContent>
            <CardFooter className="">
              <Link href={`/resource/new/${r.type}`}>
                <Button>Create</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
