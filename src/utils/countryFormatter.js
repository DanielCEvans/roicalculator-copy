export const countryFormatter = (country) => {
  switch (country) {
    case "AU":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AUD",
      });
    case "NZ":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NZD",
      });
    case "UK":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GBP",
      });
    case "SG":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "SGD",
      });
    case "MY":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      });
  }
};

export const countryPrefixFormatter = (country) => {
  switch (country) {
    case "AU":
      return "A$";
    case "NZ":
      return "NZ$";
    case "UK":
      return "£";
    case "SG":
      return "SGD";
    case "MY":
      return "MYR";
  }
};
