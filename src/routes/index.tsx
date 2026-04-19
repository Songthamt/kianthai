import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { WorksheetPreview } from "@/components/WorksheetPreview";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Thai Name Tracing Worksheet Generator" },
      {
        name: "description",
        content:
          "Create printable Thai name tracing worksheets for children. Customize font size, repetitions, and guide lines.",
      },
    ],
  }),
});

function Index() {
  const [name, setName] = useState("");
  const [repetitions, setRepetitions] = useState(8);
  const [isLandscape, setIsLandscape] = useState(false);
  const [fontSize, setFontSize] = useState(64);
  const [showGuides, setShowGuides] = useState(true);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-studio-bg">
      <ControlPanel
        name={name}
        onNameChange={setName}
        repetitions={repetitions}
        onRepetitionsChange={setRepetitions}
        isLandscape={isLandscape}
        onOrientationToggle={() => setIsLandscape((v) => !v)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        showGuides={showGuides}
        onGuidesToggle={() => setShowGuides((v) => !v)}
        onPrint={handlePrint}
      />
      <WorksheetPreview
        name={name}
        repetitions={repetitions}
        isLandscape={isLandscape}
        fontSize={fontSize}
        showGuides={showGuides}
      />
    </div>
  );
}
