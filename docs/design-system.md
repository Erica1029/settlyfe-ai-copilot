# Settlyfe AI Copilot Design System

## 1. Design Principle

Settlyfe AI Copilot is a feature extension inside the existing Settlyfe rental app, not a new standalone product.

The Copilot experience must follow the existing Settlyfe mobile app design system: typography, buttons, form fields, cards, navigation, icon style, spacing, color hierarchy, and iOS-style screen structure.

The AI layer should feel helpful, guided, and intelligent, but it must still look like part of Settlyfe. Do not create a separate futuristic AI dashboard style.

## 2. Product Context

Settlyfe is a mobile-first rental service app that helps users search homes, manage applications, find roommates or co-applicants, access home services, explore furniture options, and complete move-in related tasks.

The AI Copilot feature supports the existing rental journey by helping users make better decisions before applying, buying furniture, or moving in.

The feature should feel like:

- A guided rental planning assistant.
- A structured decision flow.
- A practical helper inside Settlyfe.
- A bridge between rental search, furniture matching, home services, and move-in checklist.

## 3. Visual Direction

Use the existing Settlyfe app as the source of truth.

The interface should feel:

- Clean.
- Friendly.
- Useful.
- Practical.
- Student-friendly.
- Trustworthy.
- Lightweight.
- Service-oriented.

The interface should not feel:

- Overly futuristic.
- Dark or cyber.
- Enterprise dashboard-like.
- Crypto or fintech heavy.
- Too decorative.
- Disconnected from the existing Settlyfe app.

## 4. Existing Settlyfe Style Rules

The AI Copilot screens should inherit these visible Settlyfe patterns:

- Mobile-first iOS-style app screens.
- White and very light gray backgrounds.
- Blue-purple primary brand color.
- Rounded rectangular buttons.
- Rounded input fields.
- Soft white cards with light shadows.
- Minimal line icons.
- Clean sans-serif typography.
- Strong but simple form layouts.
- Bottom sticky CTA buttons where the user is completing a step.
- Tab bar navigation when the screen belongs inside the main app shell.
- Practical rental service tone.
- Friendly, student-oriented copy.

## 5. Color System

Use the existing Settlyfe color system as the source of truth.

### Primary

- Primary blue-purple: `#6463F0`
- Use for primary CTAs, active navigation icons, selected states, key progress indicators, and important links.
- Avoid using a darker unrelated navy as the primary brand color.

### Text

- Primary text: near-black, used for titles, key prices, section headers, and selected tab labels.
- Secondary text: medium gray, used for descriptions, metadata, helper text, and inactive navigation labels.
- Disabled text: light gray, used only for unavailable actions or inactive controls.

### Backgrounds

- App background: white or very light gray.
- Card background: white.
- Disabled background: light gray.
- Selected state background: light blue-purple tint derived from the primary color.
- AI highlight background: very light blue-purple or soft gradient only when used subtly.

### Status Colors

- Success: soft green for availability, completed tasks, and positive checklist states.
- Warning: soft orange/yellow for risk notes or timing alerts.
- Destructive: warm red/orange for serious warnings only.
- Do not overuse status colors. Most screens should remain white, gray, black, and primary blue-purple.

## 6. Typography

Follow Settlyfe's existing sans-serif typography scale.

Recommended hierarchy based on the current design system:

- Sheet title: 32px / 36px.
- Section header: 23px / 20px.
- Body 1 headline: 16px / 23px.
- Body 1 regular: 16px / 23px.
- Body 2 headline: 14px / 18px.
- Body 2 regular: 14px / 18px.
- Button label: 14px / 18px.

Usage rules:

- Use bold or semibold sparingly for screen titles, prices, section labels, and selected actions.
- Keep form labels short and clear.
- Avoid oversized hero-style typography inside the Copilot flow.
- Do not introduce a separate AI-specific type style.

## 7. Spacing

Use the existing Settlyfe spacing system:

- 4px: extra-small.
- 8px: small.
- 16px: base.
- 24px: base-large.
- 32px: base-extra.
- 48px: large.
- 64px: extra-large.

Layout rules:

- Use 16px horizontal screen padding for most mobile screens.
- Use 16px to 24px vertical spacing between major sections.
- Keep form rows spacious but not decorative.
- Keep bottom CTA areas clear and easy to tap.

## 8. Buttons

Use Settlyfe button styles.

### Primary Button

- Filled blue-purple background: `#6463F0`.
- White label.
- Rounded rectangle.
- Used for main actions such as `Continue`, `Generate Plan`, `Save`, `View Checklist`, and `Apply`.
- Should usually sit at the bottom of a step-based screen.

### Secondary Button

- White background.
- Dark border.
- Dark label.
- Used for secondary choices like `Back`, `Edit`, or alternative actions.

### Tertiary Button

- Dark filled background.
- White label.
- Use only when matching an existing Settlyfe flow or when a stronger non-primary action is needed.

### Disabled Button

- Light gray background.
- White or disabled gray label.
- Used when required inputs are incomplete.

### Text Button

- Underlined or simple text treatment.
- Use for small navigation actions like `Go back`, `Log out`, or `Forgot password`.

Do not create oversized futuristic AI buttons, glowing buttons, or dark dashboard CTAs.

## 9. Form Fields

Use Settlyfe rounded text fields and simple form layouts.

Field rules:

- Rounded rectangle input.
- Light gray border in default state.
- Dark border in focused state.
- Label inside or above the field depending on the existing pattern.
- Placeholder text in light gray.
- Search fields may use pill-shaped rounded search bars with a leading search icon.

Copilot form usage:

- Preference input should feel like the existing onboarding and application flows.
- Each screen should ask a focused set of questions.
- Avoid dense dashboard-like forms.
- Use radio rows, checkboxes, and pill groups when they match the question better than text entry.

## 10. Controls

Use existing Settlyfe controls:

- Radio buttons for single-choice questions.
- Checkboxes for checklist and agreement states.
- Toggles for binary settings only when they behave like settings.
- Plus/minus steppers for quantity-like inputs.
- Pill selectors for filters, time windows, room types, and preference chips.

Selected states should use the existing dark or primary-colored selected treatment. Disabled states should use light gray.

## 11. Cards

Cards should match Settlyfe's rental, service, application, and furniture surfaces.

Card rules:

- White background.
- Rounded corners.
- Light border or soft shadow.
- Clear internal spacing.
- Optional image or icon area when relevant.
- No heavy borders, dark panels, or nested dashboard cards.

Recommended Copilot cards:

- Recommendation card.
- Budget fit card.
- Commute fit card.
- Risk note card.
- Furniture suggestion card.
- Moving checklist card.
- Next-step card.

AI outputs should be structured as regular Settlyfe cards, not chat bubbles unless the existing app introduces a chat-like assistant pattern.

## 12. List Items

Use Settlyfe list item patterns for structured content:

- Left icon, checkbox, avatar, or thumbnail when useful.
- Main label with optional subtitle.
- Optional trailing action, chevron, price, status, or icon.
- Light dividers for dense lists.
- Rounded list containers for grouped tasks.

Use list items for:

- Checklist tasks.
- Viewing questions.
- Risk reminders.
- Rental preparation steps.
- Furniture and service suggestions.

## 13. Navigation

Navigation should feel native to the existing app.

### Top Bar

- iOS-style status area.
- Centered screen title when appropriate.
- Back chevron on the left.
- Close icon or secondary action on the right when needed.

### Tab Bar

- Use the existing tab bar pattern when the Copilot is shown inside the main app shell.
- Active icon and label use primary blue-purple.
- Inactive icons and labels use gray.
- Do not invent a new Copilot-only navigation system.

### Bottom CTA

- Use a bottom sticky CTA for step completion.
- Keep the button full-width or nearly full-width, matching existing Settlyfe screens.
- Keep enough safe-area spacing above the home indicator.

## 14. Modals and Bottom Sheets

Use existing Settlyfe modal and bottom sheet patterns:

- Header with back or close action.
- Simple title and optional subtitle.
- White surface.
- Rounded top corners for bottom sheets.
- Dimmed background only when needed.
- Footer CTA area for confirmation.

Use bottom sheets for:

- Explaining why the AI made a recommendation.
- Letting users adjust one preference without leaving the result screen.
- Confirming save or checklist actions.

## 15. AI-Specific UI Rules

AI should be visible through guidance and structure, not through a separate visual language.

Allowed AI treatments:

- Small sparkle or assistant icon.
- Subtle blue-purple tint.
- Simple loading spinner.
- Step-by-step analysis list.
- Clear reasoning sections such as `Why this fits`, `Watch out for`, and `Next steps`.
- Lightweight gradient only when it already matches the furniture AI screen style.

Avoid:

- Dark AI dashboards.
- Neon effects.
- Cyber graphics.
- Large abstract AI illustrations.
- Complex charts that feel unlike Settlyfe.
- Overly decorative backgrounds.

## 16. AI Copilot Screen Patterns

### Home / Entry Point

Home should use the original Settlyfe homepage shell. AI Copilot should enter through a homepage banner, not a standalone landing page.

Navigation rules:

- Keep the original Settlyfe 4-tab bottom navigation: Home, Find Homes, Messages, Account.
- Do not add AI Copilot as a bottom tab in V1.

AI banner rules:

- Use `public/images/ai-copilot-banner-bg.png` as a visual background asset.
- Banner text and CTA should be implemented as real UI layers, not baked into the background image.
- The banner should feel expressive but still native to Settlyfe.

Banner copy:

- Label: `Settlyfe AI`
- Title: `Not sure where to live?`
- Body: `Settlyfe AI compares your budget, commute, room type, and lifestyle tradeoffs before you apply.`
- CTA: `Build my plan`

### Preference Input

V2 MVP Preference Input is a 2-step flow:

- Move Basics.
- Room and Lifestyle.

Use the existing Settlyfe onboarding/application form pattern:

- Use rounded input fields, radio rows, chips, a step indicator, and sticky bottom CTA.
- Keep each step focused and easy to scan.
- Preference input fields should use 14px labels, 16px / approximately 23px value text, and an approximately 52px visual field height.
- Preference Step 2 should keep the status/header and bottom CTA fixed inside the mobile frame; only the middle question content should scroll when needed.
- Keep only city / area, school or workplace, monthly budget, max commute time, room type, car access, and lifestyle preference visible for V2 MVP.
- Hide or default furniture need, bathroom preference, move-in timeline, deal breakers, and top priorities.

### AI Analysis Loading

Use a lightweight loading state:

- Spinner or simple progress animation.
- Short reassurance copy.
- Step list such as budget, commute, lifestyle, room type, car access, and moving checklist.
- White background.

### AI Result Plan

Do not style this as a fintech dashboard.

Use stacked mobile cards:

- Best Fit Area / Example Match.
- Fit score explanation.
- Recommended room type.
- Budget fit.
- Commute analysis.
- Lifestyle fit.
- Why this fits.
- Watch out for.
- Other Good Matches.
- Next steps.
- CTA to Moving Checklist.

V1 recommendation cards represent example matches or area-level rental directions, not guaranteed live listings.

### Moving Checklist

Use checklist and list item patterns:

- Checklist items should be generated from user preferences and recommendation risks.
- Group tasks into required sections: Rental Prep, Viewing Questions, Furniture Plan, and Move-in Day.
- Use checkboxes or completed icons.
- Keep tasks short and actionable.
- Add a bottom Save or Done CTA.

## 17. Content Tone

Tone should be:

- Helpful.
- Direct.
- Practical.
- Student-friendly.
- Calm and trustworthy.

Avoid:

- Overpromising AI certainty.
- Sales-heavy marketing language.
- Technical AI jargon.
- Long paragraphs.

Examples:

- Use: `Start your rental plan`
- Use: `This area fits your commute target`
- Use: `Watch out for higher rent competition before move-in season`
- Avoid: `Unlock the future of AI-powered rental intelligence`

## 18. Figma Handoff Alignment

Use `docs/figma-handoff.md` for approved Figma references.

- Use 375x812 viewport screenshots as primary visual references.
- Use full-scroll screenshots only to understand below-the-fold content.
- Do not implement full-scroll screenshots as fixed-height pages.
- Do not place screenshots directly into the app.
- Recreate UI with real components and use only exported assets such as `public/images/ai-copilot-banner-bg.png` when appropriate.

## 19. Implementation Guardrails

Future design or code work must follow these rules:

- Treat Settlyfe's existing app screens and Figma system as the source of truth.
- Use `#6463F0` as the primary brand action color.
- Keep the app mobile-first and iOS-like.
- Prefer existing components before adding new AI-specific components.
- Keep AI output in Settlyfe-style cards and lists.
- Keep V1 mock-data only.
- Separate user preferences, mock rental/neighborhood data, recommendation logic, explanation output, UI rendering, and checklist generation.
- Use bottom CTAs for step-based flows.
- Keep forms simple and familiar.
- Ensure furniture, home service, rental search, and move-in screens feel connected to the Copilot flow.
- Do not continue app implementation until PRD, feature spec, design system, Figma handoff, and Codex task are approved.
