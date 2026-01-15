import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { jobs } from '@/lib/data';

export default function AdminPage() {
  const flaggedJobs = jobs.slice(1,2);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Admin Panel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Flagged Jobs</CardTitle>
          <CardDescription>
            Review user-reported job postings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>User Reports</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flaggedJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.companyName}</TableCell>
                  <TableCell>
                    {Math.floor(Math.random() * 10) + 1}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="destructive" size="sm">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-chart-2 hover:bg-chart-2/80 text-white">
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
