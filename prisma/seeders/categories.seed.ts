import type { PrismaClient } from '../../src/generated/prisma/client';
import { categories } from '../seedData';

export async function seedCategories(prisma: PrismaClient) {
  for (const item of categories) {
    const category = await prisma.category.upsert({
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
      await prisma.categoryTranslation.upsert({
        where: {
          categoryId_locale: {
            categoryId: category.id,
            locale: locale as 'UK' | 'EN',
          },
        },
        update: { title },
        create: {
          categoryId: category.id,
          locale: locale as 'UK' | 'EN',
          title,
        },
      });
    }
  }
}
