# IPC App

URL: https://ipc-app-ajet.vercel.app/

Características del proyecto:

- Autenticación OAuth2.0 por medio de Google y Github. Es requerido autenticarse para poder ingresar a las demás páginas del proyecto.
- Rol por usuario, definido por permiso para ver la gráfica IPC.
- Página de gráfica es generada por D3.js, incluye animación de generación de linea. Esta página se puede ver si tiene permiso para ver.
- Página de configuración, en esta página se puede cambiar los permisos para ver la gráfica de todos los usuarios.

![alt page](https://res.cloudinary.com/df9fhapay/image/upload/v1680221176/Screenshot_2023-03-30_at_17.06.10_ilrxrx.png)

Este proyecto utiliza:
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [D3.js](https://d3js.org)
