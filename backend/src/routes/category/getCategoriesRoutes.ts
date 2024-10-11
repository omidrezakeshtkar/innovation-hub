import { Router } from "express";
import { getCategories } from "../../handlers/categoryHandlers";
import { auth } from "../../middleware/auth";
import { registry } from "../../config/swagger";
import { GlobalErrorSchema } from "../../schemas";
import { CategorySchema } from "../../schemas/Category.schema";
import { z } from "zod";

const router = Router();

registry.registerPath({
	method: "get",
	path: "/categories",
	summary: "Retrieve all categories",
	tags: ["Categories"],
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: "A list of categories",
			content: {
				"application/json": {
					schema: z.array(CategorySchema),
				},
			},
		},
		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: GlobalErrorSchema,
				},
			},
		},
	},
});

router.get("/", auth, getCategories);

export default router;
