import { HttpError } from "../helpers/index.js"
import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} from "../models/contacts.js";
import { ctrlWrapper } from "../decorators/index.js";


const getAllContactsCtrl = async (_, res) => {
    const contacts = await listContacts();
    res.json(contacts);
}

const getOneContactCtrl = async (req, res) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) throw HttpError(404, `Movie with id=${id} not found`);
    res.json(result);
}

const addContactCtrl = async (req, res) => {
    const result = await addContact(req.body);
    res.status(201).json(result);
}

const delContactCtrl = async (req, res) => {
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

const putContactCtrl = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) throw HttpError(404, "Not found");

    res.json(result);
}

export default {
    getAllContactsCtrl: ctrlWrapper(getAllContactsCtrl),
    getOneContactCtrl: ctrlWrapper(getOneContactCtrl),
    addContactCtrl: ctrlWrapper(addContactCtrl),
    delContactCtrl: ctrlWrapper(delContactCtrl),
    putContactCtrl: ctrlWrapper(putContactCtrl)
}