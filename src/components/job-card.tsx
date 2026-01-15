
import Link from 'next/link';
import {
  Briefcase,
  CircleDollarSign,
  Heart,
  MapPin,
} from 'lucide-react';

import type { Job } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-black">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle className="text-xl">
                <Link href={`/jobs/${job.id}`} className="hover:underline">
                  {job.title}
                </Link>
              </CardTitle>
              <CardDescription>{job.companyName}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CircleDollarSign className="w-4 h-4" />
            <span>{job.salaryRange}</span>
          </div>
           <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            <span>{job.jobType}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild className="flex-1">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="w-4 h-4" />
          <span className="sr-only">Save Job</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
