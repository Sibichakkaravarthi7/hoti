import { FormProvider, useForm } from "react-hook-form";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import AppRouterRoutes from './navigation/switch';


function App() {
    const methods = useForm();
    const router = createBrowserRouter(createRoutesFromElements(AppRouterRoutes()))
    return (
        <FormProvider {...methods}>
            <RouterProvider router={router} />
        </FormProvider>
    )
}

export default App