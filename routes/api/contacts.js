import express from "express";
import { contactsController } from "../../controllers/index.js";
import validator from "../../decorators/validator.js";
import contactsSchema from "../../schema/contacts-schema.js";
import { validIdCheck, emptyBodyCheck } from "../../middlewares/index.js";


const router = express.Router()

router.get('/', contactsController.getAllContactsCtrl)

router.get('/:contactId', validIdCheck, contactsController.getOneContactCtrl)

router.delete('/:contactId', validIdCheck, contactsController.delContactCtrl)

router.post('/', emptyBodyCheck, validator(contactsSchema), contactsController.addContactCtrl)

router.put('/:contactId', validIdCheck, validator(contactsSchema), contactsController.putContactCtrl)

router.patch('/:contactId/favorite', validIdCheck, validator(contactsSchema), contactsController.putContactCtrl)

export default router
