import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ReadTXT from "../GenComponents/ReadTXT"
import Analyse from "../GenComponents/Analyse"
import ReadContextProvider from '../GenComponents/ReadContextProvider'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SearchResults from "../GenComponents/SearchResults"

export default function Page() {
  return (
  
        <div className="flex flex-1 flex-col ">
           
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    Resume Analyzer
                  </h1>
                  
                  <div className="grid lg:grid-cols-[400px,1fr] gap-6">
                    {/* Upload Section */}
                    <div className="h-fit">
                      
                        <ReadTXT />
                        <p className="text-sm text-gray-500 mt-4">
                          Upload your resume in PDF format to get detailed analysis and insights
                        </p>
                    </div>

                    {/* Analysis Section */}
                    <div className="flex-1">
                      <Analyse />
                      {/* <SearchResults/> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      
  )
}