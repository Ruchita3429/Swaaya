import express from 'express';
import { submitContactForm } from '../controllers/contact.controller';
import { validateContactForm } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/', validateContactForm, submitContactForm);

export default router;

