import Sale from "../entities/Sale";

export default interface MarketplaceRepository {
    buy(ingredient: string): Promise<Sale>
}