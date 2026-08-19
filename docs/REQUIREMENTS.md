# Requisitos

Este archivo registra requisitos funcionales, no funcionales, reglas de negocio y casos especiales.

## Requisitos Funcionales

```text
ID: RF-001
Nombre: Listado de productos
Usuario afectado: clientes
Descripcion: mostrar una grilla de productos con imagen, nombre, precio y accion principal.
Reglas:
- Debe usar datos demo hasta conectar persistencia real.
- Debe ser navegable en mobile y desktop.
Prioridad: alta
Estado: aprobado
```

```text
ID: RF-002
Nombre: Filtros de productos
Usuario afectado: clientes
Descripcion: permitir filtrar productos por categoria, color, medida y opcion.
Reglas:
- En desktop los filtros deben mostrarse como sidebar.
- En mobile los filtros deben estar disponibles en un panel colapsable/drawer.
- La logica de filtros debe ser reutilizable y no duplicarse en componentes.
Prioridad: alta
Estado: aprobado
```

```text
ID: RF-003
Nombre: Ordenamiento de productos
Usuario afectado: clientes
Descripcion: permitir ordenar productos por novedad, menor precio, mayor precio y nombre.
Reglas:
- El ordenamiento debe estar separado de la vista para poder reutilizarlo.
Prioridad: alta
Estado: aprobado
```

```text
ID: RF-004
Nombre: Header principal
Usuario afectado: clientes
Descripcion: mostrar logo, buscador, ayuda, mi cuenta, carrito y navegacion principal.
Reglas:
- Debe incluir Inicio, Productos, Guia de medidas, Contacto, Quienes somos, Formas de pago y Preguntas frecuentes.
- Debe respetar fondo blanco, botones beige y detalles sobrios.
- Debe adaptarse a mobile.
Prioridad: alta
Estado: aprobado
```

```text
ID: RF-005
Nombre: Guia de medidas
Usuario afectado: clientes
Descripcion: crear una seccion/pagina para orientar medidas de productos textiles.
Reglas:
- Puede comenzar como pagina informativa estatica.
Prioridad: media
Estado: aprobado
```

```text
ID: RF-006
Nombre: Carrito demo
Usuario afectado: clientes
Descripcion: permitir agregar productos al carrito desde listado y detalle.
Reglas:
- Antes de agregar un producto se debe elegir una medida.
- El precio mostrado y agregado al carrito debe depender de la medida seleccionada.
- El carrito debe permitir aumentar, reducir y quitar productos por variante seleccionada.
- Debe existir un boton para vaciar el carrito completo.
- Al agregar un producto debe mostrarse feedback visual en pantalla.
- Personas sin cuenta pueden navegar la pagina y revisar productos.
- Para agregar productos al carrito o avanzar con compra se debe tener una cuenta/sesion.
- Si una persona sin sesion intenta agregar al carrito, se debe mostrar aviso con enlace para ingresar o registrarse.
- Los datos de carrito iniciales son demo/locales y no representan pedidos reales.
- No se deben guardar datos reales de clientes en el repositorio.
Prioridad: alta
Estado: implementado
```

```text
ID: RF-007
Nombre: Acceso de cliente en memoria
Usuario afectado: clientes
Descripcion: mostrar opciones de ingresar y registrarse desde el header y paginas dedicadas.
Reglas:
- El acceso inicial usa usuarios y sesiones en memoria del backend.
- Al detener el backend se pierden usuarios y sesiones.
- Una cuenta creada debe poder cerrar sesion y volver a iniciar sesion mientras el backend siga levantado.
- El registro debe pedir nombre, apellido, email, telefono, contrasena y direccion de entrega.
- Las contrasenas no deben devolverse al frontend ni guardarse en texto plano.
- La UI debe mostrar ingresar y registrarse como acciones visibles en el header.
- Cuando hay sesion activa, el header debe mostrar el nombre de usuario.
- Se deben usar datos de prueba para demos publicas y capturas.
Prioridad: alta
Estado: implementado
```

Formato recomendado:

```text
ID: RF-001
Nombre:
Usuario afectado:
Descripcion:
Reglas:
- 
Prioridad: alta / media / baja
Estado: propuesto / aprobado / implementado
```

## Requisitos No Funcionales

- Mobile-first.
- Carga rapida.
- Interfaz simple.
- Datos seguros.
- Facil mantenimiento.
- Backend y frontend separados.
- Arquitectura por capas en backend.
- Componentes reutilizables en frontend.
- Evitar duplicacion de logica.
- Evitar acoplamiento innecesario.
- Mantener codigo claro y entendible.
- Repo publico apto para portfolio, sin datos reales ni secretos.

## Reglas Del Negocio

- Los productos pertenecen a categorias.
- Los productos pueden tener variantes por color, medida y opcion.
- Las medidas pueden tener precios distintos dentro de un mismo producto.
- En el carrito demo, medidas mas grandes pueden tener precios mayores segun los datos ficticios definidos.
- La navegacion publica no requiere cuenta.
- Agregar al carrito y avanzar con compra requiere una cuenta o sesion.
- Los usuarios iniciales se guardan en memoria del backend hasta detener el servidor.
- Los ejemplos publicos usan datos ficticios.
- Las reglas criticas de datos y permisos deben validarse en backend.

## Casos Especiales

- Producto sin stock: por definir si se oculta o se muestra como no disponible.
- Producto con multiples medidas y colores: debe poder encontrarse desde filtros.
- Imagenes reales del negocio: solo publicar si hay permiso.

## Preguntas Abiertas

- Que problema principal tiene hoy el negocio?
- Quienes van a usar el sistema?
- Que tareas deberia simplificar primero?
- Hay pagos, reservas, stock, clientes, agenda o pedidos involucrados?
- El negocio quiere panel administrativo en el MVP o en una etapa posterior?
