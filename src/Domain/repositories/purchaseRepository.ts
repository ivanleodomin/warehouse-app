import Ingredient from "../entities/Ingredient";
import Purchase from "../entities/Purchase";



export default interface PurchaseRepository {
    register(ingredient: Ingredient, quantity: number): Promise<Purchase>
}