export const colors = {
  primary: "var(--color-primary)",
  primaryHover: "var(--color-primary-hover)",
  text: "var(--color-text)",
  textMuted: "var(--color-text-muted)",
  neutral100: "var(--color-neutral-100)",
  neutral200: "var(--color-neutral-200)",
  neutral300: "var(--color-neutral-300)",
  neutral500: "var(--color-neutral-500)",
  neutral600: "var(--color-neutral-600)",
  neutral700: "var(--color-neutral-700)",
  red500: "var(--color-red-500)",
  red600: "var(--color-red-600)",
  red700: "var(--color-red-700)",
  green500: "var(--color-green-500)",
  green600: "var(--color-green-600)",
  blue500: "var(--color-blue-500)",
} as const;

export const spacing = {
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
} as const;

export const radius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  panel: "var(--radius-panel)",
} as const;

export const layout = {
  gutter: "var(--layout-gutter)",
  panelEdge: "var(--layout-panel-edge)",
  sheetPeek: "var(--layout-sheet-peek)",
  panelAsideWidth: "var(--layout-panel-aside-w)",
  headerHeight: "var(--layout-header-h)",
  detailPanelWidth: "var(--layout-detail-panel-w)",
  playerPanelWidth: "var(--layout-player-panel-w)",
  leftWidth: "var(--layout-left-w)",
  rightWidth: "var(--layout-right-w)",
  panelInset: "var(--layout-panel-inset)",
  searchHeight: "var(--layout-search-h)",
  searchWidth: "var(--layout-search-w)",
  searchInset: "var(--layout-search-inset)",
  searchClear: "var(--layout-search-clear)",
  edgeTabWidth: "var(--layout-edge-tab-w)",
  touchTarget: "var(--layout-touch-target)",
  bandTop: "var(--layout-band-top)",
  centerLeft: "var(--layout-center-left)",
  centerRight: "var(--layout-center-right)",
} as const;

export const typography: Record<string, [string, { lineHeight: string }]> = {
  title: ["var(--text-title)", { lineHeight: "var(--text-title-lh)" }],
  heading: ["var(--text-heading)", { lineHeight: "var(--text-heading-lh)" }],
  body: ["var(--text-body)", { lineHeight: "var(--text-body-lh)" }],
  caption: ["var(--text-caption)", { lineHeight: "var(--text-caption-lh)" }],
  input: ["var(--text-input)", { lineHeight: "var(--text-input-lh)" }],
  search: ["var(--text-search)", { lineHeight: "var(--text-search-lh)" }],
};
