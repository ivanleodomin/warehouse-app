import { Router } from "express";
import { warehouseController } from "../../dependencies";

const PATH = "/stock"
const router = Router()

router.post(
    PATH + '/',
    warehouseController
        .validIngredientData
        .bind(warehouseController),
    warehouseController
        .validStockIngredients
        .bind(warehouseController),
    warehouseController
        .sendResponse
        .bind(warehouseController)
)

export default router