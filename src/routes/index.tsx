import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { Printer, Pencil, Eye } from "lucide-react";
import { ControlPanel } from "@/components/ControlPanel";
import { WorksheetPreview } from "@/components/WorksheetPreview";
import { Button } from "@/components/ui/button";

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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

function Index() {
  const [name, setName] = useState("");
  const [repetitions, setRepetitions] = useState(8);
  const [isLandscape, setIsLandscape] = useState(false);
  const [fontSize, setFontSize] = useState(80);
  const [showGuides, setShowGuides] = useState(true);
  const [mobileView, setMobileView] = useState<"edit" | "view">("edit");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="app-shell flex flex-col md:flex-row h-screen overflow-hidden bg-studio-bg">
      <div className="no-print md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-panel border-b border-border">
        <div className="inline-flex items-center bg-secondary rounded-full p-1 shadow-inner">
          <button
            onClick={() => setMobileView("edit")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              mobileView === "edit"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground"
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => setMobileView("view")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              mobileView === "view"
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
        </div>
      </div>

      <div
        className={`${
          isMobile ? (mobileView === "edit" ? "flex" : "hidden") : "flex"
        } flex-1 md:flex-none md:w-80 min-h-0 pb-20 md:pb-0 print:hidden`}
      >
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
          hidePrintButton={isMobile}
        />
      </div>

      <div
        className={`${
          isMobile ? (mobileView === "view" ? "flex" : "hidden") : "flex"
        } flex-1 min-h-0 pb-20 md:pb-0 print:flex print:w-full print:pb-0`}
      >
        <WorksheetPreview
          name={name}
          repetitions={repetitions}
          isLandscape={isLandscape}
          fontSize={fontSize}
          showGuides={showGuides}
        />
      </div>

      <div className="no-print md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-panel/95 backdrop-blur border-t border-border">
        <Button
          onClick={handlePrint}
          className="w-full h-12 bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-lg"
          size="lg"
        >
          <Printer className="w-4 h-4 mr-2" />
          เตรียมพิมพ์ Print
        </Button>
      </div>
    </div>
  );
}
