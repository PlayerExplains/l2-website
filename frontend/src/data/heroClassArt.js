/** L2-style illustrated portrait watermarks per 3rd class (IDs 88–118). */
const CLASS_IDS = [
  88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
  106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
];

export const HERO_CLASS_ART = Object.fromEntries(
  CLASS_IDS.map((id) => [String(id), `/icons/hero-classes/class-${id}.png`]),
);

export function getHeroClassArt(classId) {
  return HERO_CLASS_ART[String(classId)] ?? null;
}
