export const getEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  };
  
  export const AUTH0_DOMAIN = getEnvVar('REACT_APP_AUTH0_DOMAIN');
  export const AUTH0_CLIENT_ID = getEnvVar('REACT_APP_AUTH0_CLIENT_ID');
  export const AUTH0_AUDIENCE = getEnvVar('REACT_APP_AUTH0_AUDIENCE');
  