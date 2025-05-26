export type ProductType = {
  currentPrice: number;
}
function swap(arr: ProductType[],i: number ,j: number) : void{
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr: ProductType[], low: number, high: number): number {
  const pivot = arr[high].currentPrice;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j].currentPrice <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

export function quickSort(arr: ProductType[], low: number, high: number): void{
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

