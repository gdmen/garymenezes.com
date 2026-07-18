# garymenezes.com

## Requirements:
* node v16.20.0
* gatsby (npm install -g gatsby-cli)
  * Gatsby CLI version: 2.19.3
  * Gatsby version: 2.32.13

## Setup:
* create deploy.mk and put your deploy scp / whatever commands in there as a default make target.
* copy .env.development to .env.production and edit it.

## Content workflow:
* `content/` (git submodule, also a folder in the Obsidian vault) holds the only source of truth: `.md` files.
* `scripts/hydrate.mjs` converts them to `.mdx` in `_generated/` (gitignored), which is what Gatsby sources.
* Hydration runs automatically inside `gatsby build` and `gatsby develop` (watch mode included), via `onPreBootstrap` in `gatsby-node.js`. Run manually with `npm run hydrate`.
* Never edit `.mdx` files — edit the `.md` in `content/`.

## Maintenance:
* npm update
