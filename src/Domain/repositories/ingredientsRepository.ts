import Ingredient from "../entities/Ingredient";
import Page from "./paginate";

export type IngredientsPage = Page<Ingredient>

export default interface IngredientsRepository {
    getById(id: string): Promise<Ingredient | null>
    update(id: string, update: any): Promise<Ingredient | null>;
}
