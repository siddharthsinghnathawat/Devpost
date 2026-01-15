'use client';

import { JobCard } from '@/components/job-card';
import { jobs } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function parseSalaryToAnnual(s: string): number | null {
  const hourly = /\/\s*hour/i.test(s);
  const nums = Array.from(s.matchAll(/\$?(\d{1,3}(?:,\d{3})?)/g)).map((m) =>
    parseInt(m[1].replace(/,/g, ''), 10)
  );
  if (nums.length === 0) return null;
  const max = Math.max(...nums);
  if (hourly) return max * 2000;
  return max;
}

export default function JobsPage() {
  const sp = useSearchParams();
  const q = (sp.get('q') || '').toLowerCase().trim();
  const [loc, setLoc] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [exp, setExp] = useState<string>('');
  const [sal, setSal] = useState<string>('');

  const filtered = useMemo(() => {
    let list = jobs.slice();
    if (q.length >= 2) {
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.companyName.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }
    if (loc) {
      const map: Record<string, string> = {
        sf: 'San Francisco, CA',
        ny: 'New York, NY',
        austin: 'Austin, TX',
        remote: 'Remote',
      };
      const v = map[loc];
      list = list.filter((j) => j.location === v);
    }
    if (type) {
      const map: Record<string, typeof jobs[number]['jobType']> = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        contract: 'Contract',
        internship: 'Internship',
      };
      const v = map[type];
      list = list.filter((j) => j.jobType === v);
    }
    if (exp) {
      const map: Record<string, typeof jobs[number]['experienceLevel']> = {
        entry: 'Entry',
        mid: 'Mid',
        senior: 'Senior',
      };
      const v = map[exp];
      list = list.filter((j) => j.experienceLevel === v);
    }
    if (sal) {
      const thresholds: Record<string, number> = {
        '50k+': 50000,
        '100k+': 100000,
        '150k+': 150000,
      };
      const th = thresholds[sal];
      list = list.filter((j) => {
        const n = parseSalaryToAnnual(j.salaryRange);
        return n !== null ? n >= th : true;
      });
    }
    return list;
  }, [q, loc, type, exp, sal]);

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={loc} onValueChange={setLoc}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sf">San Francisco, CA</SelectItem>
                    <SelectItem value="ny">New York, NY</SelectItem>
                    <SelectItem value="austin">Austin, TX</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={exp} onValueChange={setExp}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Select value={sal} onValueChange={setSal}>
                  <SelectTrigger id="salary">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50k+">$50,000+</SelectItem>
                    <SelectItem value="100k+">$100,000+</SelectItem>
                    <SelectItem value="150k+">$150,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <Button
                 className="w-full"
                 variant="outline"
                 onClick={() => {
                   setLoc('');
                   setType('');
                   setExp('');
                   setSal('');
                 }}
               >
                 Clear Filters
               </Button>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-6 font-headline">
            Showing {filtered.length} Job Postings
          </h1>
          {q && q.length >= 2 && (
            <p className="text-sm text-muted-foreground mb-4">
              Filtered by "<span className="font-medium">{q}</span>"
            </p>
          )}
          <div className="space-y-6">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
