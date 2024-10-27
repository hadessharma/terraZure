"use client";

import KeyVaultForm from "@/components/forms/key-vault";
import ResourceGroupForm from "@/components/forms/resource-group";
import StorageAccountForm from "@/components/forms/storage-account";
import VirtualMachineForm from "@/components/forms/virtual-machine";
import VirtualNetworkForm from "@/components/forms/virtual-network";
import { useSelector } from "react-redux";

export default function ({ params }) {
  const { type } = params;
  const sid = useSelector((state) => state.sub.sid);

  const RenderForm = () => {
    if (type === "resourceGroup")
      return <ResourceGroupForm type={type} sid={sid} />;
    else if (type === "storageAccount")
      return <StorageAccountForm type={type} sid={sid} />;
    else if (type === "virtualNetwork")
      return <VirtualNetworkForm type={type} sid={sid} />;
    else if (type === "keyVault") return <KeyVaultForm type={type} sid={sid} />;
    else if (type === "virtualMachine")
      return <VirtualMachineForm type={type} sid={sid} />;
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-60px)] items-center justify-center">
      <RenderForm />
    </div>
  );
}
