import axios from "axios";
import MarketplaceRepository from "../../Domain/repositories/marketplaceRepository";
import Sale from "../../Domain/entities/Sale";
import IngredientsRepository from "../../Domain/repositories/ingredientsRepository";
import config from "../../config";


export default class IMarketplaceRepository implements MarketplaceRepository {

    async buy(ingredientName: string): Promise<Sale> {
        const { data } = await axios
            .get<Sale>(`${config.marketUrl}/api/farmers-market/buy?ingredient=${ingredientName}`)
        return data
    }
}