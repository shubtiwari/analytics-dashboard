export const formatToRupee = (number) => {
    return Intl.NumberFormat("en-IN", { minimumFractionDigits: 2 }).format(number);
  };
  