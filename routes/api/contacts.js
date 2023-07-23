import express from "express";
import { contactsController } from "../../controllers/index.js";

const router = express.Router()

router.get('/', contactsController.getAllContactsCtrl)

router.get('/:contactId', contactsController.getOneContactCtrl)

router.post('/', contactsController.addContactCtrl)

router.delete('/:contactId', contactsController.delContactCtrl)

router.put('/:contactId', contactsController.putContactCtrl)

export default router
