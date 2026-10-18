// Bright, kıyı/karayolu/yerleşim kontrastını Liberty'den daha okunaklı tutar.
const defaultMapStyleUrl = "https://tiles.openfreemap.org/styles/bright";

export const mapStyleUrl = process.env.NEXT_PUBLIC_MAP_STYLE_URL?.trim() || defaultMapStyleUrl;
