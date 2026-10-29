import { colors, layout, radius, spacing } from "./tokens";

export const brandPreset = {
  theme: {
    extend: {
      spacing: {
        ...spacing,
        gutter: layout.gutter,
        "panel-inset": layout.panelInset,
        header: layout.headerHeight,
        band: layout.bandTop,
        "center-left": layout.centerLeft,
        "center-right": layout.centerRight,
        "touch-target": layout.touchTarget,
      },
      width: {
        "detail-panel": layout.detailPanelWidth,
        "player-panel": layout.playerPanelWidth,
        "right-column": layout.rightWidth,
        "edge-tab": layout.edgeTabWidth,
      },
      height: { search: layout.searchHeight },
      borderRadius: { panel: radius.panel },
      colors: { brand: colors },
    },
  },
};

export default brandPreset;
