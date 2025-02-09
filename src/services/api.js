import config from '../config';

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = new ApiError(
            response.status === 400 ? 'Invalid URL provided' :
            response.status === 404 ? 'URL not found' :
            'An error occurred while processing your request',
            response.status
        );
        throw error;
    }
    return response.json();
};

const api = {
    createShortUrl: async (url) => {
        try {
            const response = await fetch(
                `${config.API_BASE_URL}/newTinyUrl?originalUrl=${encodeURIComponent(url)}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return handleResponse(response);
        } catch (error) {
            throw new ApiError(error.message, error.status);
        }
    },

    getOriginalUrl: async (shortCode) => {
        try {
            const response = await fetch(
                `${config.API_BASE_URL}/getUrl?tinyUrl=${encodeURIComponent(shortCode)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return handleResponse(response);
        } catch (error) {
            throw new ApiError(error.message, error.status);
        }
    },
};

export default api; 