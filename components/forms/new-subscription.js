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
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  subscriptionName: z.string().min(2, "Name is required"),
  subscriptionId: z.string().min(2, "Subscription ID is required"),
  tenantId: z.string().min(2, "Tenant ID is required"),
  clientId: z.string().min(2, "Client ID is required"),
  clientSecret: z.string().min(2, "Client Secret is required"),
});

export default function NewSubscriptionForm({ loadUser }) {
  const router = useRouter();

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

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      await axios.post("/api/subscription", values);
      toast({
        description: "Subscription added successfully.",
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
          <a
            className="text-xs text-red-500"
            target="_blank"
            rel="noreferrer"
            href="https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret"
          >
            Click to know how to get these details.
          </a>
        </div>
        <DialogFooter>
          <Button disabled={loading}>Create</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
