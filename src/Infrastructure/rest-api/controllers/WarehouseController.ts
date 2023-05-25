import { NextFunction, Request, Response } from "express";
import WarehouseService from "../../../Aplication/WarehouseService";
import { BaseController } from "./base.controller";
import { ErrorResponse, Locals } from "../types";
import { IngredientData } from "../../../Domain/entities/Recipe";
import { IngredientsPage } from "../../../Domain/repositories/ingredientsRepository";
import { PurchasePage } from "../../../Domain/repositories/purchaseRepository";



export default class WarehouseController extends BaseController {
    constructor(
        private WarehouseService: WarehouseService
    ) {
        super();
    }

    async validStockIngredients(
        req: Request<any, any, IngredientData[]>,
        res: Response<boolean, Locals<boolean | ErrorResponse>>,
        next: NextFunction
    ): Promise<void> {

        let status: number
        let data: boolean | ErrorResponse
        const ingredientsData = req.body

        try {
            data = await this.WarehouseService.validListIngredients(ingredientsData)
            status = 201
        } catch (err) {
            data = { error: this.getError(err) }
            status = 500
        }
        res.locals = { status, data }
        return next()
    }

    validIngredientData(
        req: Request,
        res: Response<boolean | ErrorResponse, Locals<boolean | ErrorResponse>>,
        next: NextFunction
    ): void {
        const ingredientsData = req.body

        if (!Array.isArray(ingredientsData) || !ingredientsData.length) {
            res.send({ error: "Ingredients list not valid" })
            return
        }

        if (
            ingredientsData
                .some(({ ingredient, quantity }: IngredientData) => !ingredient || !quantity)
        ) {
            res.send({ error: "Ingredients list not valid" })
            return
        }

        return next()
    }

    async getIngredients(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { page } = req.params

        let status: number
        let data: IngredientsPage | ErrorResponse

        try {
            if (!page) {
                throw new Error("page is required")
            }

            data = await this.WarehouseService.getIngredients(Number(page))
            status = 200
        } catch (err) {
            data = { error: this.getError(err) }
            status = 400
        }

        res.locals = { status, data }
        return next()

    }

    async getPurchases(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { page } = req.params

        let status: number
        let data: PurchasePage | ErrorResponse

        try {
            if (!page) {
                throw new Error("page is required")
            }

            data = await this.WarehouseService.getPurchases(Number(page))
            status = 200
        } catch (err) {
            data = { error: this.getError(err) }
            status = 400
        }

        res.locals = { status, data }
        return next()

    }
}