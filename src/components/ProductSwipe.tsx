import { useState } from "react";
import { Product, productData } from "../utils/data";
import ProductCard from "./ProductCard";

const ProductSwipe = () => {
  const [cards, setCards] = useState<Product[]>(productData);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [cartProducts, setCartProducts] = useState<number[]>([]);
  const [disLikedProducts, setDisLikedProducts] = useState<number[]>([]);

  const handleSwipeAction = (
    id: number,
    direction: "left" | "right" | "up"
  ) => {
    if (direction === "right") {
      console.log("Liked Product ID:", id);
      setLikedProducts((prev) => [...prev, id]);
    } else if (direction === "left") {
      console.log("disliked Product ID:", id);
      setDisLikedProducts((prev) => [...prev, id]);
    } else if (direction === "up") {
      console.log("Add to cart Product ID:", id);
      setCartProducts((prev) => [...prev, id]);
    }

    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleStartAgain = () => {
    setCards(productData);
    setLikedProducts([]);
    setCartProducts([]);
    setDisLikedProducts([]);
  };

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No more products!</h2>
          <p className="text-gray-600">
            You have swiped through all the products.
          </p>
          <button
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mt-4"
            onClick={handleStartAgain}
          >
            Start Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-100"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {cards.length > 0 &&
        cards.map((card, index) => (
          <ProductCard
            key={card.id}
            {...card}
            index={index}
            isFront={index === cards.length - 1}
            handleSwipeAction={handleSwipeAction}
          />
        ))}

      {disLikedProducts.length > 0 && (
        <div className="fixed bottom-2 left-2 bg-white shadow-md px-4 py-2 rounded-lg">
          👎 Disliked: {disLikedProducts.length}
        </div>
      )}

      {cartProducts.length > 0 && (
        <div className="fixed bottom-2 bg-white shadow-md px-4 py-2 rounded-lg">
          🛒 Cart: {cartProducts.length}
        </div>
      )}

      {likedProducts.length > 0 && (
        <div className="fixed bottom-2 right-2 bg-white shadow-md px-4 py-2 rounded-lg">
          ❤️ Liked: {likedProducts.length}
        </div>
      )}
    </div>
  );
};

export default ProductSwipe;
