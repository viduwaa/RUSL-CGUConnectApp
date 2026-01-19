import React, { createContext, ReactNode, useContext, useState } from "react";

interface NavigationVisibilityContextType {
  isNavigationVisible: boolean;
  setNavigationVisible: (visible: boolean) => void;
}

const NavigationVisibilityContext =
  createContext<NavigationVisibilityContextType>({
    isNavigationVisible: true,
    setNavigationVisible: () => {},
  });

export function NavigationVisibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isNavigationVisible, setNavigationVisible] = useState(true);

  return (
    <NavigationVisibilityContext.Provider
      value={{ isNavigationVisible, setNavigationVisible }}
    >
      {children}
    </NavigationVisibilityContext.Provider>
  );
}

export function useNavigationVisibility() {
  return useContext(NavigationVisibilityContext);
}
