# How to run

1. Install packages (`pnpm install`)
2. Execute `cd apps/api` and in 2 terminals:
   - run `pnpm dlx prisma dev`, and copy the given `DATABASE_URL` printend by prisma local database in the terminal in `.env`
   - run `pnpm dlx prisma migrate dev` and then `pnpm dlx prisma generate`
3. In `storefront`: copy the api base url like this: `NEXT_PUBLIC_API_URL="http://localhost:3333"` (no trailing slash) in `.env`
4. Run dev (`pnpm run dev`), this will :
   - run prisma development database
   - run the api server
   - run the front app
