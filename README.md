# F-Puzzles Letters
Userscript to put letters into cells in f-puzzles.

Tested to work fine with the following features and userscripts:
- Putting givens, corner marks and center marks in "setting" and "solving" modes.
- Exporting to SudokuPad.
- Rangsk's solver (letters will not be pasted as forced candidates, but it's pointless anyway).
- JSON editor.
- Embedded solution.

Known limitations:
- Can put only letters, not punctuation characters.
- Puts only lower-case characters, not upper-case (because it works better when exporting to SudokuPad).
- When the plugin is active, all keyboard shortcuts except for Ctrl+Z, Ctrl+Y and Ctrl+J will be disabled in favor putting letters into the cells.
- Some keyboard shortcuts are system-wide in Windows or in common browsers, and cannot be overridden. So, for instance, Ctrl+N will open a new tab instead of putting an "N" center mark.

## Installation
- Install browser extension for running user scripts: GreaseMonkey for Firefox, TamperMonkey for Google Chrome and family
- Install the script by going to the following link: https://github.com/yusitnikov/fpuzzles-letters/raw/main/fpuzzles-letters.user.js
