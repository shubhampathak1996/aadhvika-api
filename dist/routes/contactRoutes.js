"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactController_1 = require("../controllers/ContactController");
const validateRequest_1 = require("../middlewares/validateRequest");
const ContactSchema_1 = require("../validations/ContactSchema");
const router = (0, express_1.Router)();
/**
 * @route POST /api/contacts
 * @desc Create a new contact message
 * @access Public
 */
router.post('/', (0, validateRequest_1.validateRequest)(ContactSchema_1.createContactSchema), ContactController_1.ContactController.createContact);
/**
 * @route GET /api/contacts
 * @desc Get all contact messages
 * @access Private (Admin)
 */
router.get('/', ContactController_1.ContactController.getAllContacts);
/**
 * @route DELETE /api/contacts/:id
 * @desc Delete contact message
 * @access Private (Admin)
 */
router.delete('/:id', ContactController_1.ContactController.deleteContact);
exports.default = router;
