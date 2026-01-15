'use client';

import { JobCard } from '@/components/job-card';
import { jobs } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Home() {
  const featuredJobs = jobs.slice(0, 10);
  const marqueeWords = ["No Risk", "Smart hire", "secure hire", "trusted", "reliable"];

  const [colorClass, setColorClass] = useState('from-yellow-300 to-green-300');
  const colors = [
    'from-yellow-300 to-green-300',
    'from-pink-500 to-purple-500',
    'from-blue-400 to-indigo-500',
    'from-red-500 to-orange-500',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorClass(prevClass => {
        const currentIndex = colors.indexOf(prevClass);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 2000); // Change color every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="relative w-full h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-black"
      >
        <div className="relative z-20 max-w-4xl flex flex-col items-center">
          <p className="text-lg md:text-xl text-primary uppercase tracking-widest font-headline">
            Imagine the Unthinkable
          </p>
          <h1 className="mt-2 text-4xl md:text-7xl font-bold tracking-tight text-white font-headline uppercase">
            The New Wave of Comfort
          </h1>
        </div>
      </div>

       <div className="relative flex overflow-x-hidden bg-black text-white">
        <div className="py-4 animate-marquee whitespace-nowrap">
          {marqueeWords.map((word, index) => (
            <span key={index} className="text-4xl mx-8 font-headline">{word}</span>
          ))}
        </div>

        <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
           {marqueeWords.map((word, index) => (
            <span key={index} className="text-4xl mx-8 font-headline">{word}</span>
          ))}
        </div>
      </div>
      <Separator />

      <div className="bg-black py-16">
        <div className="container">
           <h2 className="text-3xl font-bold text-center mb-12 text-white font-headline">
            Featured Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>

       <div className="bg-black py-16 text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            Safe hiring is important because finding a job today mostly happens online, and that has changed the risks people face. Job portals, social media, and messaging apps make it easy for anyone to post a job opening, but they also make it easy for scammers to appear legitimate. Fake job listings often look professional, use convincing language, and imitate real companies, which makes it difficult for job seekers to tell the difference.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mt-6">
            When someone is actively looking for work, they are often under pressure. They may need income urgently, be early in their career, or be applying to many roles at once. In this situation, people tend to trust job postings and respond quickly, which is exactly what scammers take advantage of. A single fake job can lead to financial loss, identity theft, or exposure of personal documents such as resumes, ID cards, or bank details. Beyond money, it can also cause stress, loss of confidence, and wasted time.
          </p>
        </div>
      </div>

      <div className="w-full h-screen flex items-center justify-center bg-black">
        <h2
          className={cn(
            'text-6xl md:text-8xl font-bold font-headline transition-all duration-1000 bg-gradient-to-r bg-clip-text text-transparent',
            colorClass
          )}
        >
          SafeHire
        </h2>
      </div>
    </div>
  );
}
