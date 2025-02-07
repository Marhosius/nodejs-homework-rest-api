import { HttpError } from "../helpers/index.js"
import Contacts from "../models/contacts.js";
import { ctrlWrapper } from "../decorators/index.js";


const getAllContactsCtrl = async (_, res) => {
    const { _id: owner } = req.user;
    const result = await Contacts.find({ owner });
    res.json(result);
}

const getOneContactCtrl = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contacts.findById(contactId);
    if (!result) throw HttpError(404, `Movie with id=${contactId} not found`);
    res.json(result);
}

const addContactCtrl = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contacts.create({ ...req.body, owner });
    res.status(201).json(result);
}

const delContactCtrl = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndDelete(contactId);
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
    const result = await Contacts.findByIdAndUpdate(contactId, req.body);

    if (!result) throw HttpError(404, "Not found");

    res.json(result);
}

const togleFavotiteCtrl = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!result) throw HttpError(404, "Not found");

    res.json(result);
}

export default {
    getAllContactsCtrl: ctrlWrapper(getAllContactsCtrl),
    getOneContactCtrl: ctrlWrapper(getOneContactCtrl),
    addContactCtrl: ctrlWrapper(addContactCtrl),
    delContactCtrl: ctrlWrapper(delContactCtrl),
    putContactCtrl: ctrlWrapper(putContactCtrl),
    togleFavotiteCtrl: ctrlWrapper(togleFavotiteCtrl)
}