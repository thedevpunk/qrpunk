"use client";

// import * as React from "react";

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
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

type Code = {
  url: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: string;
};

const defaultCode = {
  url: "google.com",
  size: 256,
  fgColor: "#000000",
  bgColor: "transparent",
  level: "H",
};

export default function Home() {
  var codeRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState<Code>(defaultCode);
  const [url, setUrl] = useState("asd");

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

    //  if (!codeRef.current) return;

    //  const canvas = codeRef.current.querySelector("svg");
    //  console.log(canvas);
    //  if (!canvas) return;
    //  const image = canvas.toDataURL("image/png");
    //  const link = document.createElement("a");
    //  link.download = "qr-code.png";
    //  link.href = image;
    //  document.body.appendChild(link);
    //  link.click();
    //  document.body.removeChild(link);
  };

  const handleResetClick = () => {
    setCode(defaultCode);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Card className="mw-[350px]">
        <CardHeader>
          <CardTitle>Create QR-Code</CardTitle>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                name="size"
                value={code.size}
                onChange={(event) =>
                  setCode({ ...code, size: Number(event.currentTarget.value) })
                }
                placeholder="Size in px"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
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
          <div ref={codeRef} className="p-6 bg-emerald-400">
            <QRCode
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

// import { Card, CardDescription, CardHeader } from "@/components/ui/card";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <Card className="px-6 py-4">
//         <CardHeader>QR-Code Generator</CardHeader>
//         <CardDescription>Please create your QR-Code</CardDescription>
//       </Card>
//       {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div> */}
//     </main>
//   );
// }
