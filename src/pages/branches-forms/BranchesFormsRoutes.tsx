import BranchesForms from "./BranchesForms";

// Export route elements for use in App.tsx
export const branchesFormsRoutes = [
  { path: "/branches-forms/pending", element: <BranchesForms /> },
  { path: "/branches-forms/approved", element: <BranchesForms /> },
  { path: "/branches-forms/rejected", element: <BranchesForms /> },
];

// Export component for direct import
export { BranchesForms };
