//The name must begin with a letter or number, end with a letter, number or underscore, and may contain only letters, numbers, underscores, periods, or hyphens.

"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading-spinner";
import { extractErrorCode } from "@/lib/extractCodeFromError";
import { setRGLoc } from "@/lib/setRGLoc";

const formSchema = z.object({
  resourceName: z
    .string()
    .min(2, "Name is required")
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9_.-]*[a-zA-Z0-9]$/,
      "Name must begin with a letter or number, end with a letter, number, or underscore, and may contain only letters, numbers, underscores, periods, or hyphens"
    ),
  rgName: z.string().min(2, "Resource Group is required"),
  addSpace: z.string().min(2, "Account Tier is required"),
  dnsServers: z.string().optional(),
});

export default function VirtualNetworkForm({ type, sid }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [rgDetails, setRGDetails] = useState([]);
  const [selectedRG, setSelectedRG] = useState({});
  const [selectedLoc, setSelectedLoc] = useState("");

  useEffect(() => {
    loadRGDetails();
  }, []);

  const loadRGDetails = async () => {
    try {
      setLoading2(true);
      const res = await axios.get(`/api/resource/${sid}/resourceGroup`);
      setRGDetails(res.data.data);
      setSelectedRG(setRGLoc(res.data.data));
      setLoading2(false);
    } catch (err) {
      console.log(err);
      setLoading2(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resourceName: "",
      // location: "",
      rgName: "",
      addSpace: "",
      dnsServers: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    if (values.dnsServers.length > 0) {
      let outputString = values.dnsServers;
      outputString = outputString.split(",").map((ds) => ds.trim());
      outputString = outputString.map((ip) => '"' + ip + '"').join(",");
      outputString = outputString.slice(1, -1);
      values.dnsServers = outputString;
    } else {
      values.dnsServers = [];
      // type = "virtualNetwork2";
    }
    const newValues = {
      ...values,
      type,
      subscriptionId: sid,
      location: selectedLoc,
    };
    try {
      setLoading(true);
      const res = await axios.post("/api/resource", newValues);
      if (res.data.error) {
        const resError = extractErrorCode(`${res.data.error.stderr}`);
        toast({
          variant: "destructive",
          description: resError,
        });
        setLoading(false);
        return;
      }
      setLoading(false);
      toast({ description: res.data.msg });
      form.reset();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return loading2 ? (
    <div className="flex flex-col gap-3 items-center">
      <p>loading...</p>
      <LoadingSpinner />
    </div>
  ) : loading ? (
    <div className="flex flex-col gap-3 items-center">
      <p>Resource creation in progress...</p>
      <LoadingSpinner />
    </div>
  ) : (
    <div className="p-4 border-2 border-gray-200 shadow-md rounded-md w-[40%]">
      <h4 className="text-xl text-center font-bold mb-3 underline">
        Virtual Network
      </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="resourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Virtual Network Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter the resource group name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Group</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedLoc(selectedRG[value]);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Resource Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {rgDetails.map((r) => {
                          return (
                            <SelectItem value={r.name} key={r._id}>
                              {r.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input disabled {...field} value={selectedLoc} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addSpace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Space</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Address Space" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dnsServers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNS Servers (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter DNS Servers(seprated by comma)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button disabled={isLoading}>Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
