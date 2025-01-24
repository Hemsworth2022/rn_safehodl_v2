// theme.ts
import { MD3LightTheme } from 'react-native-paper'; // Import MD3LightTheme for the base theme

// Define the custom theme by modifying the base MD3LightTheme
export const customTheme = {
  ...MD3LightTheme, // Inherit from MD3LightTheme
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ea', // Override primary color
    accent: '#03dac4',  // Override accent color
    background: '#f5f5f5', // Override background color
    surface: '#ffffff', // Override surface color
    text: '#000000', // Override text color
    disabled: '#d1d1d1', // Override disabled color
    placeholder: '#aaa', // Override placeholder color
    backdrop: '#00000080', // Override backdrop color
  },
  roundness: 8, // Set roundness for UI components (like buttons, cards)
  fonts: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Roboto',
      fontWeight: '300',
    },
  },
};

// Export the custom theme type (for type safety)
export type ThemeType = typeof customTheme;