import * as Stats from "stats-non-clickable-js";

export const getDomStats = (panelId: number): Stats => {
    const stats = new Stats();
    stats.dom.style.left = '';
    stats.dom.style.right = `${80 * panelId + 8}px`;
    stats.dom.style.top = `${8}px`;
    stats.dom.style.bottom = ``;
    stats.dom.style.cursor = `default`;
    stats.showPanel(panelId);

    return stats;
}
