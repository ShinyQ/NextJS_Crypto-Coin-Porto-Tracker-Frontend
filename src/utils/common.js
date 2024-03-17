export function formatToRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(number);
  };
  
export function formatToDollar(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
  }).format(number)
}

export function calculateROI(startPortofolio, totalPortofolio) {
  return (((totalPortofolio - startPortofolio) / startPortofolio) * 100).toFixed(2);
}