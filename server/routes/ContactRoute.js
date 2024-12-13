import { Router } from "express";
import { getAllContact, getContactDMList, searchContact } from "../controllers/ContactController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContact);
contactsRoutes.get("/get-contact-dm-list", verifyToken, getContactDMList);
contactsRoutes.get("/get-all-contact", verifyToken, getAllContact);
export default contactsRoutes