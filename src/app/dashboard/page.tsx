import { JobCard } from '@/components/job-card';
import { jobs } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function DashboardPage() {
  const savedJobs = jobs.slice(0, 2);
  const reportedJobs = jobs.slice(2, 3);
  const recommendedJobs = jobs.slice(3, 5);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Your Dashboard</h1>
      </div>

      <Tabs defaultValue="saved">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          <TabsTrigger value="alerts">Application Alerts</TabsTrigger>
          <TabsTrigger value="reported">Reported Jobs</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>
                Jobs you've saved for later.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedJobs.length > 0 ? (
                savedJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p>You haven't saved any jobs yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Application Alerts</CardTitle>
              <CardDescription>
                Updates and deadlines for your applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>No new alerts.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reported">
          <Card>
            <CardHeader>
              <CardTitle>Reported Jobs</CardTitle>
              <CardDescription>
                Jobs you've reported for review.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {reportedJobs.length > 0 ? (
                reportedJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p>You haven't reported any jobs.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="recommended">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Jobs</CardTitle>
              <CardDescription>
                Jobs we think you'll like.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {recommendedJobs.length > 0 ? (
                recommendedJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p>No recommendations at this time.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
