// Values the HTML head needs but CSS variables cannot give (meta theme-color). Read from the tokens, never typed.
const tokens = require("../../tokens/tokens.json");
module.exports = { paper: tokens.color.paper.$value };
