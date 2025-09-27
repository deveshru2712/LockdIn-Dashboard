import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-8">
      <div className="font-jakarta mx-auto flex max-w-2xl flex-col items-center justify-center gap-12">
        <Badge
          variant={"default"}
          className="border-slate-200 px-2 py-1.5 shadow backdrop-blur-sm"
        >
          <Zap color="lightblue" />
          <span className="ml-1 text-lg text-shadow-2xs">
            Reclaim Your Focus
          </span>
        </Badge>

        <div className="space-y-8 text-center">
          <h1 className="font-sans text-5xl font-bold tracking-tight text-gray-900">
            Ready to Lock In ?
          </h1>
          <p className="font-jakarta mx-auto max-w-md text-lg leading-relaxed font-normal text-gray-700">
            Block distracting websites and reclaim your productivity
          </p>
        </div>

        <div className="max-w-lg space-y-6 text-center">
          <p className="leading-relaxed font-medium text-gray-600">
            Set focused work sessions by temporarily blocking sites like social
            media, streaming platforms, and other digital distractions.
          </p>

          <div className="border-gray-200 pt-6">
            <p className="text-sm font-medium tracking-wide text-gray-500">
              Simple • Effective • Distraction-free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
