export const bro = "Rohit Sharma";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import storage from "../../utils/storage";

// interface ProtectedProps {
//   children: React.ReactNode;
//   authentication?: boolean;
// }

// function Protected({ children, authentication = true }: ProtectedProps) {
//   //   const authStatus = useSelector((state: any) => state.auth.status);
//   const navigate = useNavigate();
//   const [loader, setLoader] = useState(true);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       if (authentication !== storage.authStatus()) {
//         if (authentication) {
//           navigate("/login");
//         } else {
//           navigate("/");
//         }
//       }
//       setLoader(false);
//     };
//     checkAuthentication();
//   }, [authentication, navigate]);

//   return loader ? <div>Loading...</div> : <>{children}</>;
// }

// export default Protected;
