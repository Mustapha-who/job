import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { prisma } from "@/lib/prisma";

export default async function JobsPage({searchParams}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const {q,type,location} = await searchParams || {};

    const query = q as string | undefined;
    const searchType = type as string | undefined;
    const searchLocation = location as string | undefined;

  const jobs = await prisma.job.findMany({
    where : {
        AND :[
            q ? {
                OR : [
                    {
                        title: {contains: query, mode: 'insensitive'}
                    },
                    {
                        company: {contains: query, mode: 'insensitive'}
                    },
                    {
                        location: {contains: query, mode: 'insensitive'}
                    }
                ],
                title : {contains: query, mode: 'insensitive'}
            } : {},

            type ? {type: searchType } :{},
            searchLocation ? {location: {contains: searchLocation, mode: 'insensitive'} } : {},
        ],
    },
    orderBy: {postedAt :"desc"},
    include : { postedBy: true}
  });

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Jobs</h1>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <form method="GET" action="/jobs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Job Search</Label>
                  <Input
                    name="q"
                    placeholder="Search jobs..."
                    className="w-full"
                    defaultValue={query}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select name="type" defaultValue={type as string}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="INTERNSHIP">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    name="location"
                    placeholder="Location..."
                    className="w-full"
                    defaultValue={location as string}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button type="submit" className="w-full md:w-auto">
                  Search Jobs
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Job listings */}
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {job.company} • {job.location}
                      </CardDescription>
                      <p className="text-sm text-gray-500 mt-1">
                        Posted by {job.postedBy.name || job.postedBy.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job.type?.replace("_", " ") || "Not specified"}
                      </span>
                      {job.salary && (
                        <p className="text-sm text-gray-600 mt-1">{job.salary}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Posted{" "}
                      {new Date(job.postedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No jobs found. Be the first to post a job!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}