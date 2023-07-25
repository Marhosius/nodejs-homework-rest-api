import { model } from "mongoose";
import contactsSchema from "../schema/contactSchemaDB.js";

const Contacts = model("contacts", contactsSchema);

export default Contacts;
