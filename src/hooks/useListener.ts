import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { productCollectionRef } from "../firebase";
import { ProductModel } from "../models/productModel";

export function useListenerToAllProducts() {
  const [products, setProducts] = useState<ProductModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(productCollectionRef, (snapshot) => {
      const listOfProducts: ProductModel[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as ProductModel),
        productId: doc.id,
      }));
      setProducts([...listOfProducts]);
    });
    setLoading(false);

    return () => unsubscribe();
  });

  return { products, loading };
}

export function useListenerToProductWithId(productId: string) {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const productDocRef = doc(productCollectionRef, productId);
    const unsubscribe = onSnapshot(productDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setProduct({
          ...(docSnapshot.data() as ProductModel),
          productId: docSnapshot.id,
        });
      } else {
        setProduct(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [productId]);

  return { product, loading };
}
