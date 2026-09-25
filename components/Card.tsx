// components/Card.tsx
"use client";

interface CardProps {
  title: string;
  type: string;
  link?: string;
}

export function Card({ title, type, link }: CardProps) {
  // Helper to extract YouTube Embed URL
  const getEmbedLink = (url: string) => {
    return url.replace("watch?v=", "embed/");
  };

  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 shadow-sm max-w-72 min-h-48 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-sm font-semibold mb-2 capitalize text-gray-700">
          <span>{type}</span>
        </div>
        <h3 className="font-bold text-lg text-black mb-2">{title}</h3>

        {type === "video" && link && (
          <iframe
            className="w-full h-36 rounded"
            src={getEmbedLink(link)}
            title={title}
            allowFullScreen
          ></iframe>
        )}

        {type === "note" && (
          <p className="text-gray-600 text-sm">{link}</p>
        )}

        {type === "tweet" && link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline"
          >
            View Tweet →
          </a>
        )}
      </div>
    </div>
  );
}