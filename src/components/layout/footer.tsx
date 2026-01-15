import Link from 'next/link';

export function Footer() {
  const footerLinks = [
    { title: 'About SafeHire', href: '/about' },
    { title: 'Scam Prevention Guide', href: '/guides/scam-prevention' },
    { title: 'Report a Scam', href: '/report' },
    { title: 'Privacy Policy', href: '/privacy' },
  ];
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg font-headline">SafeHire</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.title}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} SafeHire</p>
        </div>
      </div>
    </footer>
  );
}
