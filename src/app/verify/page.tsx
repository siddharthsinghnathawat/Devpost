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
import { Textarea } from '@/components/ui/textarea';

export default function VerifyPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{
    verdict: 'Likely Safe' | 'Likely Scam' | null;
    score: number;
    reasons: string[];
    tips: string[];
  }>({ verdict: null, score: 0, reasons: [], tips: [] });

  const normalize = (s: string) => s.toLowerCase();

  const analyze = (input: string) => {
    const t = normalize(input);
    let risk = 0;
    const reasons: string[] = [];
    const tips: string[] = [];

    const hit = (cond: boolean, pts: number, reason: string) => {
      if (cond) {
        risk += pts;
        reasons.push(reason);
      }
    };

    hit(/training\s+fee|registration\s+fee|upfront\s+fee|processing\s+fee/.test(t), 25, 'Mentions upfront or training fees');
    hit(/personal\s+bank\s+account|bank\s+details|wire\s+transfer|crypto|bitcoin/.test(t), 20, 'Requests bank details or unusual payment methods');
    hit(/gmail\.com|yahoo\.com|outlook\.com|hotmail\.com/.test(t) && !/@[a-z0-9.-]+\.[a-z]{2,}/.test(t), 15, 'Uses generic email without company domain');
    hit(/whatsapp|telegram|im|instant\s+messenger|chat\s+only/.test(t), 10, 'Pushes messaging apps for communication');
    hit(/no\s+experience\s+necessary|no\s+experience\s+required/.test(t) && /high\s+salary|\$\s?\d{5,}/.test(t), 15, 'Unrealistic pay with no experience required');
    hit(/urgent\s+hiring|apply\s+now|limited\s+slots|immediate\s+start/.test(t), 5, 'High-pressure urgency language');
    hit(/provide\s+(ssn|social\s+security|national\s+id|passport)/.test(t), 20, 'Requests sensitive personal identification');
    hit(/reimburse(d|ment)\s+after\s+payment/.test(t), 15, 'Promises reimbursement after upfront payment');
    hit(/no\s+official\s+website|website\s+not\s+available/.test(t), 10, 'Admits to no official website');
    hit(/\b(remote)\b/.test(t) && !/(company\s+site|careers|official|linkedin|glassdoor)/.test(t), 5, 'Remote role with weak company traceability');
    hit(/gift\s+cards|prepaid\s+cards/.test(t), 10, 'Requests gift or prepaid cards');
    hit(/[A-Z]{4,}\s*!{2,}/.test(input), 5, 'Excessive caps/exclamation emphasis');

    const hasPositives =
      /(official\s+site|careers\s+page|linkedin\.com\/company|glassdoor\.com|crunchbase\.com)/.test(t) ||
      (/@[a-z0-9.-]+\.[a-z]{2,}/.test(t) && !/(gmail|yahoo|outlook|hotmail)\.com/.test(t));
    if (hasPositives) {
      risk = Math.max(0, risk - 10);
    }

    const score = Math.min(100, Math.max(0, Math.round(risk)));
    const verdict: 'Likely Scam' | 'Likely Safe' = score >= 40 ? 'Likely Scam' : 'Likely Safe';

    if (verdict === 'Likely Scam') {
      tips.push('Apply only via the official company careers page');
      tips.push('Never send money or share bank details');
      tips.push('Verify recruiter email uses company domain');
      tips.push('Check company presence on LinkedIn/Glassdoor');
    } else {
      tips.push('Confirm job listing on the official site');
      tips.push('Cross-check recruiter identity on LinkedIn');
    }

    return { verdict, score, reasons, tips };
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = analyze(text);
    setResult(res);
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              Verify Job Posting
            </CardTitle>
            <CardDescription>
              Paste the job description below to analyze it for potential red flags.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <Textarea
                placeholder="Paste job description here..."
                className="min-h-[200px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Analyze Job
              </Button>
            </form>
            {result.verdict && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{result.verdict}</span>
                  <span className="text-sm text-muted-foreground">Risk Score: {result.score}/100</span>
                </div>
                {result.reasons.length > 0 && (
                  <div>
                    <div className="text-sm font-medium">Reasons</div>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      {result.reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.tips.length > 0 && (
                  <div>
                    <div className="text-sm font-medium">Next Steps</div>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      {result.tips.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
