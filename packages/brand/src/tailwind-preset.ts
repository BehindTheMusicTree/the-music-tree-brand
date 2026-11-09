import { colors, layout, radius, spacing, typography } from "./tokens";

export const brandPreset = {
  theme: {
    extend: {
      spacing: {
        ...spacing,
        gutter: layout.gutter,
        "panel-edge": layout.panelEdge,
        "panel-inset": layout.panelInset,
        header: layout.headerHeight,
        band: layout.bandTop,
        "center-left": layout.centerLeft,
        "center-right": layout.centerRight,
        "touch-target": layout.touchTarget,
        "search-inset": layout.searchInset,
        "search-clear": layout.searchClear,
      },
      width: {
        "detail-panel": layout.detailPanelWidth,
        "player-panel": layout.playerPanelWidth,
        "right-column": layout.rightWidth,
        "edge-tab": layout.edgeTabWidth,
        "panel-aside": layout.panelAsideWidth,
        search: layout.searchWidth,
      },
      height: { search: layout.searchHeight },
      fontSize: typography,
      borderRadius: { panel: radius.panel },
      colors: { brand: colors },
    },
  },
};

export default brandPreset;
