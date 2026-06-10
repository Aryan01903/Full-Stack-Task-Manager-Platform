import type { Metadata } from "next";
import config from "./config";

type BuildMetadataParams = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

const buildMetadata = ({
  title,
  description,
  keywords = [],
  image = "/logo.svg",
  url,
  noIndex = false,
  type = "website",
}: BuildMetadataParams): Metadata => {
  const fullImageUrl = `${config.webUrl}${image}`;
  const fullUrl = `${config.webUrl}${url}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      images: [{ url: fullImageUrl }],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
};

export default buildMetadata;