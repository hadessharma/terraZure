
import { Equal, Plus } from "lucide-react";
import LoginModal from "./modals/login";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-12 bg-background min-h-[calc(100vh-60px)]">
      {/* Hero Section */}
      <div className="text-center max-w-2xl space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl">
          Terra<span className="text-primary">Zure</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          The easiest platform to create and manage Azure infrastructure using Terraform. No code required.
        </p>
        <div className="pt-4">
          <LoginModal title="Get Started" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-bold mb-2">Why TerraZure?</h3>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Infrastructure as Code (IaC)</li>
            <li>No coding required (No-Code/Low-Code)</li>
            <li>Cost-effective & Secure</li>
            <li>Automated Terraform execution</li>
          </ul>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-bold mb-2">Benefits</h3>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Reduction in manual errors</li>
            <li>Faster deployment speed</li>
            <li>Consistent environments</li>
            <li>Improved security compliance</li>
          </ul>
        </div>
      </div>

      {/* Technology Stack Visualization */}
      <div className="w-full max-w-4xl flex items-center justify-center gap-4 sm:gap-8 opacity-90">
        <div className="h-24 w-24 sm:h-32 sm:w-32 bg-muted/50 rounded-2xl overflow-hidden relative flex items-center justify-center border shadow-sm">
          {/* Using object-contain to ensure logos fit nicely */}
          <Image alt="Azure" src="/azure.png" className="object-contain p-2" fill />
        </div>
        <Plus className="text-muted-foreground w-8 h-8" />
        <div className="h-24 w-24 sm:h-32 sm:w-32 bg-muted/50 rounded-2xl overflow-hidden relative flex items-center justify-center border shadow-sm">
          <Image alt="Terraform" src="/terraform.jpg" className="object-contain p-2" fill />
        </div>
        <Equal className="text-muted-foreground w-8 h-8" />
        <div className="h-24 w-24 sm:h-32 sm:w-32 bg-muted/50 rounded-2xl overflow-hidden relative flex items-center justify-center border shadow-sm">
          <Image alt="Infrastructure" src="/infra.jpg" className="object-cover" fill />
        </div>
      </div>
    </div>
  );
}
