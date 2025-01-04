import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import { userRouter } from "./routes/userRoutes/UserRoute";

function App() {
  return (
    <>
    <RouterProvider router={userRouter}/>
    </>
  );
}

export default App;
