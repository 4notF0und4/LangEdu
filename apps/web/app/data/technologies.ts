export type TechnologyKind = "Dil" | "Framework" | "Kitabxana";

export interface Technology {
  slug: string;
  name: string;
  kind: TechnologyKind;
  mark: string;
  description: string;
  available: boolean;
}

// Kataloq metadatası; dərs məzmunu API və PostgreSQL-dən gəlir.
export const technologies: Technology[] = [
  {
    slug: "python",
    name: "Python",
    kind: "Dil",
    mark: "Py",
    description:
      "Sadə sintaksisdən başla. Avtomatlaşdırma, məlumatlarla iş və veb dünyasına ilk addımını at.",
    available: true,
  },
  {
    slug: "javascript",
    name: "JavaScript",
    kind: "Dil",
    mark: "JS",
    description: "Veb səhifələrə davranış əlavə edən proqramlaşdırma dili.",
    available: false,
  },
  {
    slug: "typescript",
    name: "TypeScript",
    kind: "Dil",
    mark: "TS",
    description: "JavaScript dünyasında tiplərlə daha aydın kod yaz.",
    available: false,
  },
  {
    slug: "vue",
    name: "Vue",
    kind: "Framework",
    mark: "V",
    description: "Komponentlərlə interaktiv istifadəçi interfeysləri qur.",
    available: false,
  },
  {
    slug: "react",
    name: "React",
    kind: "Kitabxana",
    mark: "Re",
    description: "İstifadəçi interfeyslərini komponentlər şəklində düşün.",
    available: false,
  },
];
