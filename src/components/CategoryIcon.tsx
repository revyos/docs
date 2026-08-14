import React from 'react';
import { ProjectCategory } from './ProjectCategory';

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * A small line-style icon for each project category, rendered inside the
 * colored badge on the project card. Replaces the old two-letter codes
 * (EC/KN/FW/...) with something recognizable.
 */
export const CategoryIcon: React.FC<{ category: ProjectCategory }> = ({
  category,
}) => {
  switch (category) {
    case ProjectCategory.Ecosystem:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case ProjectCategory.Kernel:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
        </svg>
      );
    case ProjectCategory.Firmware:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case ProjectCategory.BuildScripts:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case ProjectCategory.Documentation:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case ProjectCategory.Electron:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case ProjectCategory.Benchmark:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <line x1="6" y1="20" x2="6" y2="16" />
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
        </svg>
      );
    case ProjectCategory.Uncategorized:
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
  }
};
