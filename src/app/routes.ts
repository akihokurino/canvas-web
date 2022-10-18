const Routes = {
  Home: { path: "/" },
  Collection: { path: "/collection/[address]" },
  Archives: { path: "/archives" },
  Archive: { path: "/archive/[id]" },
} as const;

export default Routes;
