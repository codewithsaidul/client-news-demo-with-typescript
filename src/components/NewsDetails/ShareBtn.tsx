import { Facebook, Linkedin, Twitter } from "lucide-react";

interface ShareProps {
  url: string;
  title: string;
}

export default function ShareBtn({ url, title }: ShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  return (
    <div className="flex items-center gap-2">
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-news-headline duration-500 hover:text-news-cta hober:duration-500">
        <Facebook size={20} />
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-news-headline duration-500 hover:text-news-cta hober:duration-500">
        <Twitter size={20} />
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-news-headline duration-500 hover:text-news-cta hober:duration-500">
        <Linkedin size={20} />
      </a>
    </div>
  );
}
