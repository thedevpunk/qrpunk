"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QrCode } from "lucide-react";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";

type Code = {
  url: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: string;
};

const defaultCode = {
  url: "",
  size: 256,
  fgColor: "#000000",
  bgColor: "transparent",
  level: "H",
};

export default function Home() {
  var codeRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState<Code>(defaultCode);

  const handleDonwloadClick = () => {
    const svg = codeRef.current!.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg!);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");

    img.onload = () => {
      canvas.width = code.size;
      canvas.height = code.size;
      ctx!.drawImage(img, 0, 0, code.size, code.size);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "QRCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const handleResetClick = () => {
    setCode(defaultCode);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 sm:p-12">
      <Card className="w-full sm:max-w-[400px] border-0 sm:border">
        <CardHeader>
          <div className="flex gap-1">
            <QrCode className="text-emerald-600" />
            <CardTitle>QR Punk</CardTitle>
          </div>
          <CardDescription>Create your QR-Code easy as hell.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">Url</Label>
              <Input
                id="url"
                name="url"
                value={code.url}
                onChange={(event) =>
                  setCode({ ...code, url: event.currentTarget.value })
                }
                placeholder="Type in your url"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-grow flex-col space-y-1.5">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  name="size"
                  value={code.size}
                  onChange={(event) =>
                    setCode({
                      ...code,
                      size: Number(event.currentTarget.value),
                    })
                  }
                  placeholder="Size in px"
                />
              </div>
              <div className="flex flex-grow flex-col space-y-1.5">
                <Label htmlFor="level">Level</Label>
                <Select
                  name="level"
                  value={code.level}
                  onValueChange={(value) => setCode({ ...code, level: value })}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="Q">Q</SelectItem>
                    <SelectItem value="H">H</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-grow flex-col space-y-1.5">
                <Label htmlFor="fgColor">Foreground Color</Label>
                <Input
                  id="fgColor"
                  name="fgColor"
                  value={code.fgColor}
                  onChange={(event) =>
                    setCode({ ...code, fgColor: event.currentTarget.value })
                  }
                  placeholder="Color in Hex or 'transparent'"
                />
              </div>
              <div className="flex flex-grow flex-col space-y-1.5">
                <Label htmlFor="bgColor">Background Color</Label>
                <Input
                  id="bgColor"
                  name="bgColor"
                  value={code.bgColor}
                  onChange={(event) =>
                    setCode({ ...code, bgColor: event.currentTarget.value })
                  }
                  placeholder="Color in Hex or 'transparent'"
                />
              </div>
            </div>
          </div>
          <div
            ref={codeRef}
            className="w-full h-auto aspect-square flex items-center justify-center p-6 bg-gradient-to-r from-teal-400 to-emerald-400 rounded"
          >
            <QRCode
              className="w-full h-full max-w-[320px] max-h-[320px]"
              value={code.url}
              fgColor={code.fgColor}
              bgColor={code.bgColor}
              level={code.level}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleResetClick} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleDonwloadClick}>Download</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
