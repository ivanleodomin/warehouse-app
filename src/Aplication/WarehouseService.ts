import { IngredientData } from "../Domain/entities/Recipe";
import MarketplaceRepository from "../Domain/repositories/marketplaceRepository";
import IngredientsRepository from "../Domain/repositories/ingredientsRepository";

export default class WarehouseService {

    constructor(
        private marketRepository: MarketplaceRepository,
        private ingredientsRepository: IngredientsRepository
    ) { }

    async validListIngredients(ingredients: IngredientData[]): Promise<boolean> {

        const promises = ingredients.map(this.validStock.bind(this));
        const validated = await Promise.all(promises)

        return validated.some(item => item.available)
    }

    async validStock({ ingredient, quantity }: IngredientData): Promise<Validation> {
        const record = await this.ingredientsRepository.getById(ingredient.id)

        if (!record) {
            throw new Error(`Ingredient ${ingredient.name} not found`)
        }

        const isValid = {
            available: true,
            ingredientId: record.id
        }

        if (quantity <= record.quantity) {
            await this.ingredientsRepository
                .update(record.id, { quantity: record.quantity - 1 })
            return isValid
        }

        const { quantitySold } = await this.marketRepository.buy(record.name)
        const newQuantity = record.quantity + quantitySold
        await this.ingredientsRepository.update(record.id, { quantity: newQuantity })

        if (quantity <= newQuantity) {
            return isValid
        }

        isValid.available = false

        return isValid
    }

}


interface Validation {
    ingredientId: string,
    available: boolean
}