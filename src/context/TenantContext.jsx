import { createContext, useState } from "react";

export const TenantContext = createContext();

function TenantProvider({ children }) {

  const [tenants, setTenants] = useState([]);

  return (
    <TenantContext.Provider
      value={{
        tenants,
        setTenants,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export default TenantProvider;