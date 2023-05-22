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

  employmentBenefits: [],
  setEmploymentBenefits: (newBenefits) =>
    set((state) => ({
      ...state,
      employmentBenefits: newBenefits,
    })),

  organisationBenefits: [],
  setOrganisationBenefits: (newBenefits) =>
    set((state) => ({
      ...state,
      organisationBenefits: newBenefits,
    })),

  techBenefits: [],
  setTechBenefits: (newBenefits) =>
    set((state) => ({
      ...state,
      techBenefits: newBenefits,
    })),

  printingBenefits: [],
  setPrintingBenefits: (newBenefits) =>
    set((state) => ({
      ...state,
      printingBenefits: newBenefits,
    })),

  subscriptionCosts: [],
  setSubscriptionCosts: (newBenefits) =>
    set((state) => ({
      ...state,
      subscriptionCosts: newBenefits,
    })),

  implementationCosts: [],
  setImplementationCost: (newBenefits) =>
    set((state) => ({
      ...state,
      implementationCosts: newBenefits,
    })),
  onGoingCosts: [],
  setOngoingCosts: (newBenefits) =>
    set((state) => ({
      ...state,
      onGoingCosts: newBenefits,
    })),

  netBenefits: [],
  setNetBenefits: (newBenefits) =>
    set((state) => ({
      ...state,
      netBenefits: newBenefits,
    })),

  ROIs: [],
  setRoi: (newBenefits) =>
    set((state) => ({
      ...state,
      ROIs: newBenefits,
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
