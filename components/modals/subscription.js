import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideEdit, Plus, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import NewSubscriptionForm from "../forms/new-subscription";
import EditSubscriptionForm from "../forms/edit-subscription";
import DeleteSubscription from "../forms/delete-subscription";

export default function SubscriptionModal({
  type,
  loadUser,
  id,
  name,
  totalResources,
}) {
  return (
    <Dialog>
      <DialogTrigger>
        {type === "new" && (
          <div className="flex items-center justify-center gap-1 shadow-md bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 py-2 px-3 rounded-md text-sm">
            Add New <Plus size={16} />
          </div>
        )}
        {totalResources == 0 && type === "edit" && (
          <div className="cursor-pointer gap-2 rounded-md shadow-md border-2 p-3 flex items-center justify-center hover:bg-gray-100 transition-all">
            <LucideEdit size={18} color="green" />
            <p className="text-sm text-gray-400 font-semibold">Edit</p>
          </div>
        )}
        {totalResources > 0 && type === "edit" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled
                  className="gap-2 rounded-md p-3 flex items-center justify-center bg-gray-200 cursor-not-allowed"
                >
                  <LucideEdit size={18} color="green" />
                  <p className="text-sm text-gray-400 font-semibold">Edit</p>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px]">
                <p className="text-gray-400">
                  Delete all resources within subscription, to edit this.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {totalResources == 0 && type === "delete" && (
          <div className="cursor-pointer gap-2 rounded-md shadow-md border-2 p-3 flex items-center justify-center hover:bg-gray-100 transition-all">
            <Trash2 size={18} color="red" />
            <p className="text-sm text-gray-400 font-semibold">Delete</p>
          </div>
        )}
        {totalResources > 0 && type === "delete" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled
                  className="gap-2 rounded-md p-3 flex items-center justify-center bg-gray-200 cursor-not-allowed"
                >
                  <Trash2 size={18} color="red" />
                  <p className="text-sm text-gray-400 font-semibold">Delete</p>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px]">
                <p className="text-gray-400">
                  Delete all resources within subscription, to delete this.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "new" && "Add New Subscription"}
            {type === "edit" && "Edit Subscription"}
            {type === "delete" && "Delete Subscription"}
          </DialogTitle>
          <DialogDescription>
            {type === "new" &&
              "A logical container used to provision related business or technical resources in Azure."}
            {type === "edit" &&
              "Please enter correct details to successfully create the resources."}
            {type === "delete" &&
              `Are you sure you want to delete the subscription "${name}" ?`}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {type === "new" && <NewSubscriptionForm loadUser={loadUser} />}
        {type === "edit" && (
          <EditSubscriptionForm loadUser={loadUser} id={id} />
        )}
        {type === "delete" && (
          <DeleteSubscription loadUser={loadUser} id={id} name={name} />
        )}
      </DialogContent>
    </Dialog>
  );
}
