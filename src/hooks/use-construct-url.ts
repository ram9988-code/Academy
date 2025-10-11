import { env } from "@/lib/env";

export function useConstructUrl(key: string): string {
  return `https://academy.fly.storage.tigris.dev/${key}`;
}
