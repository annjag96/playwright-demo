/*export const PRODUCTS = {
  GREY_JACKET: 'Grey jacket',
  NOIR_JACKET: 'Blue jacket', 
  STRIPED_TOP: 'Striped top'
} as const; */

export const PRODUCTS = {
  GREY_JACKET: { label: 'Grey jacket', price: "£55.00" },
  NOIR_JACKET: { label: 'Noir jacket', price: "£60.00" },
  STRIPED_TOP: { label: 'Striped top', price: "£50.00" }
} as const;
