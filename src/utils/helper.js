// src/utils/helpers.js
export const generateUniqueId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
