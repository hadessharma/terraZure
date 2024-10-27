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
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";

const formSchema = z.object({
  subscriptionName: z.string().min(2, "Name is required"),
  subscriptionId: z.string().min(2, "Subscription ID is required"),
  tenantId: z.string().min(2, "Tenant ID is required"),
  clientId: z.string().min(2, "Client ID is required"),
  clientSecret: z.string().min(2, "Client Secret is required"),
});

export default function EditSubscriptionForm({ loadUser, id }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriptionName: "",
      subscriptionId: "",
      tenantId: "",
      clientId: "",
      clientSecret: "",
    },
  });

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/subscription/${id}`);
      form.setValue("subscriptionName", res.data.data.subscriptionName);
      form.setValue("subscriptionId", res.data.data.subscriptionId);
      form.setValue("tenantId", res.data.data.tenantId);
      form.setValue("clientId", res.data.data.clientId);
      form.setValue("clientSecret", res.data.data.clientSecret);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      await axios.patch(`/api/subscription/${id}`, values);
      toast({
        description: "Subscription updated successfully.",
      });
      form.reset();
      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="subscriptionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="Enter your subscription name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subscriptionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Id</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="Enter the subscription Id"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tenantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant Id</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="Enter the tenant Id"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Id</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="Enter the client Id"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Secret</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="Enter the client secret"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button className="mt-3" disabled={loading}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
