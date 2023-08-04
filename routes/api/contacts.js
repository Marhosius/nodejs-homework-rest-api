import express from "express";
import { contactsController } from "../../controllers/index.js";
import validator from "../../decorators/validator.js";
import schema from "../../schema/contactSchemaSVR.js";
import { validIdCheck, emptyBodyCheck } from "../../middlewares/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = express.Router()

router.use(authenticate);

router.get('/', contactsController.getAllContactsCtrl)

router.get('/:contactId', validIdCheck, contactsController.getOneContactCtrl)

router.delete('/:contactId', validIdCheck, contactsController.delContactCtrl)

router.post('/', emptyBodyCheck, validator(schema.contactsSchemaSRV), contactsController.addContactCtrl)

router.put('/:contactId', validIdCheck, validator(schema.contactsSchemaSRV), contactsController.putContactCtrl)

router.patch('/:contactId/favorite', validIdCheck, validator(schema.favoriteTogleSchemaSRV), contactsController.togleFavotiteCtrl)

export default router
