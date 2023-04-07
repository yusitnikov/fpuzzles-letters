// ==UserScript==
// @name         Fpuzzles-Letters
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds ability to put letters into cells in f-puzzles.
// @author       Chameleon
// @updateURL    https://github.com/yusitnikov/fpuzzles-letters/raw/main/fpuzzles-letters.user.js
// @match        https://*.f-puzzles.com/*
// @match        https://f-puzzles.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(() => {
    const doShim = () => {
        const originalOnKeyDown = document.onkeydown;
        document.onkeydown = (event) => {
            const jsonEditorDiv = document.getElementById("jsoneditor");
            const value = event.key.toLowerCase();
            const hackedValue = window.plugins && plugins.allowedLetters && plugins.allowedLetters[value];
            if (
                // the pressed key is either a letter or supported by plugins
                ((value.length === 1 && value.toUpperCase() !== value) || hackedValue) &&
                // it's not a known controlling sequence
                (!controlling || !["y", "z", "j"].includes(value)) &&
                // the JSON editor is not active
                (!jsonEditorDiv || jsonEditorDiv.hidden) &&
                // regular checks - copied from the original onkeydown
                !popup && !disableInputs && !testPaused() &&
                // there are selected cells
                selection.length &&
                // the current mode allowed entering data into the cells
                ["Setting", "Solving"].includes(mode) && currentTool === "Given Digit" && tempEnterMode !== "Highlight"
            ) {
                for (const cell of selection) {
                    if (!cell.given || mode === "Setting") {
                        switch (typeof hackedValue === "string" ? hackedValue : tempEnterMode) {
                            case "Normal":
                                cell.value = value;
                                cell.given = mode === "Setting";
                                cell.cornerPencilMarks = [];
                                cell.centerPencilMarks = [];
                                cell.candidates = [value];
                                break;
                            case "Corner":
                                if (!cell.value) {
                                    if (cell.cornerPencilMarks.includes(value)) {
                                        cell.cornerPencilMarks.splice(cell.cornerPencilMarks.indexOf(value), 1);
                                    } else {
                                        cell.cornerPencilMarks.push(value);
                                    }
                                    cell.cornerPencilMarks.sort();
                                }
                                break;
                            case "Center":
                                if (!cell.value) {
                                    if (cell.centerPencilMarks.includes(value)) {
                                        cell.centerPencilMarks.splice(cell.centerPencilMarks.indexOf(value), 1);
                                    } else {
                                        cell.centerPencilMarks.push(value);
                                    }
                                    cell.centerPencilMarks.sort();
                                }
                                break;
                        }
                    }
                }

                event.preventDefault();

                if (testSolved()) {
                    puzzleTimer.pause();
                    finished = true;
                }

                generateCandidates();
            } else {
                originalOnKeyDown(event);
            }
        };
    };

    const intervalId = setInterval(() => {
        if (!document.onkeydown) {
            return;
        }

        clearInterval(intervalId);
        doShim();
    }, 16);
})();
