# Translation app

## Introduction

The architecture was designed for production and the implied complexity in mind. Thus, the app contains some concept like `project` (and `user` but removed).

## Front-end and back-end architecture

As told in the project description, the front-end is in `Next.js` and `Shadcn`.
The backend is written with `AdonisJS`.

At the begining, `Fastify` was the first option. But after some reflexion, we decided to choose `AdonisJS` to deliver an example project with the framework and to familiarize with it.

However, `Prisma` was choosen because we are more used to, and it deliver more tools like the `Prisma Postgres` platform (was meant to be the production database) and the `prisma dev` command to ease develpment with a simple local dev database.

## Typing and testing

Unfortunatly, we were not able to deliver a complete test suit as efforts was all given to the UI/UX deliverability and robust data modeling.

The type system is fullly functional and inherited by the UI logic and data model (we create a type from the daatabase query result and for business logic functin).

## Data model

The model was designed more for translation keys and locales managment. As you can see in the `schema.prisma` file, the `TranslationKey` is for the keys (path in the original json file) and `Translation` is for the actual translation tokens.

You can see also that there is a `Project` table. As mentionned above, this was meant for production and is ready for adding project owner (user/organization).

## Development Journey

What challenges did you encounter?
There were 2 main pain points: the data table logic and handling `AdonisJS`.

1. **Data table**: `@tanstack/react-table` is a complete and complex tool. In the short delay of this project, there were not much time to fully comprehend the features that would be used for this project: grouping. So, we decided to keep it simple and use the group entry as simple rows. This refactor and proper use of `@tanstack/react-table` would be a good enhancement of the project and would unlock a few features.
2. **AdonisJS**: as we never had a complex project in `AdonisJS`, this project was at the same time a deeper introduction (yet pretty superficial) to the framework. Therefore, some features finished abandonned but would be great to implement in the future of the project.

In a refactoring or project amelioration purpose, some changes or adding would be great like:

- **user and organization**: already initialized by the concept of `Project`, this feature is obviously a mandatory for a tool meant to be used by end users and especially teams
- **keys collapsing**: hide a group of rows from a unique parent
- **locale state**: even though the data are persisted, having a feature complete local sotre for the state will increase performance by acting as a cache and layer that send the data to the server asynchronously (in the background).
- **add keys**: the app allow adding a child key to a parent but in a simple way only. The idea is to add a full tree from any level and even a root level key
- **add locale**: this can only be made by adding a file only for now, but would be great if can be added independently.
- **realtime collaboration**: the trendy killer feature to sell product before AI was realtime collaboration and for this tool, giving team the ability to work on the same project at the same time and have realtime feedback would be a great evolution
- **AI 😉**: already suggested, with 2 variations: AI suggestion for a value (a local for a given key), and for the entire project at once.
