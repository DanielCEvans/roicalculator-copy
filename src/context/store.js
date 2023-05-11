import { create } from "zustand";

const useStore = create((set) => ({
  formData: {
    country: "",
    plan: "",
    fullTimeEmployees: "",
    partTimeCasualEmployees: "",
    admins: "",
    costsSavedOnTech: "",
    annualServicesSpend: "",
    pagesPerYear: 0,
    implementationType: "",
    hrBurdenedRate: "",
    employeeBurdenedRate: "",
    hoursSpentOnEmploymentTasks: 0,
  },
  setFormData: (formKey, newFormData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [formKey]: newFormData,
      },
    })),

  adminDetails: {
    onboardsPerYear: "",
    hoursSpentPerOnboard: "",
    timeSheetsPerMonth: "",
    hoursSpentPerTimesheet: "",
    frequencyOfPayroll: "",
    hoursSpentPerPayroll: "",
    performanceReviewCycles: "",
    hoursSpentPerPerformanceReview: "",
    additionalTasks: "",
  },

  setAdminDetails: (formKey, newFormData) => {
    console.log(formKey, newFormData);
    return set((state) => ({
      adminDetails: {
        ...state.adminDetails,
        [formKey]: newFormData,
      },
    }));
  },

  printingDetails: {
    contractsPerYear: "",
    pagesPerContract: "",
    leaveFormsPerYear: "",
    pagesPerLeaveForm: "",
    reviewsPerYear: "",
    pagesPerReview: "",
    otherPrintingTasks: "",
  },

  setPrintingDetails: (formKey, newFormData) =>
    set((state) => ({
      printingDetails: {
        ...state.printingDetails,
        [formKey]: newFormData,
      },
    })),

  generalErrors: {},
  setGeneralErrors: (newErrors) =>
    set((state) => ({
      ...state,
      generalErrors: newErrors,
    })),
  adminErrors: {},
  setAdminErrors: (newErrors) =>
    set((state) => ({
      ...state,
      adminErrors: newErrors,
    })),

  hasCalculated: false,
  setHasCalculated: () =>
    set((state) => ({
      ...state,
      hasCalculated: true,
    })),

  totalTable: {},
  setTotalTable: (newTable) =>
    set((state) => ({
      ...state,
      totalTable: newTable,
    })),
  benefitsTable: {},
  setBenefitsTable: (newTable) =>
    set((state) => ({
      ...state,
      benefitsTable: newTable,
    })),
  costsTable: {},
  setCostsTable: (newTable) =>
    set((state) => ({
      ...state,
      costsTable: newTable,
    })),
  sidebarSelectedItemId: "calculator",
  setSidebarSelectedItemId: (newId) =>
    set((state) => ({
      ...state,
      sidebarSelectedItemId: newId,
    })),
  formSelectedItemId: "general",
  setFormSelectedItemId: (newId) =>
    set((state) => ({
      ...state,
      formSelectedItemId: newId,
    })),
}));

export default useStore;
