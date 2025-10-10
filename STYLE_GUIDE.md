# Continuum Design System
## Minimal. Technical. Trust-First.

*Inspired by Plural's brutalist aesthetic, refined for the data trust layer.*

---

## Philosophy

The Continuum design system is built on three principles:

1. **Minimal** - Remove everything that doesn't serve a purpose
2. **Technical** - Embrace monospace, code blocks, and system fonts
3. **Trust-First** - Visual design that reinforces cryptographic certainty

We use restraint, not decoration. Every pixel communicates function, not flair.

---

## Color System

### Dark Foundation
```css
Background: #0a0e14 (Deep dark blue-black)
Surface: #252b3a (Subtle elevation)
```

### Purple Accent (Primary)
```css
Primary: #8b5cf6 (Vibrant purple)
Primary Hover: #9d6ff7
Gradient: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)
```

### Brand Gradients
```css
Myn: linear-gradient(135deg, #C5B6F7 0%, #A7E2F2 100%)
Ethos: #8b5cf6 (solid primary)
Continuum: linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #FF7AE0 100%)
```

### Opacity Scale
```css
100%: text-white (headings, emphasis)
60%: text-white/60 (body text)
40%: text-white/40 (labels, secondary)
30%: text-white/30 (tertiary, footer)
20%: text-white/20 (dividers, subtle)
8%: border-white/[0.08] (borders)
3%: border-white/[0.03] (subtle dividers)
2%: bg-white/[0.02] (hover states)
```

---

## Typography

### Font Weights
- **Light (300)**: Large headings, hero text
- **Normal (400)**: Body text
- **Medium (500)**: Buttons, links
- **Semibold (600)**: Navigation, labels

### Scale
```css
Hero: text-8xl (96px) font-light
H1: text-7xl (72px) font-light
H2: text-6xl (60px) font-light
H3: text-5xl (48px) font-light
H4: text-3xl (30px) font-light
H5: text-2xl (24px) font-light
Body Large: text-xl (20px) font-light text-white/60
Body: text-base (16px) text-white/50
Small: text-sm (14px) text-white/40
Tiny: text-xs (12px) uppercase tracking-[0.15em] text-white/40
```

### Letter Spacing
```css
Headings: tracking-tight (-0.025em)
Labels: tracking-[0.15em] (wide, uppercase)
Body: tracking-normal
```

---

## Layout

### Grid System
```css
Max Width: max-w-[1400px]
Padding: px-8 (32px)
Sections: py-32 (128px vertical spacing)
```

### Spacing Scale
- **Tight**: gap-4 (16px)
- **Default**: gap-8 (32px)
- **Loose**: gap-16 (64px)
- **Extra Loose**: gap-24 (96px)

### Border Radius
```css
Small: rounded-lg (8px)
Medium: rounded-xl (12px)
Large: rounded-2xl (16px)
None: rounded-none (0px - for full-width elements)
```

---

## Components

### GridBackground
```jsx
<GridBackground showCorners className="min-h-screen">
  {children}
</GridBackground>
```

- Subtle 40px × 40px grid pattern
- Corner accent markers (optional)
- Always used as page wrapper

### SectionDivider
```jsx
<SectionDivider label="Section Name" />
```

- Thin horizontal line
- Uppercase label with wide tracking
- 10px spacing between sections

### ButtonPurple
```jsx
<ButtonPurple className="h-12 px-8 text-base" asChild>
  <Link href="/path">Button Text</Link>
</ButtonPurple>
```

**Specs:**
- Purple gradient background
- White text, medium weight
- 0.5rem border radius
- Shadow: `0 4px 20px rgba(139, 92, 246, 0.3)`
- Hover: Lift 2px, stronger shadow
- Active: Reset to 0px

### StatCard
```jsx
<StatCard value="100%" label="Description text" />
```

- Large number (text-7xl)
- Light font weight
- Small label below
- Used in grid with 1px dividers

### GlassCard
```jsx
<GlassCard className="p-12">
  {children}
</GlassCard>
```

**Specs:**
```css
background: rgba(37, 43, 58, 0.5);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

## Patterns

### Product Cards (3-column grid)
```css
Grid: grid lg:grid-cols-3 gap-px bg-white/[0.03]
Cards: bg-background p-12 hover:bg-white/[0.02]
Top Border Animation: h-px w-0 → w-full on hover
```

### How It Works Sections
```css
Numbers: h-16 w-16 rounded-full border border-white/[0.08]
Content: p-16 with gap-12
Dividers: space-y-px bg-white/[0.03]
```

### Stats Display
```css
Layout: grid grid-cols-3/4 divide-x divide-white/[0.03]
Card: p-12 border-r last:border-r-0
Value: text-7xl font-light
Label: text-sm text-white/60
```

### Feature Grids
```css
Layout: grid md:grid-cols-2/3 gap-px bg-white/[0.03]
Card: bg-background p-12
Icon: h-14 w-14 rounded-xl bg-primary/10 border border-primary/20
```

---

## Animations

### Hover States
```css
Cards: hover:bg-white/[0.02]
Buttons: hover:transform translateY(-2px)
Links: hover:text-white (from text-white/60)
```

### Transitions
```css
Standard: transition-all duration-300
Border Animation: transition-all duration-500
```

### Special
```css
Gradient Flow: animate-gradient-flow (for Continuum gradient)
```

---

## Code Blocks

For technical/protocol pages:

```jsx
<div className="bg-[#0D0E12] rounded-2xl p-8 border border-white/[0.05] font-mono text-sm">
  <pre className="text-white/60 leading-relaxed">
    {code}
  </pre>
</div>
```

**Header:**
```jsx
<div className="flex items-center justify-between mb-6">
  <span className="text-white/40 text-xs uppercase">filename.rs</span>
  <div className="flex gap-2">
    <div className="h-3 w-3 rounded-full bg-red-500/30" />
    <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
    <div className="h-3 w-3 rounded-full bg-green-500/30" />
  </div>
</div>
```

---

## Navigation

### Header
```css
Height: h-20 (80px)
Border: border-b border-white/[0.08]
Background: bg-background/80 backdrop-blur-xl
Fixed: top-0 w-full z-50
```

### Links
```css
Default: text-sm text-white/60 hover:text-white
Active: text-primary
Divider: h-6 w-px bg-white/[0.08]
```

---

## Footer

```css
Border: border-t border-white/[0.08]
Background: optional bg-muted/20
Padding: px-8 py-16
Grid: grid-cols-4 gap-16
```

**Footer Links:**
```css
Heading: text-xs uppercase tracking-[0.15em] text-white/40
Links: text-sm text-white/60 hover:text-white
```

---

## Brand Colors Reference

### Myn (Personal)
```css
Primary: #C5B6F7 (Soft purple)
Secondary: #A7E2F2 (Soft cyan)
Gradient: linear-gradient(135deg, #C5B6F7 0%, #A7E2F2 100%)
```

### Ethos (Enterprise)
```css
Primary: #8b5cf6 (Vibrant purple - same as system primary)
```

### Continuum (Protocol)
```css
Cyan: #00D4FF
Purple: #8B5CF6
Pink: #FF7AE0
Gradient: linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #FF7AE0 100%)
Animation: 6s infinite gradient flow
```

---

## Usage Guidelines

### DO ✓
- Use light font weights for large text
- Embrace whitespace and breathing room
- Use monospace for technical content
- Keep borders subtle (white/[0.08])
- Use uppercase + wide tracking for labels
- Prefer glass effects over solid backgrounds
- Use 1px dividers (`gap-px`) for grids

### DON'T ✗
- Use bold weights for headings
- Crowd elements together
- Mix sans-serif with body text in tech sections
- Use thick borders
- Overuse color (keep it minimal)
- Use solid dark cards everywhere
- Use box-shadow without purpose

---

## File Structure

```
components/ui/plural/
├── index.ts              # Barrel export
├── grid-background.tsx   # Page wrapper with grid
├── section-divider.tsx   # Horizontal dividers
├── button-purple.tsx     # Primary CTA button
├── stat-card.tsx         # Large number displays
└── glass-card.tsx        # Frosted glass container
```

---

## Responsive Considerations

### Breakpoints
```css
Mobile: default
Tablet: md: (768px)
Desktop: lg: (1024px)
Wide: xl: (1280px)
```

### Grid Adjustments
```css
Mobile: grid-cols-1
Tablet: md:grid-cols-2
Desktop: lg:grid-cols-3/4
```

### Typography Scale
```css
Hero Mobile: text-6xl → text-8xl desktop
H1 Mobile: text-5xl → text-7xl desktop
Padding Mobile: px-6 → px-8 desktop
```

---

## Accessibility

- Maintain 4.5:1 contrast ratio (white/60 on #0a0e14 passes)
- All interactive elements have hover states
- Focus rings use primary color
- Semantic HTML (header, nav, section, footer)
- Alt text for logo SVGs

---

## Implementation Notes

### CSS Location
All custom utilities in `app/globals.css`:
- `.grid-background` - Grid pattern
- `.glass-card` - Frosted glass effect
- `.btn-purple` - Purple gradient button
- `.hover-lift` - Lift on hover
- `.hover-glow` - Glow on hover

### Tailwind Config
Dark mode default in `next.config.ts`:
```ts
experimental: {
  darkMode: 'class'
}
```

Colors defined inline using Tailwind's opacity syntax:
```tsx
className="bg-white/[0.08]"  // 8% opacity
className="text-white/60"     // 60% opacity
```

---

## Examples

### Minimal Hero
```jsx
<section className="pt-40 pb-32 px-8">
  <div className="max-w-[900px] mx-auto text-center space-y-8">
    <h1 className="text-8xl font-light tracking-[-0.02em] text-white">
      The Continuum
      <br />
      <span className="text-white/40">of Trust</span>
    </h1>
    <p className="text-xl font-light text-white/50">
      Description text here
    </p>
    <ButtonPurple>Get Started</ButtonPurple>
  </div>
</section>
```

### Feature Grid
```jsx
<div className="grid md:grid-cols-3 gap-px bg-white/[0.03]">
  <div className="bg-background p-12">
    <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
      <Icon className="h-7 w-7 text-primary" />
    </div>
    <h3 className="text-2xl font-light text-white mb-4">Feature Name</h3>
    <p className="text-base text-white/50 leading-relaxed">
      Description text
    </p>
  </div>
</div>
```

---

*This design system is a living document. Update as the product evolves.*

**Built with:** Next.js 15, Tailwind CSS v4, Radix UI, Polkadot.js
