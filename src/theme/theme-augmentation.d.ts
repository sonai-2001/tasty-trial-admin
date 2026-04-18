import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    surface_container_lowest?: string;
    surface_container_low?: string;
    surface_container_high?: string;
    surface_container_highest?: string;
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    surface_container_lowest?: string;
    surface_container_low?: string;
    surface_container_high?: string;
    surface_container_highest?: string;
    tertiary?: PaletteOptions['primary'];
  }
}
