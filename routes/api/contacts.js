import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";
import Joi from "joi";
import { HttpError } from "../../helpers/index.js"

const contactsSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  })
}).required().messages({
  "any.required": "missing fields",
});

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  }
  catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) throw HttpError(404, `Movie with id=${id} not found`);
    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({
      message: "Contact deleted",
      result,
    })
  }
  catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router
