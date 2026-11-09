import React from "react";

export interface AuthLeftProps {
  badge?: string;
  title?: string;
  description?: string;
  features?: string[];
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
}

export function AuthLeft({
  badge = "Higgfield AI",
  title = "Turn your imagination into cinematic videos.",
  description = "Experience the next generation of AI-powered video creation. Craft photorealistic visuals and dynamic motions effortlessly.",
  features = [
    "Text-to-video generation with natural motion",
    "High-resolution cinematic rendering",
    "Real-time creative camera controls",
  ],
  quote = {
    text: "Higgfield has completely changed how quickly we can prototype and produce studio-grade visual effects.",
    author: "Creative Director",
    role: "Visual Effects Studio",
  },
}: AuthLeftProps) {
  return (
    <div className="flex w-full max-w-lg flex-col justify-center space-y-8 py-6">
      <div className="space-y-3">
        {badge && (
          <div className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
            {badge}
          </div>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {features && features.length > 0 && (
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {quote && (
        <div className="rounded-lg border border-border bg-card/60 p-5 backdrop-blur-xs">
          <p className="italic text-sm text-muted-foreground">"{quote.text}"</p>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">{quote.author}</span>
            {quote.role && (
              <span className="text-muted-foreground">{quote.role}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
