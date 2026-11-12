# gabrielcmerlin.github.io

Personal academic website of Gabriel da Costa Merlin, published at
<https://gabrielcmerlin.github.io>.

Built with [Jekyll](https://jekyllrb.com) on top of the
[Academic Pages](https://github.com/academicpages/academicpages.github.io)
template (itself a fork of Minimal Mistakes), under the MIT license (see `LICENSE`).

## Structure

| What | Where |
|---|---|
| Site settings, sidebar profile and links | `_config.yml` |
| Navbar | `_data/navigation.yml` |
| Home: About Me and the Updates timeline | `_pages/about.md`, `_data/updates.yml` |
| Publications (one file per paper) | `_publications/`, `_pages/publications.html` |
| Projects (one file per project) | `_projects/`, `_pages/projects.html` |
| Events (cards with a photo carousel) | `_data/events.yml`, `images/events/` |
| CV page, CV PDF and transcript | `_pages/cv.html`, `files/` |
| Styles of the custom pages | `_sass/layout/_page.scss` |
| Light and dark palettes ("dirt" theme, neutral grays) | `_sass/theme/_dirt_light.scss`, `_sass/theme/_dirt_dark.scss` |

Design conventions for new content are in `AGENTS.md`.

## Running locally

```bash
bundle config set --local path vendor/bundle
bundle install
npx uglify-js assets/js/plugins/jquery.greedy-navigation.js assets/js/_main.js assets/js/theme.js -c -m -o assets/js/main.min.js
bundle exec jekyll serve -l -H localhost
```

Open <http://localhost:4000>. Changes to `_config.yml` need a server restart.
`assets/js/main.min.js` is not committed: the deploy workflow builds it.

## Deploying

Every push to `master` runs `.github/workflows/jekyll.yml`, which minifies the
JavaScript, builds the site with Jekyll and publishes it to GitHub Pages.
