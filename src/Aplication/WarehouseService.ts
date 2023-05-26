import { IngredientData } from "../Domain/entities/Recipe";
import MarketplaceRepository from "../Domain/repositories/marketplaceRepository";
import IngredientsRepository, { IngredientsPage } from "../Domain/repositories/ingredientsRepository";
import PurchaseRepository, { PurchasePage } from "../Domain/repositories/purchaseRepository";

export default class WarehouseService {

    constructor(
        private marketRepository: MarketplaceRepository,
        private ingredientsRepository: IngredientsRepository,
        private purchaseingRepository: PurchaseRepository
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

        if(quantitySold){
            await this.ingredientsRepository.update(record.id, { quantity: newQuantity })
        }
        await this.purchaseingRepository.register(record, quantitySold)

        if (quantity <= newQuantity) {
            return isValid
        }

        isValid.available = false

        return isValid
    }

    getIngredients(page: number): Promise<IngredientsPage> {
        return this.ingredientsRepository.getAll({}, page)
    }


    getPurchases(page: number): Promise<PurchasePage> {
        return this.purchaseingRepository.getAll({}, page)
    }

}


interface Validation {
    ingredientId: string,
    available: boolean
}