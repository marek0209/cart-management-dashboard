import { getCarts, getSingleCart, addCart, deleteCart } from "./cartService";

describe("getCarts", () => {
  it("should return an array of carts", async () => {
    const carts = await getCarts();
    expect(Array.isArray(carts)).toBe(true);
  });

  it("should contain carts with expected properties", async () => {
    const carts = await getCarts();
    carts.forEach((cart) => {
      expect(cart.id).toBeDefined();
      expect(cart.userId).toBeDefined();
      expect(cart.products).toBeDefined();
      expect(cart.products[0].id).toBeDefined();
    });
  });
});

describe("getSingleCart", () => {
  it("should return a single cart with expected properties", async () => {
    const cartId = 1;
    const cart = await getSingleCart(cartId);
    expect(cart.id).toBe(cartId);
    expect(cart.userId).toBeDefined();
    expect(cart.products).toBeDefined();
    expect(cart.total).toBeDefined();
    expect(cart.totalProducts).toBeDefined();
    expect(cart.totalQuantity).toBeDefined();
    expect(cart.discountedTotal).toBeDefined();
  });

  it("should throw an error for non-existent cart", async () => {
    const cartId = 999;
    await expect(getSingleCart(cartId)).rejects.toThrow(
      "The requested resource was not found."
    );
  });
});

describe("addCart", () => {
  it("should return a cart with expected properties", async () => {
    const products = [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 50,
        quantity: 2,
      },
    ];
    const cart = await addCart(products);
    expect(cart.id).toBeDefined();
    expect(cart.userId).toBeDefined();
    expect(cart.products[0].id).toBe(1);
    expect(cart.products[1].id).toBe(50);
  });

  it("should throw an error for invalid products", async () => {
    const products: any = [];
    await expect(addCart(products)).rejects.toThrow("Failed to add cart.");
  });
});

describe("deleteCart", () => {
  it("should describe cart as deleted the cart", async () => {
    const cartId = 1;
    await expect(deleteCart(cartId)).resolves.toBeUndefined();
  });

  it("should throw an error for non-existent cart", async () => {
    const cartId = 999;
    await expect(deleteCart(cartId)).rejects.toThrow(
      "The requested resource was not found."
    );
  });
});
