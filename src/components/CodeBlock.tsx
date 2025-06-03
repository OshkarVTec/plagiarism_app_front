import { clsx } from "clsx";

interface CodeBlockProps {
  filename: string;
  content: string;
  highlightRanges: [number, number][];
}

export function CodeBlock({ filename, content, highlightRanges }: CodeBlockProps) {
  const lines = content.split("\n");

  // Convierte los rangos a un Set para acceso rápido
  const highlightedLines = new Set<number>();
  highlightRanges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      highlightedLines.add(i);
    }
  });

  return (
    <div className="rounded border border-black overflow-auto max-h-[400px] w-full">
      <div className="bg-gray-100 px-2 py-1 text-left font-semibold border-b border-black">
        {filename}
      </div>
      <pre className="text-xs p-2">
        {lines.map((line, index) => (
          <div
            key={index}
            className={clsx(
              "whitespace-pre-wrap",
              highlightedLines.has(index + 1) ? "bg-yellow-200" : ""
            )}
          >
            <span className="text-gray-400 select-none mr-2">
              {String(index + 1).padStart(3, " ")}
            </span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
}
