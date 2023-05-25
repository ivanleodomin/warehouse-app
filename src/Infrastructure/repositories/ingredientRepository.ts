import { FilterQuery, UpdateQuery } from "mongoose";
import Ingredient from "../../Domain/entities/Ingredient";
import IngredientsRepository, { IngredientsPage } from "../../Domain/repositories/ingredientsRepository";
import IngredientModel from "../database/collections/Ingredients";


export default class IIngredientRepository implements IngredientsRepository {
    async getById(id: string): Promise<Ingredient | null> {
        try {
            return await IngredientModel.findOne({ _id: id })
        } catch (err) {
            console.log(`Ingredient ${id} not found`)
            return null;
        }

    }

    async getAll(filter: FilterQuery<Ingredient> = {}, page: number = 1, limit: number = 10): Promise<IngredientsPage> {

        const totals = await IngredientModel.countDocuments(filter)
        const orders = await IngredientModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)

        return {
            records: orders,
            totalPages: Math.ceil(totals / limit),
            perPage: limit,
            currentPage: page
        }

    };

    async update(id: string, update: UpdateQuery<Ingredient>): Promise<Ingredient | null> {
        try {
            return await IngredientModel.findOneAndUpdate({ _id: id }, update, { new: true })
        } catch (err) {
            console.log(`Error in update Ingredient: ${id}`, err)
            return null;
        }
    }
}