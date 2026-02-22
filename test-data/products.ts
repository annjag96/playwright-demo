/*export const PRODUCTS = {
  GREY_JACKET: 'Grey jacket',
  NOIR_JACKET: 'Blue jacket', 
  STRIPED_TOP: 'Striped top'
} as const; */

export const PRODUCTS = {
  GREY_JACKET: { label: 'Grey jacket', price: "£55.00", variantId: "611945025"},
  NOIR_JACKET: { label: 'Noir jacket', price: "£60.00", variantId: "611952521" },
  STRIPED_TOP: { label: 'Striped top', price: "£50.00", variantId: "611951029" }
} as const;
