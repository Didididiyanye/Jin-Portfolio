type ArrowUpRightProps = {
  className?: string;
};

export function ArrowUpRight({ className = "size-4" }: ArrowUpRightProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path d="M3.5 12.5 12.5 3.5M5 3.5h7.5V11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
