import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Briefcase,
  CalendarDays,
  CircleDollarSign,
  Flag,
  MapPin,
} from 'lucide-react';

import { jobs } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <Image
                    src={job.companyLogo.imageUrl}
                    alt={`${job.companyName} logo`}
                    width={64}
                    height={64}
                    className="rounded-lg object-contain"
                    data-ai-hint={job.companyLogo.imageHint}
                  />
                  <div>
                    <CardTitle className="text-2xl font-headline">{job.title}</CardTitle>
                    <CardDescription className="text-base">{job.companyName}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
                <div className="flex items-center gap-1.5"><CircleDollarSign className="w-4 h-4" /> {job.salaryRange}</div>
                <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.jobType}</div>
                <div className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Deadline: {job.applicationDeadline}</div>
              </div>
              <Separator className="my-6" />
              <div>
                <h3 className="text-xl font-semibold mb-2 font-headline">Job Description</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
                  {job.description.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                </div>
              </div>
               <Separator className="my-6" />
                <div>
                <h3 className="text-xl font-semibold mb-2 font-headline">Company Overview</h3>
                <p className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">{job.companyOverview}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
           <Card>
            <CardContent className="p-4">
              <Image
                src="https://picsum.photos/seed/job-image/600/400"
                alt="Job image"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
                data-ai-hint="workplace office"
              />
            </CardContent>
          </Card>
           <div className="space-y-2">
            <Button size="lg" className="w-full">Apply on Official Site</Button>
            <Button variant="outline" className="w-full">
              <Flag className="w-4 h-4 mr-2" />
              Report This Job as Scam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
