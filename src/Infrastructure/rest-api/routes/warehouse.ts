import { Router } from "express";
import { warehouseController } from "../../dependencies";

const router = Router()

router.post(
    '/stock',
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

router.get(
    '/ingredients/:page',
    warehouseController
        .getIngredients
        .bind(warehouseController),
    warehouseController
        .sendResponse
        .bind(warehouseController)
)

router.get(
    '/purchases/:page',
    warehouseController
        .getPurchases
        .bind(warehouseController),
    warehouseController
        .sendResponse
        .bind(warehouseController)
)
export default router