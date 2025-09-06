import { body, param, query } from 'express-validator';

export const createHotelValidator = [
  body('name')
    .notEmpty()
    .withMessage('Hotel name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Hotel name must be between 2 and 100 characters'),
  
  body('location')
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Location must be between 2 and 200 characters'),
  
  body('entitlements')
    .isArray()
    .withMessage('Entitlements must be an array')
    .custom((value) => {
      const validEntitlements = ['dining', 'spa', 'laundry', 'amenities'];
      if (!Array.isArray(value)) return false;
      return value.every(item => validEntitlements.includes(item));
    })
    .withMessage('Invalid entitlements. Must be one of: dining, spa, laundry, amenities')
];

export const updateHotelValidator = [
  param('hotelId')
    .notEmpty()
    .withMessage('Hotel ID is required')
    .isLength({ min: 1 })
    .withMessage('Invalid hotel ID'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Hotel name must be between 2 and 100 characters'),
  
  body('location')
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage('Location must be between 2 and 200 characters'),
  
  body('entitlements')
    .optional()
    .isArray()
    .withMessage('Entitlements must be an array')
    .custom((value) => {
      if (!value) return true; // Optional field
      const validEntitlements = ['dining', 'spa', 'laundry', 'amenities'];
      if (!Array.isArray(value)) return false;
      return value.every(item => validEntitlements.includes(item));
    })
    .withMessage('Invalid entitlements. Must be one of: dining, spa, laundry, amenities')
];

export const hotelIdValidator = [
  param('hotelId')
    .notEmpty()
    .withMessage('Hotel ID is required')
    .isLength({ min: 1 })
    .withMessage('Invalid hotel ID')
];

export const paginationValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer')
];
