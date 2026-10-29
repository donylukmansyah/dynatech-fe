// lucide 1.x tidak punya ikon brand, jadi SVG ditulis manual
const icons = {
  Instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.8-2.05 3.7-2.05 3.96 0 4.45 2.6 4.45 5.98V21H21v-5.3c0-1.26-.02-2.9-1.76-2.9-1.77 0-2.04 1.38-2.04 2.8V21H13V9Z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46H17V3.96c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4.02V10H8v3h2.76v8h2.74Z" />
    </svg>
  ),
}

export function SocialLinks() {
  return (
    <div className="flex gap-2.5">
      {Object.entries(icons).map(([label, icon]) => (
        <a
          key={label}
          href="#"
          aria-label={label}
          className="grid size-[42px] place-items-center rounded-full border border-border text-foreground transition-colors duration-300 hover:bg-surface-dark hover:text-white [&_svg]:size-[18px]"
        >
          {icon}
        </a>
      ))}
    </div>
  )
}
