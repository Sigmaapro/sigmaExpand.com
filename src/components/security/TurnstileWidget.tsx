"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

const SCRIPT_ID = "cf-turnstile-explicit";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "dark" | "light" | "auto";
  size?: "normal" | "compact" | "flexible";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  ready?: (cb: () => void) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstileScript(): Promise<TurnstileApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const onReady = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("turnstile missing"));
    };

    if (existing) {
      if (window.turnstile) {
        onReady();
        return;
      }
      existing.addEventListener("load", onReady, { once: true });
      existing.addEventListener("error", () => reject(new Error("script")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", onReady, { once: true });
    script.addEventListener("error", () => reject(new Error("script")), { once: true });
    document.head.appendChild(script);
  });
}

export type TurnstileWidgetHandle = {
  reset: () => void;
};

export function TurnstileWidget({
  onToken,
  onExpire,
  onError,
  widgetRef,
}: {
  onToken: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  widgetRef?: MutableRefObject<TurnstileWidgetHandle | null>;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);

  onTokenRef.current = onToken;
  onExpireRef.current = onExpire;
  onErrorRef.current = onError;

  useEffect(() => {
    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
    const host = hostRef.current;
    if (!sitekey || !host) {
      onErrorRef.current?.();
      return;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then((api) => {
        if (cancelled || !hostRef.current) return;
        widgetIdRef.current = api.render(hostRef.current, {
          sitekey,
          theme: "dark",
          size: "flexible",
          callback: (token) => {
            onTokenRef.current(token);
          },
          "expired-callback": () => {
            onTokenRef.current("");
            onExpireRef.current?.();
          },
          "error-callback": () => {
            onTokenRef.current("");
            onErrorRef.current?.();
          },
        });
      })
      .catch(() => {
        if (!cancelled) onErrorRef.current?.();
      });

    if (widgetRef) {
      widgetRef.current = {
        reset: () => {
          const id = widgetIdRef.current;
          if (id && window.turnstile) {
            window.turnstile.reset(id);
          }
          onTokenRef.current("");
        },
      };
    }

    return () => {
      cancelled = true;
      const id = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetRef) widgetRef.current = null;
      if (id && window.turnstile) {
        try {
          window.turnstile.remove(id);
        } catch {
          /* widget already gone */
        }
      }
    };
  }, [widgetRef]);

  return (
    <div className="flex min-h-[65px] w-full justify-center overflow-hidden">
      <div ref={hostRef} className="w-full max-w-[300px]" />
    </div>
  );
}
