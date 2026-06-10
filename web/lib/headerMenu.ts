export function NavigationItems() {

  const navigationItems = [
    {
      id: "nav-home",
      label: "Home",
      href: "/",
    },
    {
      id: "nav-dashboard",
      label: "Dashboard",
      href: "/dashboard",
    },
  ];


  const navigationMobileItems = [...navigationItems];

  return { navigationItems, navigationMobileItems };
}