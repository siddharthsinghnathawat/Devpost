'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { jobs } from '@/lib/data';
import type { Job } from '@/lib/types';
import { useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Job[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  const updateResults = (q: string) => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) {
      setResults([]);
      setOpenDropdown(false);
      return;
    }
    const r = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(t) ||
        j.companyName.toLowerCase().includes(t) ||
        j.location.toLowerCase().includes(t)
    ).slice(0, 8);
    setResults(r);
    setOpenDropdown(r.length > 0);
  };

  return (
    <header>
      <div className="container flex h-16 items-center border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-xl">
        <Link href="/" className="mr-auto flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight font-headline">SafeHire</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button
            variant={pathname === '/' ? 'secondary' : 'ghost'}
            asChild
          >
            <Link href="/">
              Home
            </Link>
          </Button>

          <Button
            variant={pathname === '/verify' ? 'secondary' : 'ghost'}
            asChild
          >
            <Link href="/verify">
              Verify
            </Link>
          </Button>

          {showSearch ? (
            <div className="relative">
              <Input
                type="search"
                placeholder="Search jobs..."
                className="w-full md:w-[320px] pr-20"
                value={query}
                onChange={(e) => {
                  const q = e.target.value;
                  setQuery(q);
                  updateResults(q);
                }}
                onFocus={() => updateResults(query)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setShowSearch(false);
                    setQuery('');
                    setResults([]);
                    setOpenDropdown(false);
                  } else if (e.key === 'Enter') {
                    const t = query.trim();
                    if (t.length >= 2) {
                      router.push(`/jobs?q=${encodeURIComponent(t)}`);
                      setShowSearch(false);
                      setOpenDropdown(false);
                    }
                  }
                }}
                autoFocus
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowSearch(false);
                    setQuery('');
                    setResults([]);
                    setOpenDropdown(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
              {openDropdown && (
                <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                  <ul className="py-2">
                    {results.map((j) => (
                      <li key={j.id}>
                        <Link
                          href={`/jobs/${j.id}`}
                          className="block px-3 py-2 hover:bg-muted"
                          onClick={() => {
                            setShowSearch(false);
                            setQuery('');
                            setResults([]);
                            setOpenDropdown(false);
                          }}
                        >
                          <span className="font-medium">{j.title}</span>
                          <span className="ml-2 text-muted-foreground text-sm">• {j.companyName} • {j.location}</span>
                        </Link>
                      </li>
                    ))}
                    {results.length === 0 && (
                      <li className="px-3 py-2 text-sm text-muted-foreground">No results</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Button variant="ghost" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5 mr-2" />
              Find jobs here
            </Button>
          )}

          <Button
            variant={pathname === '/ats-checker' ? 'secondary' : 'ghost'}
            asChild
          >
            <Link href="/ats-checker">
              ATS Score Checker
            </Link>
          </Button>

          <Button
            variant={pathname === '/jobs' ? 'secondary' : 'ghost'}
            asChild
          >
            <Link href="/jobs">
              Jobs
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
