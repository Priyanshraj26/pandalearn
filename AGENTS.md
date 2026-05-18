<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# PandaLearn Design System Rules

**These rules are mandatory.** Every UI file written for PandaLearn must follow them exactly.

---

## 1. Two visual contexts - never mix them

| Context | Pages | Theme |
|---|---|---|
| **Light** | Landing (`/`), Auth (`/login`, `/signup`), Dashboard | White background, light surfaces |

**The landing page is the design authority.** All public-facing and auth pages must match its aesthetic exactly - white background, clean typography, violet + orange accent. Do not use dark backgrounds (`#0a0f1c`, `bg-gray-900`, etc.) anywhere outside `/learn/**` routes.

---

## 2. Color - always use CSS variables, never raw hex

All colours are defined in `src/app/globals.css` under `@theme inline`. Use those variables. Never hardcode a hex value directly in component files.

### Brand colours
| Variable | Value | Usage |
|---|---|---|
| `--pl-violet` | `#7c3aed` | Primary - active states, links, progress bars, module badges |
| `--pl-violet-hover` | `#6d28d9` | Violet hover state |
| `--pl-orange` | `#f97316` | **Primary CTA button** - Sign In, Start Free, Create Account |
| `--pl-orange-hover` | `#ea6c0a` | Orange hover |
| `--pl-green` | `#10b981` | Success, completed lessons, earned XP |
| `--pl-amber` | `#f59e0b` | Day streak, warnings |
| `--pl-red` | `#ef4444` | Errors, destructive actions |

### Light theme (all public + auth pages)
| Variable | Usage |
|---|---|
| `--pl-bg` (`#ffffff`) | Page background |
| `--pl-surface-1` (`#f9fafb`) | Form panels, sidebars, subtle raised surfaces |
| `--pl-surface-2` (`#f3f4f6`) | Cards, hover backgrounds, code areas |
| `--pl-border` (`#e5e7eb`) | Standard input/card borders |
| `--pl-border-strong` (`#d1d5db`) | Hovered/focused borders |
| `--pl-text-primary` (`#111827`) | Headings, strong labels |
| `--pl-text-secondary` (`#374151`) | Body copy |
| `--pl-text-muted` (`#6b7280`) | Supporting / helper text |
| `--pl-text-subtle` (`#9ca3af`) | Placeholders, timestamps |

### Violet tints
`--pl-violet-50` → `--pl-violet-400` (lightest to a bit stronger) - use for badge backgrounds, selected card fills, section tints.

### Dark theme (learn module viewer only)
`--pl-dark-bg` → `--pl-dark-5`, `--pl-dark-border`. Only use these inside `/learn/**` route segments.

**In Tailwind**: Use `[var(--pl-violet)]` syntax when a token doesn't map to a standard Tailwind class, e.g. `bg-[var(--pl-violet-50)]`. Prefer native Tailwind equivalents when they match exactly (e.g. `bg-violet-600` = `#7c3aed`).

---

## 3. Typography

| Use | Font | Class |
|---|---|---|
| Headings, hero, brand name, section titles | Sora | `font-sora font-bold` |
| All other text | DM Sans (default body) | no class needed - it's the default |

- Section eyebrows/labels: use `.section-label` utility or `text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-600`
- Never use Inter, Roboto, Arial, or system-ui directly.

---

## 4. Buttons - strict conventions

| Role | Class / Style |
|---|---|
| **Primary CTA** (Sign In, Start Free, Create Account, Submit) | `.btn-primary` or `bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl shadow-sm` |
| **Secondary action** (e.g. Explore Courses) | `.btn-outline` or `border-2 border-gray-200 hover:border-violet-300 text-gray-600 hover:text-violet-700 rounded-xl` |
| **Violet interactive** (nav active, module actions) | `.btn-violet` or `bg-violet-600 hover:bg-violet-500 text-white rounded-xl` |
| **Ghost / subtle** | `hover:bg-gray-100 text-gray-600 rounded-xl` |

**Never** use a violet button as the primary CTA on an auth page or landing page. Orange = action that drives conversion.

---

## 5. Form inputs (light theme)

Use the `.pl-input` utility class, or replicate:
```
bg-white border border-gray-200 hover:border-gray-300
focus:border-violet-500 focus:ring-2 focus:ring-violet-100
rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400
outline-none transition-all
```
- Label: `text-sm font-medium text-gray-700 mb-1.5`
- Icon prefix: `absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400`, add `pl-10` to input
- Error state: `bg-red-50 border border-red-200 text-red-600 rounded-xl`

---

## 6. Cards and surfaces (light theme)

Standard feature card:
```
bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow
```

Platform preview / mockup card (used in hero + auth left panel):
```
bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/60 overflow-hidden
```

Violet accent badge:
```
bg-violet-50 border border-violet-100 text-violet-700 rounded-full px-3 py-1 text-sm
```

---

## 7. Background patterns

Landing and auth pages use the **dot grid**:
```css
.dot-grid       /* standard - grey dots on white  */
.dot-grid-violet/* tinted - violet dots on white, for auth left panel */
```
Apply with `maskImage` fade to avoid hard edges:
```jsx
style={{
  maskImage: "radial-gradient(ellipse 100% 90% at 50% 0%, black 40%, transparent 100%)",
}}
```

---

## 8. What NOT to do

- Never use `bg-gray-900`, `bg-slate-900`, `#0a0f1c`, and em-dash or any dark background on auth/landing/dashboard pages.
- Never use Inter, Roboto, Arial, or `font-sans` as the display font.
- Never use a generic purple gradient (`from-purple-600 to-blue-500`) - that is "AI slop".
- Never add a `bg-gradient` hero unless it exactly matches the landing page's dot-grid + white aesthetic.
- Never hardcode hex colours - always use a CSS variable from globals.css.
- Never create a new design token; update globals.css if a new one is truly needed.
- Never mix light and dark surface tokens in the same component.
