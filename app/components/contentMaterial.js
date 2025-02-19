"use client";

import { FileText, Video, FileType } from "lucide-react";
import { useMaterial } from "../contexts/MaterialContext";

export function Content() {
  const { selectedMaterial } = useMaterial();

  if (!selectedMaterial) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a material from the sidebar</p>
      </div>
    );
  }

  const renderHeader = (icon) => (
    <div className="mb-6 text-gray-900">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h2 className="text-2xl font-bold">
          {selectedMaterial.material_title}
        </h2>
      </div>
    </div>
  );

  const getEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      // Handle YouTube Shorts and Normal Video URLs
      if (
        parsedUrl.hostname.includes("youtube.com") ||
        parsedUrl.hostname.includes("youtu.be")
      ) {
        let videoId = parsedUrl.searchParams.get("v"); // Regular YouTube URL
        if (!videoId && parsedUrl.hostname.includes("youtu.be")) {
          videoId = parsedUrl.pathname.split("/")[1]; // Handle short URLs (youtu.be/ID)
        }

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&origin=${window.location.origin}`;
        }
      }

      return url; // If not a YouTube URL, return the original
    } catch (error) {
      console.error("Invalid video URL:", url, error);
      return url;
    }
  };

  const getDocumentEmbedUrl = (url) => {
    if (url.includes("drive.google.com")) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(
        url
      )}&embedded=true`;
    }

    if (url.endsWith(".pdf")) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(
        url
      )}&embedded=true`;
    }

    if (url.endsWith(".ppt") || url.endsWith(".pptx")) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        url
      )}`;
    }

    return url;
  };

  const renderContent = () => {
    if (selectedMaterial.material_text) {
      return (
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          {renderHeader(<FileText className="text-blue-600" size={24} />)}
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {selectedMaterial.material_text}
          </p>
        </div>
      );
    }

    if (selectedMaterial.material_pdf || selectedMaterial.material_ppt) {
      const docUrl = getDocumentEmbedUrl(
        selectedMaterial.material_pdf || selectedMaterial.material_ppt
      );
      return (
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          {renderHeader(<FileType className="text-blue-600" size={24} />)}

          <p className="text-gray-500 text-sm mb-4">
            If the document does not load,{" "}
            <a
              href={
                selectedMaterial.material_pdf || selectedMaterial.material_ppt
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              click here to open it in a new tab.
            </a>
          </p>

          <iframe
            src={docUrl}
            className="w-full h-[calc(100vh-16rem)] rounded-lg border"
            title={selectedMaterial.material_title}
          />
        </div>
      );
    }

    if (selectedMaterial.material_video) {
      const embedUrl = getEmbedUrl(selectedMaterial.material_video);
      return (
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          {renderHeader(<Video className="text-blue-600" size={24} />)}

          <p className="text-gray-500 text-sm mb-4">
            If the video does not load,{" "}
            <a
              href={selectedMaterial.material_video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              click here to open it in a new tab.
            </a>
          </p>

          <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              title={selectedMaterial.material_title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    return <p className="text-gray-500 text-center">No content available</p>;
  };

  return (
    <div className="h-full overflow-auto p-6 lg:p-8">{renderContent()}</div>
  );
}
