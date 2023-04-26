import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send("Hello from books route"));

router.get("/:id", (req, res) =>
    res.send("Hello from books route with id" + req.params.id)
);

router.post("/", (req, res) => res.send("Hello from books route"));

router.put("/:id", (req, res) =>
    res.send("Hello from books route with id" + req.params.id)
);

router.delete("/:id", (req, res) =>
    res.send("Hello from books route with id" + req.params.id)
);

export default router;
