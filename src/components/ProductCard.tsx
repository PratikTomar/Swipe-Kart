import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { MoveLeft, MoveRight, MoveUp } from "lucide-react";
import { useState } from "react";
import { Product } from "../utils/data";

type ProductCardProps = Product & {
  isFront: boolean;
  index: number;
  handleSwipeAction: (id: number, direction: "left" | "right" | "up") => void;
};

const ProductCard = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  discountPercentage,
  imageUrl,
  isFront,
  index,
  handleSwipeAction,
}: ProductCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const [hasSwiped, setHasSwiped] = useState(false);

  const handleDragEnd = () => {
    const currentX = x.get();
    const currentY = y.get();

    if (!isFront || hasSwiped) return;

    if (Math.abs(currentX) > 70 || currentY < -70) {
      setHasSwiped(true);

      let direction: "left" | "right" | "up";
      let exitX = 0;
      let exitY = 0;

      if (currentY < -70) {
        direction = "up";
        exitY = -1000;
      } else if (currentX > 70) {
        direction = "right";
        exitX = 1000;
      } else {
        direction = "left";
        exitX = -1000;
      }

      animate(x, exitX, { duration: 0.3 });
      animate(y, exitY, {
        duration: 0.3,
        onComplete: () => handleSwipeAction(id, direction),
      });
    }
  };

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-start  w-80 h-[28rem] p-3 rounded-2xl bg-white shadow-2xl "
      style={{
        x,
        y,
        rotate,
        opacity,
        scale: isFront ? 1 : 0.96,
        zIndex: index,
        pointerEvents: isFront ? "auto" : "none",
      }}
      drag={isFront && !hasSwiped ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      transition={{ duration: 0.3 }}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-60 rounded-xl mb-3 hover:cursor-grab active:cursor-grabbing"
      />
      <div className="text-center px-2">
        <h2 className="text-lg font-semibold capitalize">{name}</h2>
        <p className="text-sm text-gray-500 capitalize mt-1">{brand}</p>
        <div className="mt-2 flex items-center justify-center gap-2 text-base mb-3">
          <span className="text-green-600 font-bold">₹{price}</span>
          {originalPrice &&
          originalPrice > price &&
          discountPercentage &&
          discountPercentage > 0  && (
            <>
              <span className="line-through text-gray-400">
                ₹{originalPrice}
              </span>
              <span className="text-red-500 font-semibold">
                {discountPercentage}% OFF
              </span>
            </>
          ) }
        </div>
        <div className="flex justify-between border-t border-gray-200 p-4 text-base text-gray-500 gap-4">
          <button className="flex items-center gap-1 ">
            <MoveLeft size={16} />
            Dislike
          </button>
          <button className="flex items-center gap-1">
            <MoveUp size={16} />
            Add to Cart
          </button>
          <button className="flex items-center gap-1">
            Like
            <MoveRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
