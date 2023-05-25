import WarehouseService from "../Aplication/WarehouseService";
import IIngredientRepository from "./repositories/ingredientRepository";
import IMarketplaceRepository from "./repositories/marketplaceRepository";
import WarehouseController from "./rest-api/controllers/WarehouseController";

// Repositories
export const ingredientRepository = new IIngredientRepository()
export const marketplaceRepository = new IMarketplaceRepository()

// Aplication Services
export const warehouseService = new WarehouseService(marketplaceRepository, ingredientRepository)

// Controllers
export const warehouseController = new WarehouseController(warehouseService)