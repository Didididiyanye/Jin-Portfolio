type MailIconProps = {
  className?: string;
};

export function QqMailIcon({ className }: MailIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#12B7F5" />
      <rect x="14" y="19" width="36" height="28" rx="5" fill="#FFFFFF" />
      <path
        d="M15.5 22.5L32 35l16.5-12.5"
        fill="none"
        stroke="#12B7F5"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 44l12-11M48 44L36 33" stroke="#D6F3FF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GmailIcon({ className }: MailIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M1.636 20.5h3.819V11.73L0 7.64v11.224c0 .904.732 1.636 1.636 1.636z" />
      <path fill="#34A853" d="M18.545 20.5h3.819c.904 0 1.636-.732 1.636-1.636V7.64l-5.455 4.09z" />
      <path fill="#FBBC04" d="M0 5.457v2.183l5.455 4.09V4.64L3.927 3.493C2.309 2.28 0 3.434 0 5.457z" />
      <path fill="#EA4335" d="M18.545 4.64v7.09L24 7.64V5.457c0-2.023-2.31-3.177-3.927-1.964z" />
      <path fill="#C5221F" d="M5.455 11.73L12 16.64l6.545-4.91V4.64L12 9.548 5.455 4.64z" />
    </svg>
  );
}