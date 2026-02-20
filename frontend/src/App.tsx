import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import './index.css'

const queryClient = new QueryClient()

function Dashboard() {
  const { data: awsData, isLoading: awsLoading } = useQuery({
    queryKey: ['awsResources'],
    queryFn: () => fetch('http://localhost:8000/api/aws/resources').then(res => res.json())
  })

  const { data: azureData, isLoading: azureLoading } = useQuery({
    queryKey: ['azureResources'],
    queryFn: () => fetch('http://localhost:8000/api/azure/resources').then(res => res.json())
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 font-sans">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          TerraZure Dashboard
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Manage your AWS and Azure infrastructure</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AWS Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-gray-800/50 p-4 border-b border-gray-800 flex justify-between items-center">
             <h2 className="text-xl font-semibold text-orange-400 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              AWS Compute & Storage
            </h2>
            <span className="text-xs font-mono bg-orange-400/10 text-orange-400 px-3 py-1 rounded-full border border-orange-400/20">
              {awsData?.count || 0} RESOURCES
            </span>
          </div>
          
          <div className="p-6">
            {awsLoading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {awsData?.resources?.length > 0 ? (
                  awsData.resources.map((res: any, i: number) => (
                    <li key={i} className="group bg-gray-800/30 p-4 rounded-lg flex justify-between items-center border border-gray-800 hover:border-orange-500/50 hover:bg-gray-800/80 transition-all cursor-default">
                      <div>
                        <p className="font-medium text-gray-200 group-hover:text-white transition-colors">{res.name || res.id}</p>
                        <p className="text-xs text-gray-500 mt-1">{res.resource_type} • {res.region}</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded uppercase tracking-wider">
                        {res.state || "Active"}
                      </span>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 text-sm">No AWS resources configured or found using the environment credentials.</p>
                  </div>
                )}
              </ul>
            )}
          </div>
        </section>

        {/* Azure Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-gray-800/50 p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6.5l-6-5-6 5v11l6 5 6-5v-11zm-6 13.5l-4-3.33v-8.34l4-3.33 4 3.33v8.34l-4 3.33zM4 6.5l-4 3.33v11l4 3.34 4-3.34v-11L4 6.5zm2 12.17l-1.33 1.11L3.33 18.67l1.34-1.12v-5.22l-1.34-1.11 1.34-1.12 1.33 1.11v5.22z"/></svg>
              Azure Resources
            </h2>
            <span className="text-xs font-mono bg-blue-400/10 text-blue-400 px-3 py-1 rounded-full border border-blue-400/20">
              {azureData?.count || 0} RESOURCES
            </span>
          </div>
          
          <div className="p-6">
            {azureLoading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {azureData?.resources?.length > 0 ? (
                  azureData.resources.map((res: any, i: number) => (
                    <li key={i} className="group bg-gray-800/30 p-4 rounded-lg flex justify-between items-center border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all cursor-default">
                      <div className="overflow-hidden">
                        <p className="font-medium text-gray-200 group-hover:text-white transition-colors truncate w-full" title={res.name}>{res.name}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{res.type} • {res.region}</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded uppercase tracking-wider whitespace-nowrap ml-4">
                        {res.state || "Active"}
                      </span>
                    </li>
                  ))
                ) : (
                   <div className="text-center py-10">
                    <p className="text-gray-500 text-sm">No Azure resources configured or found using the environment credentials.</p>
                  </div>
                )}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}

export default App
