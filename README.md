# How this got started
Interested in learning music composition, I picked up the book "Music Compositions from Dummies.' In this book the scales and frequently used modes are defined and the playable ranges for the standard orchestra instruments are given. 
I ran into a Reddit post on subreddit Recorders by ekiim where he had put together something to help him learn the notes and figurings for the 4 basic recorders (SATB). 
This gave me aidea to put the two things together - a way to select scales and modes and view the playable notes for the instruments. I could just use the MCFD book as a reference, but writing an app is much more fun. Beside, I can extend it to use as a compisntion tool as I get new idea.
# Basic use cases
User has control of the selection of instrument, scale, and mode. Basic display is all of the notes that can be played on the instrument. Minor scales with descending notes different cause the display to include the descending scale
A maybe display are ascending/descending thirds, fourths, and fifths
Another maybe is identifying the figurings for each note (with alternates)
# UI layout
* Header
logo
application name version
message area
* Body
  * key selection (default C)
  * mode selection (default ionian)
    * modes
      * Ionian
      * Dorian
      * Phrygian
      * Lydian
      * Mixolydian
      * Aeolian (natural minor)
      * Locrian
      * Harmonic Minor
      * Melodic Minor
    * link to wikipedia for the selected mode
    * step size sequence
  * instrument selection (default piano)
    * concert pitch
    * instrument pitch
  * scale options
    * chromatic
    * diatonic
    * pentatonic
    * thirds
    * fourths
    * fifths
  * display options
    * Ascending
    * descending
    * ascending and descending
  * note display
    * shows notes selected
    * multiple notes can be selected and played (in sequence or as a chord)
* Footer
displays current scale, mode, instrument, pitch, and display option selected
# Implementation
Implemented in Vite/React TrueScript. This is my first TrueScript project
There is not much use for a server for this application. Addition modes can be added by updating a JSON file that defines the modes. The mode are defined in [Wikipedia's List of musical scales and modes](Wikipedia's List of musical scales and modes)
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
