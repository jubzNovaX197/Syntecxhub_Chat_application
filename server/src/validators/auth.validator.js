import { body } from 'express-validator';

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('username')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 24 })
    .withMessage('Username must be between 3 and 24 characters')
    .matches(/^[a-z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 72 })
    .withMessage('Password must be between 8 and 72 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must include at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must include at least one lowercase letter')
    .matches(/\d/)
    .withMessage('Password must include at least one number')
];

export const loginValidator = [
  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
];
