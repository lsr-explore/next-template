# Biome vs ESLint: Accessibility Rule Comparison

## Strategy

This project uses **two linters** with clearly separated responsibilities:

| Tool | Responsibility |
|------|---------------|
| **Biome** | Formatting, import ordering, general JS/TS lint rules |
| **ESLint** | Accessibility (`eslint-plugin-jsx-a11y`), Next.js-specific rules, React hooks |

**Why two tools?** Biome is fast and handles formatting + general linting in one pass. ESLint has a richer plugin ecosystem — especially for accessibility, where `eslint-plugin-jsx-a11y` is more mature and widely adopted than Biome's built-in a11y rules.

## How duplicates are avoided

1. **Biome a11y rules are disabled** — `biome.json` sets `"a11y": { "recommended": false }` so all Biome accessibility rules are off.
2. **`eslint-config-biome`** is the last entry in `eslint.config.mjs` — it disables ESLint formatting/style rules that Biome already handles (spacing, quotes, semicolons, etc.).

This means:
- **Accessibility** → ESLint (jsx-a11y) is the single source of truth
- **Formatting** → Biome is the single source of truth
- **No rule conflicts** between the two tools

## Rule mapping: Biome a11y → ESLint jsx-a11y

All Biome a11y rules are **disabled**. The table below shows what each Biome rule maps to in jsx-a11y, so you can see the coverage.

### Rules with direct equivalents (jsx-a11y covers these)

| Biome Rule | jsx-a11y Equivalent | Status |
|-----------|---------------------|--------|
| `noAccessKey` | `jsx-a11y/no-access-key` | jsx-a11y active |
| `noAriaHiddenOnFocusable` | `jsx-a11y/no-aria-hidden-on-focusable` | jsx-a11y active |
| `noAriaUnsupportedElements` | `jsx-a11y/aria-unsupported-elements` | jsx-a11y active |
| `noAutofocus` | `jsx-a11y/no-autofocus` | jsx-a11y active |
| `noDistractingElements` | `jsx-a11y/no-distracting-elements` | jsx-a11y active |
| `noHeaderScope` | `jsx-a11y/scope` | jsx-a11y active |
| `noInteractiveElementToNoninteractiveRole` | `jsx-a11y/no-interactive-element-to-noninteractive-role` | jsx-a11y active |
| `noNoninteractiveElementToInteractiveRole` | `jsx-a11y/no-noninteractive-element-to-interactive-role` | jsx-a11y active |
| `noNoninteractiveTabindex` | `jsx-a11y/no-noninteractive-tabindex` | jsx-a11y active |
| `noPositiveTabindex` | `jsx-a11y/tabindex-no-positive` | jsx-a11y active |
| `noRedundantAlt` | `jsx-a11y/img-redundant-alt` | jsx-a11y active |
| `noRedundantRoles` | `jsx-a11y/no-redundant-roles` | jsx-a11y active |
| `useAltText` | `jsx-a11y/alt-text` | jsx-a11y active |
| `useAnchorContent` | `jsx-a11y/anchor-has-content` | jsx-a11y active |
| `useAriaActivedescendantWithTabindex` | `jsx-a11y/aria-activedescendant-has-tabindex` | jsx-a11y active |
| `useAriaPropsForRole` | `jsx-a11y/role-has-required-aria-props` | jsx-a11y active |
| `useButtonType` | _(no equivalent)_ | **Gap** — see below |
| `useHeadingContent` | `jsx-a11y/heading-has-content` | jsx-a11y active |
| `useHtmlLang` | `jsx-a11y/html-has-lang` | jsx-a11y active |
| `useIframeTitle` | `jsx-a11y/iframe-has-title` | jsx-a11y active |
| `useKeyWithClickEvents` | `jsx-a11y/click-events-have-key-events` | jsx-a11y active |
| `useKeyWithMouseEvents` | `jsx-a11y/mouse-events-have-key-events` | jsx-a11y active |
| `useMediaCaption` | `jsx-a11y/media-has-caption` | jsx-a11y active |
| `useValidAnchor` | `jsx-a11y/anchor-is-valid` | jsx-a11y active |
| `useValidAriaProps` | `jsx-a11y/aria-props` | jsx-a11y active |
| `useValidAriaRole` | `jsx-a11y/aria-role` | jsx-a11y active |
| `useValidAriaValues` | `jsx-a11y/aria-proptypes` | jsx-a11y active |
| `useValidLang` | `jsx-a11y/lang` | jsx-a11y active |

### Biome-only rules (no jsx-a11y equivalent)

| Biome Rule | Description | Recommendation |
|-----------|-------------|----------------|
| `noBlankTarget` | Warns on `target="_blank"` without `rel="noreferrer"` | Low risk in Next.js (Link component handles this). Consider enabling in Biome if using raw `<a>` tags. |
| `noSvgWithoutTitle` | Requires `<title>` in SVGs for screen readers | Consider enabling this specific rule in Biome: `"noSvgWithoutTitle": "warn"` |
| `useButtonType` | Requires explicit `type` attribute on `<button>` | Consider enabling this specific rule in Biome: `"useButtonType": "warn"` |

### jsx-a11y rules with no Biome equivalent

These rules are **only available in jsx-a11y** and are active in this project:

| jsx-a11y Rule | Description |
|--------------|-------------|
| `jsx-a11y/autocomplete-valid` | Validates autocomplete attribute values |
| `jsx-a11y/label-has-associated-control` | Ensures labels are associated with form controls |
| `jsx-a11y/no-static-element-interactions` | Warns on click handlers on non-interactive elements |
| `jsx-a11y/role-supports-aria-props` | Ensures ARIA props are valid for the role |

## When to revisit this decision

Biome's a11y rules are actively improving. Revisit this setup when:

- Biome adds rules that jsx-a11y doesn't cover
- Biome reaches parity with jsx-a11y's rule set
- ESLint flat config ecosystem stabilizes further

**Last reviewed**: 2026-03-26
