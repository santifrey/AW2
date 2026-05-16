# API - Tienda Online

## Endpoints

### Usuarios
- GET /usuarios → lista todos los usuarios
- GET /usuarios/:id → obtener usuario por id
- POST /usuarios → crear usuario
- DELETE /usuarios/:id → eliminar usuario (si no tiene ventas)

### Productos
- GET /productos → lista todos los productos
- GET /productos/:id → obtener producto por id
- POST /productos → crear producto
- PUT /productos/:id → actualizar producto

### Ventas
- GET /ventas → lista todas las ventas
- GET /ventas/usuario/:id → ventas por usuario
- POST /ventas → crear venta

## Notas
- No se puede eliminar un usuario con ventas asociadas
- Se valida existencia de usuario al crear ventas
