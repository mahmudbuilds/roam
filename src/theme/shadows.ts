export const shadows = {
  card: "0 2px 8px rgba(0, 0, 0, 0.04)",
  raised: "0 4px 16px rgba(0, 0, 0, 0.08)",
  overlay: "0 8px 32px rgba(0, 0, 0, 0.12)",
  glass: "0 8px 32px rgba(0, 0, 0, 0.08)",
} as const;

export type ShadowToken = keyof typeof shadows;
