import WarehouseService from "../Aplication/WarehouseService";
import IIngredientRepository from "./repositories/ingredientRepository";
import IMarketplaceRepository from "./repositories/marketplaceRepository";
import IPurchaseRepository from "./repositories/purchaseRepository";
import WarehouseController from "./rest-api/controllers/WarehouseController";

// Repositories
export const ingredientRepository = new IIngredientRepository()
export const marketplaceRepository = new IMarketplaceRepository()
export const purchaseRepository = new IPurchaseRepository()

// Aplication Services
export const warehouseService = new WarehouseService(marketplaceRepository, ingredientRepository, purchaseRepository)

// Controllers
export const warehouseController = new WarehouseController(warehouseService)