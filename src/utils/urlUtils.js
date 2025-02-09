export const validateUrl = (url) => {
    try {
        const urlObject = new URL(url);
        // Allow URLs that are just domains with or without trailing slash
        return urlObject.protocol.startsWith('http');
    } catch (err) {
        return false;
    }
};

export const formatUrl = (url) => {
    if (!url) return '';
    let formattedUrl = url;
    if (!url.startsWith('http')) {
        formattedUrl = `https://${url}`;
    }
    // Remove trailing slash if it's the only thing after domain
    if (formattedUrl.endsWith('/') && formattedUrl.split('/').length === 4) {
        formattedUrl = formattedUrl.slice(0, -1);
    }
    return formattedUrl;
}; 