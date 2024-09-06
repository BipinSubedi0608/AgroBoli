import { addDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { productCollectionRef } from "../firebase";
import { ProductAddDto, ProductModel } from "../models/productModel";

export async function addProduct(productToAdd: ProductAddDto) {
  const completeProduct: ProductModel = {
    ...productToAdd,
    highestBid: 0,
    rating: 0,
    numberOfRatings: 0,
    numberOfBids: 0,
    productId: "",
    bids: [],
    isOpen: true,
  };

  const { productId, ...completeProductWithoutId } = completeProduct;

  await addDoc(productCollectionRef, { ...completeProductWithoutId });
}

export async function getAllProducts(): Promise<ProductModel[]> {
  const products: ProductModel[] = [];
  const querySnapshot = await getDocs(productCollectionRef);
  querySnapshot.forEach((doc) => {
    products.push({
      ...(doc.data() as ProductModel),
      productId: doc.id,
    });
  });

  return products;
}

export async function getProductWithId(
  productId: string
): Promise<ProductModel | null> {
  let product: ProductModel | null = null;
  const docRef = doc(productCollectionRef, productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    product = { ...(docSnap.data() as ProductModel), productId };
  } else {
    throw new Error("Product Not Found");
  }

  return product;
}

export async function updateProduct(product: ProductModel) {
  const { productId, ...productDetails } = product;
  await setDoc(doc(productCollectionRef, productId), {
    ...productDetails,
  });
}
