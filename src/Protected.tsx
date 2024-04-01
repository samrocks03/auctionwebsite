import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storage from "./utils/storage";
import { SpinnerBro } from "./Components/Spinner";

interface ProtectedProps {
  children: React.ReactNode;
  authentication?: boolean;
}

function Protected({ children, authentication = true }: ProtectedProps) {
  const authStatuss = storage.authStatus();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (authentication !== authStatuss) {
        if (authentication) {
          navigate("/login");
        } else {
          navigate("/");
        }
      }
      setLoader(false);
    };

    checkAuthentication();
  }, [authStatuss, authentication, navigate]);

  return loader ? (
    <div>
      <SpinnerBro />
    </div>
  ) : (
    <>{children}</>
  );
}

export default Protected;
