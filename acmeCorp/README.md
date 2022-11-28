
# AnalyticalWays - AcmeCorp

* Aplicación reactiva de dos vistas: dashboard y usuario (protegida CanActivate y CanLoad)
* Control del estado de la aplicación mediante observables (solo tiene 2 selectores).

## Que hemos obviado

* La implementación de un HttpInterceptor para gestionar los errores de la petición.
* Los estilos son mejorables 100%.
* Cambiar los colores por dominio no está hecho (falta de tiempo).
* Directivas para gestionar las máscaras (input mask): hice una a modo de ejemplo (zip), el resto con Validators.pattern() por tiempo.

## Mejoras 🛠️

* Al empezar la carga en la ruta "/user" la autentificación falla, por lo que se debería redirigir al "/homepage", y no quedarse en blanco. Deberíamos gestionarlo mediante un servicio para el canActivate y el canLoad.
* Componente Card mal enfocado (User, Post, Comments): debería haber sido una clase css global para hacer el contenedor y un componente para cada entidad (actualmente es todo un bloque - componente)
* Definición de nombres
* Otras :coffee::coffee::coffee:

## Comenzando 🚀

Obtener una copia del proyecto en funcionamiento en tu máquina local:

```
    git clone https://github.com/Koke-beep/acme.git
```
```
    cd acme/acmeCorp
    npm install
    ng serve
```

## Construido

* Angular v.11.2.19
* RxJS
* TS
---
