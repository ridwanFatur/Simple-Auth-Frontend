import React, { useState, useEffect } from "react";

interface ProgressCircleProps extends React.HTMLProps<HTMLDivElement> {
  isIndeterminate?: boolean;
  progress?: number;
  circleRadius?: number;
  strokeWidth?: number;
  trackClassName?: string;
  progressClassName?: string;
  loadingProgressRatio?: number;
  transitionDuration?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  animate?: boolean;
}

// Add keyframes for the spin animation
const keyframes = `
@keyframes spin {
  0% { transform: rotate(-90deg); }
  100% { transform: rotate(270deg); }
}
`;

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  isIndeterminate = false,
  progress = 0,
  circleRadius = 10,
  strokeWidth = 3,
  trackClassName = "",
  progressClassName = "",
  loadingProgressRatio = 0.2,
  transitionDuration = 0.3,
  color = "#3b82f6", // blue-500
  trackColor = "#e5e7eb", // gray-200
  showLabel = true,
  animate = true,
  className = "",
  ...props
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  // Animation effect with improved easing
  useEffect(() => {
    if (!animate) {
      setAnimatedProgress(normalizedProgress);
      return;
    }

    let animationFrame: number;
    const startTime = Date.now();
    const startProgress = animatedProgress;
    const diff = normalizedProgress - startProgress;
    const duration = transitionDuration * 1000;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      // Apply easing function for smoother acceleration/deceleration
      const easedProgress = easeOutCubic(linearProgress);
      setAnimatedProgress(startProgress + diff * easedProgress);

      if (linearProgress < 1) {
        animationFrame = requestAnimationFrame(animateProgress);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [normalizedProgress, animate, transitionDuration]);

  // SVG parameters
  const size = circleRadius * 2;
  const centerPoint = size / 2;
  const radius = centerPoint - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (animatedProgress / 100) * circumference;

  const progressStyle = isIndeterminate
    ? {
        strokeDasharray: `${circumference * loadingProgressRatio} ${
          circumference * (1 - loadingProgressRatio)
        }`,
        stroke: color,
        transformOrigin: "center",
      }
    : {
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset: progressOffset,
        stroke: color,
        transition: animate
          ? `stroke-dashoffset ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`
          : "none",
      };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      <style>{keyframes}</style>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Track Circle */}
        <circle
          className={`${trackClassName}`}
          cx={centerPoint}
          cy={centerPoint}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <circle
          className={`${progressClassName}`}
          cx={centerPoint}
          cy={centerPoint}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            ...progressStyle,
            ...(isIndeterminate && animate
              ? {
                  animation: "spin 1.5s linear infinite",
                }
              : {}),
          }}
          transform={`rotate(-90 ${centerPoint} ${centerPoint})`}
        />
      </svg>

      {/* Label */}
      {showLabel && !isIndeterminate && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {Math.round(normalizedProgress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
