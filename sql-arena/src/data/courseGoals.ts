import type { CourseGoal } from '../types';

export const courseGoals: CourseGoal[] = [
  {
    id: 1,
    title: 'Grundläggande SQL-programmering',
    description: 'Skriv SELECT, WHERE, ORDER BY, GROUP BY och JOIN-satser korrekt',
    category: 'core'
  },
  {
    id: 2,
    title: 'Databashanterare: SQLite och MySQL/MariaDB',
    description: 'Arbeta praktiskt med både SQLite och MariaDB i olika miljöer',
    category: 'core'
  },
  {
    id: 3,
    title: 'Optimering: backup, restore, index, struktur',
    description: 'Använd index och optimera databasstruktur för effektiva operationer',
    category: 'optimization'
  },
  {
    id: 4,
    title: 'Molntjänster för lagring',
    description: 'Förstå och använd molnbaserad databaslagring',
    category: 'cloud'
  },
  {
    id: 5,
    title: 'Databasdesign, relationsdatabaser',
    description: 'Designa relationsdatabaser med tabeller, nycklar och relationer',
    category: 'design'
  },
  {
    id: 6,
    title: 'Grundläggande optimering av databaser',
    description: 'Analysera och förbättra databasprestanda',
    category: 'optimization'
  },
  {
    id: 7,
    title: 'Normalformer',
    description: 'Tillämpa 1NF, 2NF och 3NF vid databasdesign',
    category: 'design'
  },
  {
    id: 8,
    title: 'Databaslösningar med Python',
    description: 'Använd Python för att arbeta med databaser programmatiskt',
    category: 'python'
  },
  {
    id: 9,
    title: 'Planera och utföra uppsättning av databaslagring',
    description: 'Sätt upp databaser lokalt och i virtualiserade miljöer',
    category: 'core'
  },
  {
    id: 10,
    title: 'Designa enklare databaser för effektiva arbetsflöden',
    description: 'Skapa databasstrukturer som stödjer verksamhetens behov',
    category: 'design'
  },
  {
    id: 11,
    title: 'Grundläggande underhåll: backup och återställning',
    description: 'Utför backup och restore av databaser säkert',
    category: 'optimization'
  },
  {
    id: 12,
    title: 'Utveckla effektiv relationsdatabas med dataintegritet',
    description: 'Bygg databaser med constraints, nycklar och normalisering',
    category: 'design'
  },
  {
    id: 13,
    title: 'Motivera designval: normalisering och optimering',
    description: 'Förklara och motivera databasdesign kopplat till krav och prestanda',
    category: 'design'
  },
  {
    id: 14,
    title: 'Utveckla lösningar mot databaser med Python',
    description: 'Bygg kompletta Python-applikationer som arbetar med databaser',
    category: 'python'
  }
];

export function getCourseGoalById(id: number): CourseGoal | undefined {
  return courseGoals.find(goal => goal.id === id);
}

export function getCourseGoalsByCategory(category: CourseGoal['category']): CourseGoal[] {
  return courseGoals.filter(goal => goal.category === category);
}

export function formatCourseGoals(goalIds: number[]): string {
  return goalIds
    .map(id => getCourseGoalById(id))
    .filter(Boolean)
    .map(goal => `Kursmål ${goal!.id}`)
    .join(', ');
}
