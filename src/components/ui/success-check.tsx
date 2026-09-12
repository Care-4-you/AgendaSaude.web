"use client";

/**
 * Círculo verde com o "check" sendo desenhado, no estilo da confirmação de PIX.
 * As keyframes `check-pop` e `check-draw` ficam em tailwind.config.ts.
 */
export function SuccessCheck() {
  return (
    <div
      role="img"
      aria-label="Agendamento confirmado"
      className="flex h-20 w-20 animate-check-pop items-center justify-center rounded-full bg-agenda-saude-green-100 motion-reduce:animate-none"
    >
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 25l9 9 16-18"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={48}
          className="animate-check-draw text-white motion-reduce:animate-none"
        />
      </svg>
    </div>
  );
}
