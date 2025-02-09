import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Redirect = () => {
    const { code } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const redirectToOriginalUrl = async () => {
            try {
                const response = await api.getOriginalUrl(code);
                if (response && response.originalUrl) {
                    window.location.href = response.originalUrl;
                } else {
                    setError('Invalid URL');
                }
            } catch (err) {
                setError(err.message || 'Failed to redirect');
            }
        };

        redirectToOriginalUrl();
    }, [code]);

    if (error) {
        return (
            <div className="redirect-error">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="redirect-loading">
            <h1>Redirecting...</h1>
            <div className="loader"></div>
        </div>
    );
};

export default Redirect; 