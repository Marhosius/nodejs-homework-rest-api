import { model } from "mongoose";
import contactsSchema from "../schema/contactSchemaDB.js";

const Contacts = model("contact", contactsSchema);

export default Contacts;
