const publicRoutes = {
    HOME: "/",
    DASHBOARD: "/dashboard",
    LOGIN: "/login",
    //REGISTER: "/register",
    CALLCENTERS: "/callcenters",
    CAMPAINGS: "/campanias",
    STATES: "/estados",
    SALESTYPES: "/tipoventa",
    USERS: "/usuarios",
    ORDERS: "/pedidos",
    //VALIDATION_EQUIFAX: "/pedidos/[id]/equifax/validacion",
    //FORM_SALES: "/pedidos/[id]/equifax/formulario-ventas",
    CLIENTS: "/clientes",
    SOURCES: "/origenes",
    // SOMETHINGS: "/somethings",
    // SOMETHINGS_ID: `/somethings/:id`,
    //ABOUT: "/about",
    FORGET_PASSWORD: "/olvide-mi-clave",
};

const privateRoutes = {
    //SOMETHINGS_ID: "/somethings/:id",
    //SOMETHINGS: "/somethings",
    //REGISTER: "/register",
    //USERS: "/usuarios",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};
export default Routes;