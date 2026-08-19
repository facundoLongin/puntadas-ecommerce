# Decisiones

Este archivo registra decisiones importantes del proyecto y su razon.

## Formato

```text
Fecha:
Decision:
Contexto:
Alternativas consideradas:
Razon:
Consecuencias:
```

## Decisiones Registradas

### 2026-08-11 - Crear documentacion base del proyecto

Decision: mantener contexto del proyecto en archivos dentro del repo.

Contexto: el proyecto necesita poder retomarse sin repetir requisitos ni gastar tokens reconstruyendo conversaciones anteriores.

Razon: centralizar la informacion en archivos permite que Cody lea el estado del proyecto rapidamente.

Consecuencias: la documentacion debe actualizarse cuando cambien requisitos, arquitectura, roadmap o tareas.

### 2026-08-11 - Preparar el proyecto como repo publico seguro

Decision: construir el proyecto con mentalidad de repositorio publico de portfolio, manteniendo datos reales, secretos y configuraciones privadas fuera del repo.

Contexto: el proyecto sera usado por un negocio real y tambien se quiere mostrar como parte del CV/portfolio.

Alternativas consideradas: repo publico completo, repo privado completo, repo publico de portfolio separado de un repo privado de produccion.

Razon: un repo publico aporta valor profesional si muestra codigo, arquitectura y decisiones, pero la informacion real del negocio debe vivir en servicios privados y protegidos.

Consecuencias: todo ejemplo, seed, captura o documento publico debe usar datos ficticios. Antes de subir a GitHub se debe revisar `docs/PRIVACY.md`.

### 2026-08-18 - Separar backend y frontend con arquitectura por capas

Decision: organizar el proyecto como monorepo con `backend/` y `frontend/`.

Contexto: el proyecto debe ser mantenible, claro para portfolio y preparado para crecer sin mezclar UI, reglas de negocio y persistencia.

Alternativas consideradas: frontend unico con API interna, backend y frontend separados, aplicacion estatica con datos locales.

Razon: separar backend y frontend permite mostrar una arquitectura mas profesional, controlar mejor reglas y permisos, y evitar acoplamiento innecesario.

Consecuencias: el backend tendra capas de dominio, aplicacion, infraestructura e interfaces HTTP. El frontend tendra componentes reutilizables y logica de filtros separada de la vista.

### 2026-08-18 - Estetica inicial de Puntadas

Decision: usar fondo blanco, botones beige y detalles sutiles verde oliva/militar.

Contexto: las referencias visuales apuntan a deco home/e-commerce limpio, con header completo, buscador y filtros laterales.

Razon: esta paleta da una sensacion calida y sobria, compatible con textiles y hogar.

Consecuencias: el diseno no debe volverse monocromatico ni recargado. El verde oliva se usara solo como acento.

### 2026-08-18 - Primer corte con datos demo y componentes reutilizables

Decision: implementar el primer corte con productos demo ficticios, filtros locales reutilizables y backend preparado para futura persistencia real.

Contexto: se necesita avanzar con una version visible sin exponer informacion real ni bloquear el diseno por decisiones pendientes de compra/carrito/admin.

Razon: permite validar experiencia, estructura y estetica con bajo riesgo, manteniendo la arquitectura lista para crecer.

Consecuencias: frontend y backend tienen datos demo iniciales. Cuando se conecte persistencia real, se debe evitar duplicar reglas y consolidar contratos si aparece logica compartida relevante.

### 2026-08-19 - Carrito demo con precio por medida

Decision: usar carrito demo en frontend como accion principal inicial y modelar precios por medida mediante variantes ficticias.

Contexto: el negocio pidio que antes de agregar un producto al carrito se elija la medida y que el precio cambie segun esa seleccion.

Alternativas consideradas: boton de compra directo, consulta por WhatsApp sin carrito, carrito completo con checkout real.

Razon: el carrito demo permite validar la experiencia principal sin manejar pedidos reales, clientes ni pagos. Las variantes por medida preparan el modelo para reglas de precio mas reales en una etapa posterior.

Consecuencias: los productos demo incluyen `measureVariants`. El estado del carrito vive en el navegador y no debe considerarse persistencia real de pedidos.

### 2026-08-19 - Acceso demo para flujos de carrito

Decision: permitir navegacion publica sin cuenta, pero requerir una sesion demo para agregar productos al carrito o avanzar con compra.

Contexto: el negocio quiere que cualquier persona pueda revisar la pagina, pero que las acciones de compra queden asociadas a una cuenta.

Alternativas consideradas: permitir carrito anonimo, bloquear toda la navegacion, implementar autenticacion real completa.

Razon: la sesion demo valida el flujo y la experiencia sin pedir credenciales reales ni guardar datos personales en esta etapa publica.

Consecuencias: el frontend incluye `features/auth` y paginas `/ingresar` y `/registro`. En produccion se debera reemplazar por autenticacion real validada por backend.
