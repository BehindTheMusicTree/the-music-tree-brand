import { colors, layout, spacing } from "./tokens";

export const brandPreset = {
  theme: {
    extend: {
      spacing: {
        ...spacing,
        gutter: layout.gutter,
        header: layout.headerHeight,
        band: layout.bandTop,
        "center-left": layout.centerLeft,
        "center-right": layout.centerRight,
      },
      width: {
        "detail-panel": layout.detailPanelWidth,
        "player-panel": layout.playerPanelWidth,
        "right-column": layout.rightWidth,
      },
      colors: { brand: colors },
    },
  },
};

export default brandPreset;
