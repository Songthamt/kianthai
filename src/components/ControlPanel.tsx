import { Printer, RotateCcw, Type, Rows3, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface ControlPanelProps {
  name: string;
  onNameChange: (v: string) => void;
  repetitions: number;
  onRepetitionsChange: (v: number) => void;
  isLandscape: boolean;
  onOrientationToggle: () => void;
  fontSize: number;
  onFontSizeChange: (v: number) => void;
  showGuides: boolean;
  onGuidesToggle: () => void;
  onPrint: () => void;
}

const fontSizeLabels = ["Toddler", "Beginner", "Standard", "Advanced"];

function getFontLabel(size: number) {
  if (size >= 64) return fontSizeLabels[0];
  if (size >= 44) return fontSizeLabels[1];
  if (size >= 28) return fontSizeLabels[2];
  return fontSizeLabels[3];
}

export function ControlPanel({
  name,
  onNameChange,
  repetitions,
  onRepetitionsChange,
  isLandscape,
  onOrientationToggle,
  fontSize,
  onFontSizeChange,
  showGuides,
  onGuidesToggle,
  onPrint,
}: ControlPanelProps) {
  return (
    <aside className="no-print w-80 shrink-0 bg-panel border-r border-border flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-mint flex items-center justify-center">
            <span className="text-xl -translate-y-0.5">✍️</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">
              เขียนไทย Kian Thai
            </h1>
            <p className="text-xs text-muted-foreground">
              สร้างใบงาน Worksheet Maker
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 p-5 space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="childName" className="text-sm font-semibold text-panel-foreground">
            คำที่ต้องการฝึก — Practice Text
          </Label>
          <Input
            id="childName"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="พิมพ์ที่นี่ — Type here..."
            className="text-lg bg-secondary border-border focus:ring-primary"
          />
        </div>

        {/* Repetitions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-panel-foreground flex items-center gap-1.5">
              <Rows3 className="w-4 h-4 text-muted-foreground" />
              จำนวนแถว Rows
            </Label>
            <span className="text-xs font-bold text-primary bg-mint/30 px-2 py-0.5 rounded-full">
              {repetitions}
            </span>
          </div>
          <Slider
            value={[repetitions]}
            onValueChange={([v]) => onRepetitionsChange(v)}
            min={1}
            max={15}
            step={1}
          />
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-panel-foreground flex items-center gap-1.5">
              <Type className="w-4 h-4 text-muted-foreground" />
              ขนาดตัวอักษร Font Size
            </Label>
            <span className="text-xs font-bold text-accent bg-coral/30 px-2 py-0.5 rounded-full">
              {getFontLabel(fontSize)}
            </span>
          </div>
          <Slider
            value={[fontSize]}
            onValueChange={([v]) => onFontSizeChange(v)}
            min={18}
            max={80}
            step={2}
          />
        </div>

        {/* Orientation */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-panel-foreground flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
            แนววางกระดาษ Orientation
          </Label>
          <div className="flex gap-2">
            <button
              onClick={() => !isLandscape || onOrientationToggle()}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                !isLandscape
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-muted"
              }`}
            >
              Portrait
            </button>
            <button
              onClick={() => isLandscape || onOrientationToggle()}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isLandscape
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-muted"
              }`}
            >
              Landscape
            </button>
          </div>
        </div>

        {/* Guide Lines */}
        <div className="flex items-center justify-between py-3 px-4 bg-secondary rounded-lg">
          <Label className="text-sm font-semibold text-panel-foreground flex items-center gap-1.5 cursor-pointer">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            Guide Lines
          </Label>
          <Switch checked={showGuides} onCheckedChange={onGuidesToggle} />
        </div>
      </div>

      {/* Print Button */}
      <div className="p-5 border-t border-border">
        <Button
          onClick={onPrint}
          className="w-full h-11 bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 shadow-md"
          size="lg"
        >
          <Printer className="w-4 h-4 mr-2" />
          Prepare for Print
        </Button>
      </div>
    </aside>
  );
}
