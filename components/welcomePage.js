import { Equal, Plus } from "lucide-react";
import LoginModal from "./modals/login";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <div className="flex flex-col p-6 gap-10">
      <h1 className="text-3xl font-semibold underline">Hello User,</h1>
      <div className="flex">
        <div className="flex flex-col gap-2 w-[50%]">
          <p className="text-md font-semibold">TerraZure infra creator</p>
          <p className="text-md font-semibold">
            The best platform to create Azure resources.
          </p>
          <ul className="ml-10" style={{ listStyleType: "circle" }}>
            <li className="text-sm text-gray-500 font-semibold">
              Uses Terraform for resources creation.
            </li>
            <li className="text-sm text-gray-500 font-semibold">
              Works on Infrastructure as a Code.
            </li>
            <li className="text-sm text-gray-500 font-semibold">
              No need to code.
            </li>
            <li className="text-sm text-gray-500 font-semibold">
              No additional costs.
            </li>
            <li className="text-sm text-gray-500 font-semibold">
              Secure and easy to manage.
            </li>
          </ul>
          <p className="text-sm font-semibold mt-3">
            <LoginModal title="register" /> to start creating.
          </p>
        </div>
        <div className="flex flex-col gap-5 w-[50%]">
          <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">
              Create your Infrastructure Azure
            </p>
            <p className="text-md font-semibold">
              With Terraform and get benefits like:
            </p>
            <ul className="ml-10" style={{ listStyleType: "circle" }}>
              <li className="text-sm text-gray-500 font-semibold">
                Cost Reduction
              </li>
              <li className="text-sm text-gray-500 font-semibold">Speed</li>
              <li className="text-sm text-gray-500 font-semibold">
                Low risk of human error
              </li>
              <li className="text-sm text-gray-500 font-semibold">
                Improved Consistency
              </li>
              <li className="text-sm text-gray-500 font-semibold">
                Improved security strategies, etc
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-[250px] w-full flex items-center p-6 justify-between">
        <div className=" h-full w-[25%] bg-red-300 overflow-hidden relative">
          <Image alt="NF" src="/azure.png" fill />
        </div>
        <Plus size={42} />
        <div className="h-full w-[25%] bg-red-300 overflow-hidden relative">
          <Image alt="NF" src="/terraform.jpg" fill />
        </div>
        <Equal size={42} />
        <div className="h-full w-[25%] bg-red-300 overflow-hidden relative">
          <Image alt="NF" src="/infra.jpg" fill />
        </div>
      </div>
    </div>
  );   
}
