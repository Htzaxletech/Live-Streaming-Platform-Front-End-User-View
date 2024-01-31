import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface SocialLinkProps {
  platform: 'facebook' | 'linkedin' | 'twitter';
  username: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ platform, username }) => {
  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return <FaFacebook />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'twitter':
        return <FaTwitter />;
      default:
        return null;
    }
  };

  const getLink = () => {
    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/${username}`;
      case 'linkedin':
        return `https://www.linkedin.com/in/${username}`;
      case 'twitter':
        return `https://twitter.com/${username}`;
      default:
        return '#';
    }
  };

  return (
    <a
      href={getLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1 text-base bg-foreground/10 px-2 py-1 rounded-md"
    >
      {getIcon()}
      <span className="hidden md:inline-block">{platform}</span>
    </a>
  );
};

export default SocialLink;
