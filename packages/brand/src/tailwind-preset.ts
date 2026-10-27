import { colors, layout, spacing } from "./tokens";

export const brandPreset = {
  theme: {
    extend: {
      spacing: {
        ...spacing,
        gutter: layout.gutter,
        header: layout.headerHeight,
      },
      width: {
        "detail-panel": layout.detailPanelWidth,
        "player-panel": layout.playerPanelWidth,
      },
      colors: { brand: colors },
    },
  },
};

export default brandPreset;
