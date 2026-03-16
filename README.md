# Alex Chen — Product Designer Portfolio

A premium product designer portfolio built with Next.js, Tailwind CSS, and Framer Motion. Designed to feel like a modern digital studio website — editorial typography, generous white space, and refined motion design.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion v11
- **Language**: TypeScript
- **Fonts**: DM Serif Display + Inter (via next/font/google)

---

## Getting Started

### 1. Install dependencies

```bash
cd portfolio
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## Deploying to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js and configures everything.

### Option B: GitHub Integration

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Click Deploy — zero configuration needed

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Base styles, CSS variables, scrollbar
│   ├── layout.tsx           # Root layout, font loading, metadata
│   ├── page.tsx             # Homepage
│   └── work/
│       └── [slug]/
│           └── page.tsx     # Case study pages (dynamic routes)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Sticky header, hide-on-scroll, mobile menu
│   │   └── Footer.tsx       # Contact section + social links
│   │
│   ├── sections/            # Homepage sections
│   │   ├── Hero.tsx         # Full-screen hero with text reveal
│   │   ├── Work.tsx         # Editorial project list with hover preview
│   │   ├── Experience.tsx   # Expandable timeline on dark background
│   │   ├── MotionSection.tsx # Video grid with lightbox
│   │   ├── About.tsx        # Bio + portrait + photo carousel
│   │   └── Testimonials.tsx # Slider with large typography quotes
│   │
│   ├── case-study/          # Case study page sections
│   │   ├── CaseStudyHero.tsx
│   │   ├── ProblemStatement.tsx
│   │   ├── Goals.tsx
│   │   ├── Research.tsx
│   │   ├── DesignProcess.tsx
│   │   ├── KeyFeatures.tsx
│   │   ├── DesignDecisions.tsx
│   │   ├── FinalProduct.tsx
│   │   ├── Impact.tsx
│   │   └── Learnings.tsx
│   │
│   └── ui/                  # Reusable primitives
│       ├── AnimatedText.tsx  # Word/char/line reveal animations
│       ├── Button.tsx        # Animated button with variants
│       ├── CursorFollower.tsx # Custom cursor (desktop only)
│       ├── SectionLabel.tsx  # Eyebrow label component
│       └── VideoCard.tsx     # Video card with lightbox
│
├── data/
│   └── index.ts             # All placeholder data (projects, experience, etc.)
│
├── lib/
│   └── utils.ts             # cn() utility, animation variants
│
├── tailwind.config.ts       # Custom colors, fonts, animations
├── next.config.js           # Image domains, config
└── tsconfig.json
```

---

## Customization Guide

### Replace placeholder data

Edit `data/index.ts`:
- `projects` — your 4 case studies
- `experiences` — your work history
- `testimonials` — quotes from colleagues/clients
- `motionVideos` — your motion work
- `personalPhotos` — captions for personal photos

### Replace placeholder images

The portfolio uses CSS gradients as placeholder visuals. To replace:

1. **Project thumbnails** — Update `thumbnail` and `heroImage` in each project in `data/index.ts` to use actual image paths or change the gradient classes.

2. **Portrait photo** — In `components/sections/About.tsx`, replace the placeholder div with a `next/image` component pointing to your photo.

3. **Product screens** — In `components/case-study/FinalProduct.tsx` and `KeyFeatures.tsx`, replace the placeholder divs with actual screenshots.

4. **Motion videos** — In `components/ui/VideoCard.tsx`, replace the placeholder div in the lightbox with a `<video>` tag or YouTube/Vimeo embed iframe.

### Update personal info

- **Name**: Search and replace "Alex Chen" across all files
- **Email**: Update `components/layout/Footer.tsx`
- **Social links**: Update the `socials` array in `Footer.tsx`
- **Resume**: Place your `resume.pdf` in the `public/` folder

### Add your own fonts

In `app/layout.tsx`, swap the Google Font imports:
```tsx
import { YourFont } from 'next/font/google'
```

---

## Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| `cream` | `#F5F3EF` | Background |
| `ink` | `#0A0A0A` | Primary text |
| `muted` | `#6B6B6B` | Secondary text |
| `faint` | `#A8A8A4` | Tertiary text / labels |
| `border` | `#E4E2DD` | Dividers, card borders |

### Typography
- **Display headings**: DM Serif Display (`font-serif`)
- **Body / UI**: Inter (`font-sans`)
- **Tracking**: Labels use `tracking-widest` + `text-2xs` + `uppercase`

### Motion principles
- Duration: 0.4–0.8s for most transitions
- Easing: `[0.22, 1, 0.36, 1]` (premium ease-out)
- Stagger: 0.05–0.1s between children
- Never animate for decoration alone — always communicate state change

---

## Performance Notes

- Fonts loaded via `next/font/google` — zero layout shift, self-hosted
- Framer Motion animations use `useInView` for lazy triggering
- Custom cursor disabled on touch devices via `@media (pointer: coarse)`
- Images should use `next/image` for automatic optimization
- Case study pages use `generateStaticParams` for static generation

---

## Browser Support

Tested in Chrome, Firefox, Safari, Edge (latest versions).
Custom cursor gracefully degrades on touch/mobile devices.
