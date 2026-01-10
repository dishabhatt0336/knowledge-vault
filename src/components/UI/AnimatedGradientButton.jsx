import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";

export function AnimatedGradientButton({
  text = "Click Me",
  icon = <ChevronRight className="w-6 h-6" />,
  emoji = "🎉",
  className = "",
  onClick,
  ...props
}) {
  return (
    <div
      className={cn(
        "group relative  flex items-center justify-center rounded-full px-6 py-3",
        "shadow-[inset_0_-8px_10px_#8fdfff1f] transition-all duration-300 ease-out",
        "hover:shadow-[inset_0_-5px_10px_#8fdfff3f] hover:scale-105 cursor-pointer select-none",
        "border border-white/20 backdrop-blur-sm",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Gradient Border */}
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />

      {/* Emoji */}
      <span className="text-xl">{emoji}</span>
      <hr className="mx-3 h-6 w-px shrink-0 bg-neutral-500" />

      {/* Animated Text */}
      <AnimatedGradientText className="text-lg font-medium">{text}</AnimatedGradientText>

      {/* Icon */}
      <span className="ml-2 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5">
        {icon}
      </span>
    </div>
  );
}
