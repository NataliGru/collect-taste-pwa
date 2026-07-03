# Prisma Workflow Guide для Collect Taste

Цей файл — шпаргалка по тому, як працювати з Prisma, PostgreSQL/Neon і міграціями в проєкті.

---

## 1. Головна ідея

У нашому проєкті джерелом правди є файл:

```txt
prisma/schema.prisma
```

Тобто ми не створюємо таблиці вручну в Neon. Ми описуємо моделі в Prisma, а Prisma сама створює SQL-міграції й застосовує їх до PostgreSQL.

Загальний цикл такий:

```txt
schema.prisma
  ↓
npx prisma migrate dev
  ↓
prisma/migrations/.../migration.sql
  ↓
PostgreSQL / Neon
  ↓
npx prisma generate
  ↓
Prisma Client для коду
```

---

## 2. Які файли важливі

Комітимо в Git:

```txt
prisma/schema.prisma
prisma/migrations/
prisma.config.ts
package.json
package-lock.json
.env.example
```

Не комітимо:

```txt
.env
.env.local
.env.development.local
src/generated/prisma
node_modules
```

У `.gitignore` має бути:

```gitignore
.env
.env.local
.env.development.local
src/generated/
node_modules/
```

---

## 3. Перевірка підключення до БД

Якщо треба перевірити, чи Prisma бачить Neon:

```bash
npx prisma db pull
```

Але для нашого проєкту `db pull` — це тільки тест підключення.

У нормальному робочому процесі ми не тягнемо схему з бази, а навпаки:

```txt
schema.prisma → migration → database
```

---

## 4. Створення першої міграції

Коли схема готова:

```bash
npx prisma format
npx prisma migrate dev --name init
npx prisma generate
```

Після цього зʼявиться папка типу:

```txt
prisma/migrations/20260702150000_init/migration.sql
```

Цю папку треба комітити.

---

## 5. Якщо змінила схему

Наприклад, додала нове поле в модель:

```prisma
model Recipe {
  id String @id @default(cuid())
  title String
  calories Float?
}
```

Після зміни:

```bash
npx prisma format
npx prisma migrate dev --name add_
npx prisma generate
```

Назва міграції має описувати зміну:

```bash
npx prisma migrate dev --name add_
npx prisma migrate dev --name edit_
npx prisma migrate dev --name remove_
```

---

## 6. Якщо треба видалити поле

Наприклад, прибрала поле `coverImage`.

```bash
npx prisma format
npx prisma migrate dev --name remove_
npx prisma generate
```

Важливо: якщо в цьому полі вже були дані, вони будуть втрачені.

---

## 7. Якщо треба перейменувати поле

Обережно. Якщо просто змінити:

```prisma
coverImage String?
```

на:

```prisma
coverImageUrl String?
```

Prisma може сприйняти це як:

```txt
видалити coverImage
створити coverImageUrl
```

Тобто дані можуть загубитися.

Безпечний варіант:

```bash
npx prisma migrate dev --create-only --name rename_cover_image_to_cover_image_url
```

Потім відкрити створений `migration.sql` і вручну зробити:

```sql
ALTER TABLE "Recipe" RENAME COLUMN "coverImage" TO "coverImageUrl";
```

Після цього застосувати міграцію:

```bash
npx prisma migrate dev
npx prisma generate
```

---

## 8. Якщо треба змінити тип поля

Наприклад:

```prisma
cookTimeSec String?
```

на:

```prisma
cookTimeSec Int?
```

Команди:

```bash
npx prisma format
npx prisma migrate dev --name change_cook_time_to_int
npx prisma generate
```

Якщо в таблиці вже є дані, треба перевірити, чи PostgreSQL зможе конвертувати їх без помилки.

---

## 9. Якщо зʼявився Drift detected

Повідомлення типу:

```txt
Drift detected: Your database schema is not in sync with your migration history.
```

означає, що база і локальні міграції не збігаються.

Наприклад:

- ти видалила папку `prisma/migrations`, але база памʼятає старі міграції;
- хтось змінив таблиці напряму в Neon;
- локальна історія міграцій не відповідає тому, що вже застосовано в базі.

Якщо це dev-база і дані не важливі, можна зробити reset:

```bash
npx prisma migrate reset
```

Потім:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Важливо: `migrate reset` видаляє всі таблиці й дані в цій базі.

---

## 10. Коли можна робити reset

Можна:

- на старті проєкту;
- у локальній/dev-базі;
- коли немає реальних користувачів і важливих даних;
- коли хочемо зробити одну чисту `init`-міграцію.

Не можна бездумно:

- на production;
- коли є реальні дані;
- коли база вже використовується користувачами.

---

## 11. Чистий reset на старті проєкту

Якщо хочемо прибрати старі тестові міграції й зробити одну чисту:

PowerShell:

```powershell
Remove-Item -Recurse -Force prisma/migrations
```

Bash/macOS/Linux:

```bash
rm -rf prisma/migrations
```

Потім:

```bash
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma generate
```

---

## 12. Перевірка статусу міграцій

```bash
npx prisma migrate status
```

Ця команда покаже, чи база синхронізована з локальними міграціями.

---

## 13. Форматування Prisma schema

Після будь-яких змін у `schema.prisma`:

```bash
npx prisma format
```

Це вирівнює схему і часто одразу показує помилки у звʼязках.

---

## 14. Генерація Prisma Client

Після міграцій або зміни схеми:

```bash
npx prisma generate
```

У нас клієнт генерується в:

```txt
src/generated/prisma
```

Цю папку не треба комітити.

---

## 15. Важливі правила для нашої схеми

### Інгредієнти

У V1 усі інгредієнти вводяться в грамах.

Тому в `RecipeProduct` краще мати поле типу:

```prisma
amountGrams Float?
```

А не:

```prisma
amount Float?
unit String?
```

Це спростить автоматичний розрахунок КБЖВ.

### Категорії і теги

Якщо рецепт може мати багато категорій або тегів, не додаємо масиви в `Recipe`.

Правильно:

```txt
Recipe
  ↓
RecipeCategory
  ↓
Category
```

і

```txt
Recipe
  ↓
RecipeTag
  ↓
Tag
```

### Алергени

Рецепт не зберігає алергени напряму.

Правильна логіка:

```txt
Recipe → RecipeProduct → Product → ProductAllergen → Allergen
```

Тобто алергени рецепта можна отримати через продукти.

### Кроки рецепта

Кроки рецепта — це окрема таблиця, а не `String[]`.

```txt
Recipe 1 → many RecipeStep
```

### Зображення рецепта

Кілька фото рецепта — це окрема таблиця:

```txt
Recipe 1 → many RecipeImage
```

---

## 16. Типовий щоденний workflow

Коли треба змінити БД:

```bash
# 1. Змінити prisma/schema.prisma

# 2. Відформатувати
npx prisma format

# 3. Створити міграцію
npx prisma migrate dev --name short_description

# 4. Згенерувати клієнт
npx prisma generate

# 5. Перевірити статус
npx prisma migrate status

# 6. Закомітити
 git add prisma/schema.prisma prisma/migrations prisma.config.ts package.json package-lock.json
 git commit -m "feat(database): short description"
```

---

## 17. Якщо Prisma лається на relation

Найчастіші причини:

- у моделі є relation field, але немає зворотного relation field;
- неправильні назви `fields` або `references`;
- поле `authorId` є, але relation `author` не описаний;
- many-to-many звʼязок описаний без проміжної таблиці, хоча нам потрібна явна join-таблиця.

Приклад правильного звʼязку:

```prisma
model Recipe {
  id       String @id @default(cuid())
  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
}

model User {
  id      String   @id @default(cuid())
  recipes Recipe[]
}
```

---

## 18. Якщо треба подивитися БД в браузері

```bash
npx prisma studio
```

Це відкриє Prisma Studio, де можна дивитися таблиці й записи.

---

## 19. Найголовніше

Не змінювати таблиці вручну в Neon, якщо ми працюємо через Prisma Migrate.

Правильний шлях:

```txt
schema.prisma → migrate dev → migration.sql → database
```

Якщо змінити щось вручну в Neon, Prisma може потім показати `Drift detected`.
