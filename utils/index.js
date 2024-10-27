export const resources = [
  {
    id: 1,
    type: "resourceGroup",
    name: "RG-01",
    content: {},
  },
  {
    id: 2,
    type: "resourceGroup",
    name: "RG-02",
    content: {},
  },
  {
    id: 3,
    type: "virtualMachine",
    name: "VM01",
    content: {},
  },
  {
    id: 4,
    type: "virtualMachine",
    name: "VM02",
    content: {},
  },
  {
    id: 5,
    type: "storageAccount",
    name: "SA01",
    content: {},
  },
  {
    id: 6,
    type: "virtualNetwork",
    name: "VNet01",
    content: {},
  },
  {
    id: 7,
    type: "Subnet",
    name: "SNet01",
    content: {},
  },
];

export const availableResources = [
  {
    id: 1,
    name: "Resource Group",
    type: "resourceGroup",
    image:
      "https://abouconde335669239.files.wordpress.com/2019/02/resourcegroup_color.png?w=640",
    description:
      "A container that holds related resources for an Azure solution.",
  },
  {
    id: 2,
    name: "Virtual Machine",
    type: "virtualMachine",
    image:
      "https://ms-azuretools.gallerycdn.vsassets.io/extensions/ms-azuretools/vscode-azurevirtualmachines/0.6.5/1684355349075/Microsoft.VisualStudio.Services.Icons.Default",
    description:
      "An Virtual machine which gives you the flexibility of virtualization without having to buy and maintain the physical hardware that runs it.",
  },
  {
    id: 3,
    name: "Virtual Network",
    type: "virtualNetwork",
    image:
      "https://miro.medium.com/v2/resize:fit:666/1*X8HJaeivdCBiQYOGau0ZaA.png",
    description:
      "A service that provides the fundamental building block for your private network in Azure.",
  },
  {
    id: 4,
    name: "Storage Account",
    type: "storageAccount",
    image:
      "https://ms-azuretools.gallerycdn.vsassets.io/extensions/ms-azuretools/vscode-azurestorage/0.15.3/1686611602534/Microsoft.VisualStudio.Services.Icons.Default",
    description:
      "It contains all of your Azure Storage data objects: blobs, files, queues, and tables.",
  },
  {
    id: 5,
    name: "Key Vault",
    type: "keyVault",
    image:
      "https://azure.microsoft.com/svghandler/key-vault/?width=600&height=315",
    description: "A cloud service that provides a secure store for secrets.",
  },
];

export const azureRegions = [
  {
    name: "East US",
    value: "eastus",
  },
  {
    name: "East US 2",
    value: "eastus2",
  },
  {
    name: "West US",
    value: "westus",
  },
  {
    name: "West US 2",
    value: "westus2",
  },
];

export const supportedLocations = [
  { code: "eastus", name: "East US" },
  { code: "eastus2", name: "East US2" },
  { code: "southcentralus", name: "South Central US" },
  { code: "westus2", name: "West US2" },
  { code: "westus3", name: "West US3" },
  { code: "australiaeast", name: "Australia East" },
  { code: "southeastasia", name: "Southeast Asia" },
  { code: "northeurope", name: "North Europe" },
  { code: "swedencentral", name: "Sweden Central" },
  { code: "uksouth", name: "UK South" },
  { code: "westeurope", name: "West Europe" },
  { code: "centralus", name: "Central US" },
  { code: "southafricanorth", name: "South Africa North" },
  { code: "centralindia", name: "Central India" },
  { code: "eastasia", name: "East Asia" },
  { code: "japaneast", name: "Japan East" },
  { code: "koreacentral", name: "Korea Central" },
  { code: "canadacentral", name: "Canada Central" },
  { code: "francecentral", name: "France Central" },
  { code: "germanywestcentral", name: "Germany West Central" },
  { code: "italynorth", name: "Italy North" },
  { code: "norwayeast", name: "Norway East" },
  { code: "polandcentral", name: "Poland Central" },
  { code: "switzerlandnorth", name: "Switzerland North" },
  { code: "uaenorth", name: "UAE North" },
  { code: "brazilsouth", name: "Brazil South" },
  { code: "israelcentral", name: "Israel Central" },
  { code: "qatarcentral", name: "Qatar Central" },
  { code: "westus", name: "West US" },
  { code: "northcentralus", name: "North Central US" },
  { code: "japanwest", name: "Japan West" },
  { code: "westcentralus", name: "West Central US" },
  { code: "australiacentral", name: "Australia Central" },
  { code: "australiasoutheast", name: "Australia Southeast" },
  { code: "koreasouth", name: "Korea South" },
  { code: "southindia", name: "South India" },
  { code: "westindia", name: "West India" },
  { code: "ukwest", name: "UK West" },
  { code: "canadaeast", name: "Canada East" },
];

export const detailsDisplayNames = [
  {
    name: "rgName",
    displayName: "Resource Group",
  },
  {
    name: "dnsServers",
    displayName: "DNS Servers",
  },
  {
    name: "addSpace",
    displayName: "Address Space",
  },
  {
    name: "saTier",
    displayName: "Account Tier",
  },
  {
    name: "saRepli",
    displayName: "Replication Type",
  },
  {
    name: "diskEnc",
    displayName: "Disk Encryption",
  },
  {
    name: "softDelete",
    displayName: "Days to retain deleted vaults",
  },
  {
    name: "purgeProtect",
    displayName: "Purge Protection",
  },
  {
    name: "skuName",
    displayName: "Sku (Pricing tier)",
  },
  {
    name: "rbacAuth",
    displayName: "Role-based access control",
  },
];
