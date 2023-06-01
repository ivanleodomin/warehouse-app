# Warehouse microservice

Este servicio es uno de tres microservicios, implementados con el fin de desarrollar la solucion para el reto tecnico de Alegra.

# Responsabilidad

Este servicio de manejo de stock es responsable de coordinar y ejecutar operaciones relacionadas con la gestión de inventario. Esto incluye la validación de disponibilidad de productos para generar pedidos, así como la gestión de la reposición de productos agotados. Además, el servicio registra las transacciones de compras realizadas y proporciona una funcionalidad para mostrar un listado actualizado de ingredientes disponibles.

# Sobre el proyecto

El proyecto esta estructurado siguiendo el patron de arquitectura limpia, el cual, es un enfoque de diseño de software que busca crear sistemas altamente independientes, desacoplados y divididos en capas, lo que facilita la comprensión, el mantenimiento y la evolución del código.

### Estructura de carpetas

- Dominio: Politicas del sistema. Aqui se declaran las entidades y repositorios que existiran en la aplicacion
- Aplication: Logica empresarial del sistema. Son todos los casos de uso de la aplicacion
- Infrastructura: Todo lo ageno a la logica de negocios central de nuestra aplicacion. Conexion y configuracion de la base de datos; implementacion real de los elementos del dominio y uso de los servicios de aplicacion inyectando estas nuevas implementaciones.


## API Reference

#### Valid stock

```http
  POST /api/stock
```

- Body **Required**:
```json
[
	{
		"quantity": // Cantidad requerida,
		"ingredient": {
			"id": // Id de ingrediente,
			"name": // Nombre del ingrediente
		}
	}
]
```

- __Response__: 
| Type     | Description| 
|:------- | :------------ |
| `boolean` | Si el stock es disponible. Se hace una compra en caso de que no lo sea |

#### Get purchases

```http
  GET /api/purchases/${page}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | **Required**. page |

- __Response__: 
| Type     | Description| 
:------- | :------------ |
| `Page` | Responde una pagina con los registros de todas las compras realizadas al Marketplace |



#### Get ingredients

```http
  GET /api/ingredients/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`    | `number` | **Required**. page |

- __Response__: 
| Type   | Description| 
|:-------| :------------ |
| `Page` | Responde una pagina con los ingredientes y sus cantidades|



## Usage

Puede usar el Dockerfile presente en la raiz del proyecto para levantar la aplicacion o puede usar docker-compose.yaml para levantar la app junto a un servicio de mongoose

Tambien puede instalar todo local utilizando
```bash
  yarn install
  yarn dev
```


## Deploy

El servicio se encuentra en [render](https://render.com/) que provee un hosting gratuito a partir de una imagen de docker y la base de datos es la capa gratuita de [MongoDB Atlas](https://www.mongodb.com/atlas/database)
