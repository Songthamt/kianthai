import { useEffect } from 'react';

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
  const displayName = name || "เขียนชื่อเล่น   Kian Thai";
  const dynamicMultiplier = fontSize < 50 ? 1.4 : 1.2;
  const rowHeight = fontSize * dynamicMultiplier;
  const lineHeight = 1.1;

useEffect(() => {
  const orientation = isLandscape ? 'landscape' : 'portrait';
  document.documentElement.style.setProperty('--page-orientation', orientation);
}, [isLandscape]);

return (
    <div className="flex-1 overflow-auto p-8 flex justify-center items-start no-print-wrapper">
      <div
        className="a4-sheet transition-all duration-300 origin-top"
        style={{
          aspectRatio: isLandscape ? "1.414 / 1" : "1 / 1.414",
          width: isLandscape ? "min(90%, 900px)" : "min(80%, 640px)",
          padding: "clamp(20px, 4%, 48px)",
          display: "flex",
          flexDirection: "column",
        }}
        >
        {/* Tracing rows */}
        <div className="flex-1 flex flex-col gap-1 overflow-hidden">
          {Array.from({ length: repetitions }).map((_, i) => (
            <div
              key={i}
              className="relative flex items-center"
              style={{
                height: `${rowHeight}px`,
                minHeight: `${rowHeight}px`,
              }}
            >
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
                  fontSize: `${fontSize}px`,
                  lineHeight: `${lineHeight}`,
                  color: "oklch(0.75 0.02 250)",
                  letterSpacing: "0.05em",
                  userSelect: "none",
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
