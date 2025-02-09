import React, { useState } from 'react';
import { FiCopy, FiLink, FiCheck, FiArrowRight } from 'react-icons/fi';
import api from '../services/api';
import config from '../config';
import '../styles/UrlShortener.css';
import { validateUrl, formatUrl } from '../utils/urlUtils';

const UrlShortener = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const getFullShortenedUrl = (code) => {
        return `${config.APP_URL}/${code}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShortenedUrl('');
        setCopied(false);

        try {
            const formattedUrl = formatUrl(originalUrl);
            const shortUrlResponse = await api.createShortUrl(formattedUrl);
            
            if (shortUrlResponse && shortUrlResponse.tinyUrl) {
                setShortenedUrl(getFullShortenedUrl(shortUrlResponse.tinyUrl));
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            setError(err.message || 'Failed to shorten URL. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortenedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setError('Failed to copy to clipboard');
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setOriginalUrl(url);
        if (url && !validateUrl(formatUrl(url))) {
            setError('Please enter a valid URL (e.g., https://example.com)');
        } else {
            setError('');
        }
    };

    return (
        <div className="url-shortener-container">
            <div className="url-shortener-card">
                <h1>Transform<br />Your Links</h1>
                <p className="subtitle">Create memorable, shareable links in seconds with our powerful URL shortener</p>
                
                <form onSubmit={handleSubmit} className="url-form">
                    <div className="input-group">
                        <FiLink className="input-icon" />
                        <input
                            type="url"
                            value={originalUrl}
                            onChange={handleUrlChange}
                            placeholder="Paste your long URL here"
                            required
                            pattern="https?://.*"
                            title="Please enter a valid URL starting with http:// or https://"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading || !originalUrl || !validateUrl(formatUrl(originalUrl))}
                        className={loading ? 'loading' : ''}
                    >
                        {loading ? 'Processing...' : (
                            <>
                                Shorten URL
                                <FiArrowRight style={{ marginLeft: '10px' }} />
                            </>
                        )}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {shortenedUrl && (
                    <div className="result-container">
                        <div className="shortened-url">
                            <input 
                                type="text" 
                                value={shortenedUrl} 
                                readOnly 
                                className={copied ? 'success-animation' : ''}
                            />
                            <button 
                                onClick={copyToClipboard} 
                                className={`copy-button ${copied ? 'success-animation' : ''}`}
                                title="Copy to clipboard"
                            >
                                {copied ? <FiCheck /> : <FiCopy />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UrlShortener; 