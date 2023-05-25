import Ingredient from "../entities/Ingredient";
import Purchase from "../entities/Purchase";
import Page from "./paginate";

export type PurchasePage = Page<Purchase>


export default interface PurchaseRepository {
    register(ingredient: Ingredient, quantity: number): Promise<Purchase>
    getAll(filter?: any, page?: number, limit?: number): Promise<PurchasePage>;

}