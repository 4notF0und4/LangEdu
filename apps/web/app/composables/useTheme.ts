export type ThemePreference = "system" | "light" | "dark";

export function useTheme() {
  const saved = useCookie<string>("langedu-theme", {
    default: () => "system",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });
  const preference = computed<ThemePreference>({
    get: () =>
      saved.value === "light" || saved.value === "dark"
        ? saved.value
        : "system",
    set: (value) => {
      saved.value = value;
    },
  });
  return { preference };
}
