const config = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/v1',
    APP_URL: process.env.REACT_APP_URL || 'http://localhost:3000',
    ENV: process.env.REACT_APP_ENV || 'development',
    APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
    // Add other configuration variables here
};

// Validate required environment variables
const requiredEnvVars = ['API_BASE_URL'];

requiredEnvVars.forEach(envVar => {
    if (!config[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

export default config; 