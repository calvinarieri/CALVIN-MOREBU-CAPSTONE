import { protectedAxiosInstance } from "./axios";

const handleApiCall = async (requestPromise) => {
  try {
    const res = await requestPromise;
    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message },
    };
  }
};


export const searchArticles = (searchTerm) => 
  handleApiCall(protectedAxiosInstance.get('/docs/search/', { params: { q: searchTerm } }));


export const getArticles = () => 
  handleApiCall(protectedAxiosInstance.get('/docs/articles/'));

export const getStaffArticles = () => 
  handleApiCall(protectedAxiosInstance.get('/docs/articles/staff-articles/'));

export const getArticleById = (id) => 
  handleApiCall(protectedAxiosInstance.get(`/docs/articles/${id}/`));

export const createArticle = (data) => 
  handleApiCall(protectedAxiosInstance.post('/docs/articles/', data));

export const updateArticle = (id, data) => 
  handleApiCall(protectedAxiosInstance.put(`/docs/articles/${id}/`, data));

export const patchArticle = (id, data) => 
  handleApiCall(protectedAxiosInstance.patch(`/docs/articles/${id}/`, data));

export const deleteArticle = (id) => 
  handleApiCall(protectedAxiosInstance.delete(`/docs/articles/${id}/`));


export const getCategories = () => 
  handleApiCall(protectedAxiosInstance.get('/docs/categories/'));

export const getCategoryById = (id) => 
  handleApiCall(protectedAxiosInstance.get(`/docs/categories/${id}/`));

export const createCategory = (data) => 
  handleApiCall(protectedAxiosInstance.post('/docs/categories/', data));

export const updateCategory = (id, data) => 
  handleApiCall(protectedAxiosInstance.put(`/docs/categories/${id}/`, data));

export const patchCategory = (id, data) => 
  handleApiCall(protectedAxiosInstance.patch(`/docs/categories/${id}/`, data));

export const deleteCategory = (id) => 
  handleApiCall(protectedAxiosInstance.delete(`/docs/categories/${id}/`));

export const getTags = () => 
  handleApiCall(protectedAxiosInstance.get('/docs/tags/'));

export const getTagById = (id) => 
  handleApiCall(protectedAxiosInstance.get(`/docs/tags/${id}/`));

export const createTag = (data) => 
  handleApiCall(protectedAxiosInstance.post('/docs/tags/', data));

export const updateTag = (id, data) => 
  handleApiCall(protectedAxiosInstance.put(`/docs/tags/${id}/`, data));

export const patchTag = (id, data) => 
  handleApiCall(protectedAxiosInstance.patch(`/docs/tags/${id}/`, data));

export const deleteTag = (id) => 
  handleApiCall(protectedAxiosInstance.delete(`/docs/tags/${id}/`));


export const getArticleTags = () => 
  handleApiCall(protectedAxiosInstance.get('/docs/article-tags/'));

export const getArticleTagById = (id) => 
  handleApiCall(protectedAxiosInstance.get(`/docs/article-tags/${id}/`));

export const createArticleTag = (data) => 
  handleApiCall(protectedAxiosInstance.post('/docs/article-tags/', data));

export const updateArticleTag = (id, data) => 
  handleApiCall(protectedAxiosInstance.put(`/docs/article-tags/${id}/`, data));

export const deleteArticleTag = (id) => 
  handleApiCall(protectedAxiosInstance.delete(`/docs/article-tags/${id}/`));

export const getArticleVersions = () => 
  handleApiCall(protectedAxiosInstance.get('/docs/versions/'));

export const getArticleVersionById = (id) => 
  handleApiCall(protectedAxiosInstance.get(`/docs/versions/${id}/`));

export const createArticleVersion = (data) => 
  handleApiCall(protectedAxiosInstance.post('/docs/versions/', data));

export const updateArticleVersion = (id, data) => 
  handleApiCall(protectedAxiosInstance.put(`/docs/versions/${id}/`, data));

export const patchArticleVersion = (id, data) => 
  handleApiCall(protectedAxiosInstance.patch(`/docs/versions/${id}/`, data));

export const deleteArticleVersion = (id) => 
  handleApiCall(protectedAxiosInstance.delete(`/docs/versions/${id}/`));


export const getArticleImages = () => 
  handleApiCall(protectedAxiosInstance.get('/docs/images/'));

export const getArticleImageById = (id) => 
  handleApiCall(protectedAxiosInstance.get(`/docs/images/${id}/`));

export const uploadArticleImage = (formData) => 
  handleApiCall(protectedAxiosInstance.post('/docs/images/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }));

export const updateArticleImage = (id, formData) => 
  handleApiCall(protectedAxiosInstance.put(`/docs/images/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }));

export const deleteArticleImage = (id) => 
  handleApiCall(protectedAxiosInstance.delete(`/docs/images/${id}/`));