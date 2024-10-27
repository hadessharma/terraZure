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
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  resourceName: z
    .string()
    .min(3, "Name is required")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9-]*$/,
      "Name must only contain alphanumeric characters and dashes, and cannot start with a number"
    ),
  rgName: z.string().min(2, "Resource Group is required"),
  diskEnc: z.boolean().default(false).optional(),
  softDelete: z.coerce
    .number()
    .min(7, "Cannot be less than 7")
    .max(90, "Cannot be more than 90"),
  purgeProtect: z.boolean().default(false).optional(),
  skuName: z.string().min(2, "SKU name is required"),
  rbacAuth: z.boolean().default(false).optional(),
});

export default function KeyVaultForm({ type, sid }) {
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
      rgName: "",
      diskEnc: false,
      softDelete: 7,
      purgeProtect: false,
      skuName: "standard",
      rbacAuth: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    const newValues = {
      ...values,
      type,
      subscriptionId: sid,
      location: selectedLoc,
    };
    // console.log(newValues);
    try {
      setLoading(true);
      const res = await axios.post("/api/resource", newValues);
      console.log("DATA: ", res.data);
      if (res.data.error) {
        const resError = extractErrorCode(`${res.data.error.stderr}`);
        if (resError === "VaultAlreadyExists")
          toast({
            variant: "destructive",
            title: "Key Vault Already Taken",
            description: "Name is already present in Azure.",
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
    <div className="p-4 border-2 border-gray-200 shadow-md rounded-md w-[40%] mt-4">
      <h4 className="text-xl text-center font-bold mb-3 underline">
        Key Vault
      </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="resourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Vault Name</FormLabel>
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
              name="diskEnc"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Disk encryption</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purgeProtect"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Purge Protection</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rbacAuth"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>RBAC Authentication</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skuName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Tier</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="softDelete"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soft Delete retention days</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="number" {...field} />
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
