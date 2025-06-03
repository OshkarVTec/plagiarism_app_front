import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex flex-col items-center gap-4">
        <img src={logo} alt="Logo" className="w-40 h-auto"/>
         <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuLink asChild
             data-active={location.pathname === "/"}>
              <Link to="/">
                Análisis
              </Link>
            </NavigationMenuLink>
               <div className="w-0.5 h-8 bg-black" />
            <NavigationMenuLink asChild
            data-active={location.pathname === "/Results"}>
              <Link to="/Results">
                Resultados
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="p-2">{children}</main>
    </div>
  );
}
