import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import '../styles/SocialMediaLinks.css';

const SocialMediaLinks = () => {
    return (
        <div className="social-media-container">
            {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                <FaFacebookF />
            </a> */}
            <a href="https://x.com/slashurl" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                <FaTwitter />
            </a>
            <a href="https://www.instagram.com/slashurl/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/gourav-modi-10b3591a1/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <FaLinkedinIn />
            </a>
            <a href="https://www.github.com/vickyjsr" target="_blank" rel="noopener noreferrer" className="social-icon github">
                <FaGithub />
            </a>
        </div>
    );
};

export default SocialMediaLinks;
