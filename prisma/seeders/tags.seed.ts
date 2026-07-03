import type { PrismaClient } from '../../src/generated/prisma/client';
import { tags } from '../seedData';

export async function seedTags(prisma: PrismaClient) {
  for (const item of tags) {
    const tag = await prisma.tag.upsert({
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
      await prisma.tagTranslation.upsert({
        where: {
          tagId_locale: {
            tagId: tag.id,
            locale: locale as 'UK' | 'EN',
          },
        },
        update: { title },
        create: {
          tagId: tag.id,
          locale: locale as 'UK' | 'EN',
          title,
        },
      });
    }
  }
}
