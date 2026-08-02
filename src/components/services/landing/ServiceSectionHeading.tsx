type ServiceSectionHeadingProps = {
  id: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export function ServiceSectionHeading({
  id,
  title,
  intro,
  align = "left",
  className = "",
}: ServiceSectionHeadingProps) {
  return (
    <header
      className={`mb-10 max-w-[52rem] md:mb-14 ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <h2
        id={`${id}-heading`}
        className="font-display text-[clamp(1.65rem,1.35rem+1.1vw,2.75rem)] font-semibold tracking-[-0.02em] text-white text-balance"
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-[#cfd6de] text-pretty ${
            align === "center" ? "mx-auto max-w-[44rem]" : "max-w-[46rem]"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
