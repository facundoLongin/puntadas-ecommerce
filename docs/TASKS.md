# Tareas

Este archivo mantiene el estado practico del proyecto.

## En Progreso

- Sin tareas activas luego del corte inicial de Cloudflare.

## Pendiente

- Revisar checklist de `docs/PRIVACY.md` antes de publicar en GitHub.
- Inicializar Git desde la raiz, si corresponde.
- Reemplazar datos demo por fuente real cuando se defina persistencia.
- Definir imagenes reales o generadas para productos con permiso de publicacion.
- Definir comportamiento real de ayuda y mi cuenta.
- Definir checkout real o derivacion a WhatsApp desde el carrito.
- Definir persistencia real de usuarios y sesiones para produccion.
- Implementar Cloudflare D1 para cuentas, sesiones, productos y pedidos persistentes.
- Conectar frontend deployado al Worker con auth persistente.

## Hecho

- Crear estructura documental base.
- Crear `AGENTS.md` con instrucciones permanentes para Cody.
- Crear archivos iniciales en `docs/`.
- Documentar politica de privacidad y publicacion segura para GitHub.
- Definir nombre del negocio como Puntadas.
- Definir rubro inicial como textil/deco home.
- Definir stack inicial: Next.js, TypeScript, Tailwind CSS, Node.js y Express.
- Definir arquitectura por capas y separacion backend/frontend.
- Crear `.gitignore`.
- Crear `.env.example` sin secretos reales.
- Crear `README.md` orientado a portfolio y privacidad.
- Crear estructura inicial `backend/` y `frontend/`.
- Implementar backend inicial por capas con productos demo.
- Implementar frontend inicial con header, home, productos, filtros, detalle y guia de medidas.
- Verificar build de backend y frontend.
- Verificar lint de frontend.
- Eliminar Git interno generado dentro de `frontend/` para preparar monorepo.
- Quitar assets genericos del starter de Next no utilizados.
- Verificar que frontend y backend respondan localmente.
- Revisar que no haya secretos o credenciales en archivos del proyecto.
- Reemplazar placeholders visuales por imagenes demo generadas por producto.
- Documentar assets generados en `docs/ASSETS.md`.
- Reemplazar imagen generica del inicio por hero generado para Puntadas.
- Definir carrito como accion principal inicial.
- Implementar carrito demo con seleccion de medida y precio por variante.
- Implementar aumento, reduccion, eliminacion por item y vaciado completo del carrito.
- Implementar feedback visual al agregar productos al carrito.
- Implementar acceso de cliente con ingreso/registro desde header.
- Bloquear agregado al carrito y compra si no hay sesion.
- Mostrar ingreso/registro visibles en header y nombre de usuario con sesion activa.
- Implementar usuarios y sesiones en memoria del backend.
- Implementar registro/login/logout con formularios reales.
- Mostrar errores especificos de validacion en registro e ingreso.
- Conectar acciones moviles del header: busqueda, ayuda y menu desplegable.
- Agregar busqueda local por texto desde header hacia productos.
- Agregar tests automatizados de backend para productos y cuentas.
- Agregar tests automatizados de frontend para filtros y precios por medida.
- Agregar auditoria local de SEO/accesibilidad basica.
- Agregar metadata SEO por rutas principales, sitemap y robots.
- Agregar build estatico para Cloudflare Pages.
- Agregar Worker API inicial para Cloudflare con health y productos demo.
- Agregar headers estaticos de seguridad para Cloudflare Pages.
- Documentar deploy en `docs/CLOUDFLARE.md`.
- Elegir Cloudflare Pages, Workers y D1 como camino de deploy inicial.

## Proximos Pasos Sugeridos

- Definir modelo inicial D1 de usuarios, sesiones, productos, pedidos y variantes.
- Reemplazar memoria backend por persistencia real con migraciones.
- Definir checkout: pasarela de pago, WhatsApp o flujo mixto.
- Agregar roles y panel administrativo para carga de productos.
- Agregar tests end-to-end con navegador real antes de produccion.
- Agregar monitoreo, logs seguros y manejo de errores de produccion.

## Bloqueos

- Faltan definiciones de checkout real, derivacion a WhatsApp y panel administrativo.
