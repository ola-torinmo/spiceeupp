import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://157.230.178.194/api/v1/',
      headers: {
        'Content-Type': 'application/json',
        // other common headers can be added sha
      },
    });

    // Interceptor for handling request
    this.api.interceptors.request.use(
      (config) => {
        const accessToken = '';
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor for handling response
    this.api.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error) {
          console.error('Error:', error);
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, config) {
    return this.api.get(url, config);
  }

  async post(url, data, config) {
    return this.api.post(url, data, config);
  }

  async put(url, data, config) {
    return this.api.put(url, data, config);
  }

  async patch(url, data, config) {
    return this.api.patch(url, data, config);
  }

  async delete(url, config) {
    return this.api.delete(url, config);
  }
  
  async uploadFile(url, file, config) {
    const formData = new FormData();
    formData.append('file', file);

    return this.api.post(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new ApiService();