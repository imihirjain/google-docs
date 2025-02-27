import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const markers = Array.from({ length: 83 }, (_, i) => i);
export const Ruler = () => {
  const [leftMouse, setLeftMouse] = useState(56);
  const [rightMouse, setRightMouse] = useState(56);

  const [isDraggLeft, setIsDraggLeft] = useState(false);
  const [isDraggRight, setIsDraggRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggLeft || isDraggRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");

      if (container) {
        const containerReact = container.getBoundingClientRect();
        const relativeX = e.clientX - containerReact.left;
        const rawPos = Math.max(0, Math.min(816, relativeX));

        if (isDraggLeft) {
          const maxLeftPos = 816 - rightMouse - 100;
          const newLeftPos = Math.min(rawPos, maxLeftPos);
          setLeftMouse(newLeftPos);
        } else if (isDraggRight) {
          const maxRightPos = 816 - (leftMouse + 100);
          const newRightPos = Math.max(816 - rawPos, 0);
          const constrainedRightPos = Math.min(newRightPos, maxRightPos);

          setRightMouse(constrainedRightPos);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggLeft(false);
    setIsDraggRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMouse(56);
  };
  const handleRightDoubleClick = () => {
    setRightMouse(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden "
    >
      <div id="ruler-container" className="w-full h-full relative">
        <Marker
          position={leftMouse}
          isLeft={true}
          isDragging={isDraggLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMouse}
          isLeft={false}
          isDragging={isDraggRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  className=" absolute bottom-0"
                  key={marker}
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] bg-neutral-500 h-1.5" />
                  )}

                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] bg-neutral-500 h-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
interface MarkupProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkupProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2 "
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2 " />
      <div
        className="absolute left-1/2 transform top-4 -translate-x-1/2 transition-opacity duration-150"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3b72f6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
