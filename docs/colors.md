# colors.js
Generate formatted text using HTML-like syntax.

## Usage

### textFormat(s, *optional* ns)
Generate ANSI escape strings for given markup text. You can use ns.(t)print to output the result.

s: string, markup text

ns: optional NS object. If passed in, will retrieve `ns.ui.getTheme()`.

### textFormatRaw(s, *optional* ns)
Generate React componnets for given markup text. You can use ns.(t)printRaw to output the result.

s: string, markup text

ns: optional NS object. If passed in, will retrieve `ns.ui.getTheme()`.

### Markup format
- `<b>Bold<b>`
- `<i>Italics</i>`
- `<u>underline</u>`
- `<color=red>text color</color>`
- `<bgcolor=red>background color</bgcolor>`

The following tags are exclusive to textFormatRaw:
- `<s>strike through</s>`
- `<tooltip=hello world>hover text</tooltip>`
- `<fill=connect n00dles>put command in text box</fill>`

You can use `&lt;`, `&gt;`, `&amp;` to escape special characters.

Colors for `<color>` and `<bgcolor>` can be one of the following:
- an HTML color name (eg, `red`)
- a hex color code (eg, `#ff0000`, `#f00`)
- `theme:` followed by a in-game theme key (eg, `theme:warning`). If provided the `ns` object, it will retreve current theme using `ns.ui.getTheme()`, otherwise the code comes with default theme colors.
