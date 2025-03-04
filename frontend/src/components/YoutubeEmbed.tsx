import { Dispatch, SetStateAction, useEffect } from "react";

interface YoutubeEmbedProps {
  props: {
    videoUrl: string;
  };
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}

export function YoutubeEmbed({ props, setAllowNext }: YoutubeEmbedProps) {

  const getEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}?rel=0&modestbranding=1&controls=1`
      : "";
  };

  useEffect(() => {
    if (props.videoUrl) {
      setAllowNext(true); // Allow proceeding without manual validation
    }
  }, [props.videoUrl, setAllowNext]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <iframe
        width="640"
        height="360"
        src={getEmbedUrl(props.videoUrl)}
        allowFullScreen
      ></iframe>
    </div>
  );
}