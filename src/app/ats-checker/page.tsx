'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';

export default function AtsCheckerPage() {
  const [score, setScore] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [jdText, setJdText] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result instanceof ArrayBuffer) {
          try {
            const decoder = new TextDecoder('utf-8');
            const txt = decoder.decode(result);
            setResumeText(txt);
          } catch {
            try {
              const decoder = new TextDecoder('latin1');
              const txt = decoder.decode(result);
              setResumeText(txt);
            } catch {
              setResumeText('');
            }
          }
        } else if (typeof result === 'string') {
          setResumeText(result);
        }
      };
      try {
        reader.readAsArrayBuffer(file);
      } catch {
        reader.readAsText(file);
      }
    } else {
      setFileName(null);
      setResumeText('');
      setFileSize(0);
    }
  };

  const tokenize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9+\-\.@\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);

  const hasPattern = (text: string, regex: RegExp) => regex.test(text);

  const computeScore = (resume: string, jd: string, size: number) => {
    const lower = resume.toLowerCase();
    let total = 0;
    if (hasPattern(lower, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)) total += 15;
    if (hasPattern(lower, /(\+?\d[\d\s\-()]{7,}\d)/)) total += 15;
    const sections = ['education', 'experience', 'skills', 'projects', 'summary', 'certifications'];
    const sectionHits = sections.reduce((acc, s) => acc + (lower.includes(s) ? 1 : 0), 0);
    total += Math.min(30, sectionHits * 6);
    const bullets = (lower.match(/(^|\n)\s*(?:[-*•]\s+)/g) || []).length;
    total += Math.min(10, bullets * 2);
    const skills = [
      'javascript',
      'typescript',
      'react',
      'node',
      'python',
      'java',
      'sql',
      'docker',
      'aws',
      'git',
      'c++',
      'machine',
      'learning',
      'data',
    ];
    const resumeTokens = new Set(tokenize(resume));
    const skillHits = skills.reduce((acc, s) => acc + (resumeTokens.has(s) ? 1 : 0), 0);
    total += Math.min(20, skillHits * 2);
    if (jd.trim().length > 0) {
      const jdTokens = new Set(tokenize(jd));
      let matches = 0;
      jdTokens.forEach((t) => {
        if (resumeTokens.has(t)) matches += 1;
      });
      const matchRatio = jdTokens.size ? matches / jdTokens.size : 0;
      total += Math.min(20, Math.round(matchRatio * 20));
    }
    if (size > 20_000 && size < 1_500_000) total += 5;
    return Math.max(0, Math.min(100, Math.round(total)));
  };

  const handleScoreCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const s = computeScore(resumeText, jdText, fileSize);
    setScore(s);
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              ATS Score Checker
            </CardTitle>
            <CardDescription>
              Upload your resume PDF and optionally paste a job description to get an ATS score.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScoreCheck} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resume-upload">Upload Resume (PDF)</Label>
                <div className="relative">
                   <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-border/60 hover:border-primary/80 transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    <span className="mt-2 text-sm text-muted-foreground">
                      {fileName ? fileName : 'Click to upload your PDF'}
                    </span>
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jd-text">Paste Job Description (optional)</Label>
                <Textarea
                  id="jd-text"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste job description here to improve keyword match scoring"
                  className="min-h-[160px]"
                />
              </div>
              <Button type="submit" className="w-full" disabled={!fileName}>
                Check Score
              </Button>
            </form>

            {score !== null && (
              <div className="mt-8 pt-6 border-t border-border/60">
                <h3 className="text-lg font-medium text-center mb-4">Your ATS Score</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-4xl font-bold text-primary">{score}%</span>
                </div>
                <Progress value={score} className="w-full mt-4 h-3" />
                 <p className="text-center text-sm text-muted-foreground mt-3">
                  This score uses contact info, section presence, bullet formatting, skills, and optional keyword match.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
