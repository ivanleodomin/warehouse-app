import Ingredient from "./Ingredient";

export default interface Purchase {
    id: any;
    ingredient: Ingredient
    quantity: number
    createdAt: Date
}