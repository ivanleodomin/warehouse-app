import { FilterQuery } from "mongoose";
import Ingredient from "../../Domain/entities/Ingredient";
import Purchase from "../../Domain/entities/Purchase";
import PurchaseRepository, { PurchasePage } from "../../Domain/repositories/purchaseRepository";
import PurchaseModel from "../database/collections/Purchase";


export default class IPurchaseRepository implements PurchaseRepository {
    async register(ingredient: Ingredient, quantity: number): Promise<Purchase> {
        const purchase = new PurchaseModel({
            ingredient: ingredient,
            quantity: quantity
        })

        await purchase.save();
        return purchase
    }

    async getAll(filter: FilterQuery<Ingredient> = {}, page: number = 1, limit: number = 10): Promise<PurchasePage> {

        const totals = await PurchaseModel.countDocuments(filter)
        const orders = await PurchaseModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('ingredient')

        return {
            records: orders,
            totalPages: Math.ceil(totals / limit),
            perPage: limit,
            currentPage: page
        }

    };

}