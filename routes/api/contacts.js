import express from "express";
import { contactsController } from "../../controllers/index.js";
import validator from "../../decorators/validator.js";
import contactsSchema from "../../schema/contacts-schema.js";


const router = express.Router()

router.get('/', contactsController.getAllContactsCtrl)

router.get('/:contactId', contactsController.getOneContactCtrl)

router.delete('/:contactId', contactsController.delContactCtrl)

router.post('/', validator(contactsSchema), contactsController.addContactCtrl)

router.put('/:contactId', validator(contactsSchema), contactsController.putContactCtrl)

export default router
