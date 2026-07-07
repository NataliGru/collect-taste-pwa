import { PrismaClient } from '@/generated/prisma/client';

import { allergens } from '../seedData';

export async function seedAllergens(prisma: PrismaClient) {
  for (const item of allergens) {
    const allergen = await prisma.allergen.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
      },
      create: {
        slug: item.slug,
        title: item.title,
      },
    });

    for (const [locale, title] of Object.entries(item.translations)) {
      await prisma.allergenTranslation.upsert({
        where: {
          allergenId_locale: {
            allergenId: allergen.id,
            locale: locale as 'UK' | 'EN',
          },
        },
        update: { title },
        create: {
          allergenId: allergen.id,
          locale: locale as 'UK' | 'EN',
          title,
        },
      });
    }
  }
}
