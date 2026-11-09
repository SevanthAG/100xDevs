interface VideoProps {
  url: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function Video({
  url,
  className = "w-full aspect-video object-cover rounded-xl shadow-md bg-muted",
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
}: VideoProps) {
  return (
    <video
      src={url}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
    />
  );
}
