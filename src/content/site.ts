import type { IconName } from "@/components/Icon";

/*
  All marketing copy lives here.
  Numbers, reviews, prices and customer names are placeholders — swap them for
  real data before launch.
*/

export const site = {
  name: "ClearShotX",
  tagline: "Screenshots & screen recording for Mac",
  description:
    "ClearShotX is the native Mac app for screenshots, screen recordings and annotations — with on-device AI that hides what's private and copies what's useful.",
  downloadUrl: "#download",
  requirements: "macOS 13 Ventura or later · Apple silicon & Intel",
  supportEmail: "hello@clearshotx.app",
};

export const navFeatures: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "area", title: "Screenshots", text: "Area, window, scrolling & timed", href: "#features" },
  { icon: "pencil", title: "Annotate", text: "Arrows, blur, counters, text", href: "#annotate" },
  { icon: "video", title: "Screen recording", text: "4K60 with webcam & keystrokes", href: "#record" },
  { icon: "ocr", title: "Text recognition", text: "Copy text from any pixel", href: "#more" },
  { icon: "sparkles", title: "Smart Redact", text: "On-device AI privacy blur", href: "#more" },
  { icon: "cloud", title: "Cloud links", text: "Instant share on your domain", href: "#more" },
];

export const logos = ["Northwind", "Halcyon", "Lumen", "Parallel", "Kestrel", "Fernway", "Orbit", "Quill"] as const;

export const statement =
  "ClearShotX lives in your menu bar and turns every screenshot, recording and idea into something *instantly clear* — annotated, shared and private by default.";

export const captureModes: { icon: IconName; label: string; keys: string }[] = [
  { icon: "area", label: "Area", keys: "⇧⌘4" },
  { icon: "window", label: "Window", keys: "⇧⌘5" },
  { icon: "fullscreen", label: "Fullscreen", keys: "⇧⌘3" },
  { icon: "scroll", label: "Scrolling", keys: "⇧⌘6" },
  { icon: "timer", label: "Self-timer", keys: "⌥⇧⌘4" },
  { icon: "freeze", label: "Freeze screen", keys: "⌃⇧⌘4" },
];

export const stats = [
  { prefix: "Up to", value: 0.2, decimals: 1, suffix: "s", label: "From shortcut to clipboard" },
  { prefix: "Up to", value: 60, decimals: 0, suffix: " fps", label: "4K screen recording" },
  { prefix: "Under", value: 1, decimals: 0, suffix: "%", label: "CPU while idle in your menu bar" },
];

export const recordPoints = [
  "Webcam bubble, mic & system audio",
  "Click and keystroke overlays",
  "Trim, mute and crop in place",
  "Export as MP4 or crisp, tiny GIF",
];

export const extras = [
  "Self-timer",
  "Freeze screen",
  "Crosshair & magnifier",
  "Color picker",
  "Window shadows",
  "@1x / @2x export",
  "Do Not Disturb while recording",
  "Drag & drop anywhere",
  "Custom shortcuts",
  "Auto-save to any folder",
  "Hide desktop icons",
  "Pixel ruler",
  "Raycast & Alfred",
  "Shortcuts.app actions",
  "URL scheme API",
  "Menu bar or Dock",
];

export const switchReasons: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "bolt",
    title: "Truly native",
    text: "Written in Swift and tuned for Apple silicon. A tiny download that opens instantly and never drags on your battery.",
  },
  {
    icon: "shield",
    title: "Private by default",
    text: "Text recognition and Smart Redact run entirely on your Mac. No account, no tracking, no uploads you didn't ask for.",
  },
  {
    icon: "heart",
    title: "Fair, forever",
    text: "Buy once and keep it. Cloud is an optional extra — never a toll on features you already paid for.",
  },
];

export type Review = { name: string; role: string; text: string; hue: number };

export const reviews: Review[] = [
  {
    name: "Maya Lindqvist",
    role: "Design Lead, Northwind",
    text: "The annotation tools are so good that our bug reports finally make sense. Blur, arrow, done — in seconds.",
    hue: 262,
  },
  {
    name: "Daniel Okafor",
    role: "iOS Engineer",
    text: "Scrolling capture alone paid for it. Whole Slack threads and long docs in one clean image.",
    hue: 210,
  },
  {
    name: "Priya Raman",
    role: "Product Manager, Halcyon",
    text: "I record a quick walkthrough instead of writing a spec. The keystroke overlay makes every demo crystal clear.",
    hue: 330,
  },
  {
    name: "Leo Brandt",
    role: "Indie Developer",
    text: "Feels like something Apple should have shipped. Fast, quiet, and it never gets in my way.",
    hue: 150,
  },
  {
    name: "Sofia Marín",
    role: "Support Lead, Lumen",
    text: "Smart Redact catches customer emails before I even think about it. That's a compliance win, not just a nice touch.",
    hue: 25,
  },
  {
    name: "Kenji Watanabe",
    role: "Technical Writer",
    text: "The OCR is scary accurate, even on screenshots of screenshots. I copy code out of videos now.",
    hue: 190,
  },
  {
    name: "Amara Cole",
    role: "Founder, Fernway",
    text: "Our whole team switched in a week. Shared links on our own domain make everything feel on-brand.",
    hue: 290,
  },
  {
    name: "Tomás Novak",
    role: "Developer Advocate",
    text: "GIF export is ridiculous — crisp, tiny files that look great in every README and PR.",
    hue: 45,
  },
];

export type Plan = {
  name: string;
  blurb: string;
  price: { monthly: number; yearly: number } | number;
  unit: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Personal",
    blurb: "Everything you need, yours to keep.",
    price: 24,
    unit: "one-time",
    cta: "Buy ClearShotX",
    features: [
      "Every capture & recording tool",
      "Full annotation editor",
      "Text recognition & Smart Redact",
      "1 year of free updates",
      "Use on up to 2 Macs",
    ],
  },
  {
    name: "Pro",
    blurb: "For people who share all day.",
    price: { monthly: 8, yearly: 6 },
    unit: "per month",
    cta: "Start free trial",
    featured: true,
    features: [
      "Everything in Personal",
      "Unlimited cloud uploads",
      "Links on your own domain",
      "Password & self-destruct links",
      "Always the latest version",
    ],
  },
  {
    name: "Team",
    blurb: "One library for the whole crew.",
    price: { monthly: 7, yearly: 5 },
    unit: "per user / month",
    cta: "Contact sales",
    features: [
      "Everything in Pro",
      "Shared team library",
      "SSO & admin controls",
      "Centralized billing",
      "Priority support",
    ],
  },
];

export const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. Every feature is unlocked for 14 days, with no account and no credit card. If you don't love it, just delete the app.",
  },
  {
    q: "Is it really a one-time purchase?",
    a: "The Personal license is yours forever and includes a year of updates. After that you can keep using your version, or renew updates at a discount whenever you like.",
  },
  {
    q: "Does it run on Apple silicon and Intel Macs?",
    a: "Both. ClearShotX is a universal app tuned for M-series chips, and supports macOS 13 Ventura and later.",
  },
  {
    q: "Where are my screenshots stored?",
    a: "On your Mac, in a folder you choose. Nothing leaves your machine unless you upload it — and on-device features like text recognition and Smart Redact never touch the network.",
  },
  {
    q: "I'm switching from another screenshot app. Is it easy?",
    a: "Very. Point ClearShotX at your existing screenshot folder and remap any shortcut in a couple of clicks, so your muscle memory keeps working from day one.",
  },
  {
    q: "Do you offer education or team discounts?",
    a: "Students and educators get 50% off, and teams of 10+ get volume pricing. Drop us a line and we'll sort you out.",
  },
];

export const footerLinks = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap", "Download"] },
  { title: "Resources", links: ["Help Center", "Shortcuts guide", "URL scheme API", "Press kit"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
];
