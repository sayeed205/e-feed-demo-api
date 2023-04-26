import { Router } from "express";
import { validate } from "express-validation";

import * as bookController from "../controllers/book.controller.js";
import auth from "../middleware/apiAuth.js";
import * as bookValidation from "../validations/book.validation.js";

const router = Router();

router.get("/", bookController.getBooks); // TODO)): add pagination

router.get("/:id", validate(bookValidation.getBook), bookController.getBook);

router.post(
    "/",
    auth,
    validate(bookValidation.createBook),
    bookController.createBook
);

router.put(
    "/:id",
    auth,
    validate(bookValidation.updateBook),
    bookController.updateBook
);

router.delete(
    "/:id",
    auth,
    validate(bookValidation.deleteBook),
    bookController.deleteBook
);

export default router;
