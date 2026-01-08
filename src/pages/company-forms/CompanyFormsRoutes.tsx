import CompanyForms from "./CompanyForms";

// Export route elements for use in App.tsx
export const companyFormsRoutes = [
  { path: "/company-forms/pending", element: <CompanyForms /> },
  { path: "/company-forms/approved", element: <CompanyForms /> },
  { path: "/company-forms/rejected", element: <CompanyForms /> },
];

// Export component for direct import
export { CompanyForms };
