import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import ProductsPage from "../pages/ProductsPage";
import ServicesPage from "../pages/ServicesPage";
import SettingsPage from "../pages/SettingsPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import CreateProjectPage from "../pages/CreateProjectPage";
import EditProjectPage from "../pages/EditProjectPage";
import EditProductPage from "../pages/EditProductPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailsPage />} />
          <Route path="/projects/new" element={<CreateProjectPage />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectPage />} />
          <Route path="/products/:productId/edit" element={<EditProductPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRouter;