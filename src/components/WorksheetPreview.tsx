import { useEffect, type CSSProperties } from 'react';

interface WorksheetPreviewProps {
  name: string;
  repetitions: number;
  isLandscape: boolean;
  fontSize: number;
  showGuides: boolean;
}

export function WorksheetPreview({
  name,
  repetitions,
  isLandscape,
  fontSize,
  showGuides,
}: WorksheetPreviewProps) {
  const displayName = name || "เขียนไทย Kian Thai";
  const dynamicMultiplier = fontSize < 50 ? 1.4 : 1.2;
  const rowHeight = fontSize * dynamicMultiplier;
  const lineHeight = 1.1;

  useEffect(() => {
    const orientation = isLandscape ? 'landscape' : 'portrait';
    document.documentElement.style.setProperty('--page-orientation', orientation);
  }, [isLandscape]);

  const sheetStyle = {
    '--row-count': repetitions,
    '--screen-row-height': `${rowHeight}px`,
    '--worksheet-font-size': `${fontSize}px`,
    '--worksheet-line-height': `${lineHeight}`,
  } as CSSProperties;

  return (
    <div className="no-print-wrapper flex-1 overflow-auto p-3 md:p-8 flex justify-center items-start w-full print:block print:overflow-visible print:p-0">
      <div
        className={`a4-sheet transition-all duration-300 origin-top ${
          isLandscape ? 'a4-sheet--landscape' : 'a4-sheet--portrait'
        }`}
        style={sheetStyle}
      >
        <div className="tracing-rows flex-1 flex flex-col gap-1 overflow-hidden">
          {Array.from({ length: repetitions }).map((_, i) => (
            <div key={i} className="tracing-row relative flex items-center">
              {showGuides && (
                <>
                  <div className="guideline-top" />
                  <div className="guideline-middle" />
                  <div className="guideline-bottom" />
                </>
              )}
              <span
                className="tracing-text block w-full relative z-10"
                style={{
                  fontFamily: "'ThaiTracing', 'Sarabun', 'Noto Sans Thai', sans-serif",
                  color: 'oklch(0.75 0.02 250)',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}
              >
                {displayName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
