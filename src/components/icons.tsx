import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 22c-4-3.5-8-6.5-8-12.5a8 8 0 1 1 16 0c0 6-4 9-8 12.5z M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z m-3-0.5a3.5 3.5 0 1 1 7 0h-1.5a2 2 0 1 0-4 0h-1.5z m-3.5 0a6.5 6.5 0 0 1 6.5-6.5v1.5a5 5 0 0 0-5 5h-1.5z m6.5 6.5a6.5 6.5 0 0 1-6.5-6.5h1.5a5 5 0 0 0 5 5v1.5z"
      />
    </svg>
  );
}
