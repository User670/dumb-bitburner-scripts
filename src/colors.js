/*
usage:
<b>bold</b>
<i>italics</i>
<u>underline</u>
<color=red>change color</color>
<bgcolor=red>change background color</bgcolor>

textFormatRaw exclusive tags:
<s>strike through</s>
<tooltip=tooltip text>tooltip using "title" attribute</tooltip>
<action=home>doesn't work</action>
<fill=connect n00dles;>put text into the terminal text box</fill>
<br> (no corresponding close tag; also it seems like \n works just fine)
     (don't write <br />)

use &lt; &gt; &amp; to escape special characters
tags that need a `=parameter` but lack it likely will cause an error,
there is no check nor test for that

colors can be:
- HTML color name (eg: red)
- hex color code prefixed with # (eg: #ff0000, #f00)
- "theme:" followed by a theme key (eg: theme:warning)
pass in the `ns` to retrieve current theme, else will use default theme 
*/
export function textFormat(s, ns) {
    const htmlcolors = {
        "indianred": "#CD5C5C", "lightcoral": "#F08080", "salmon": "#FA8072", "darksalmon": "#E9967A", "lightsalmon": "#FFA07A", "crimson": "#DC143C", "red": "#FF0000", "darkred": "#8B0000", "pink": "#FFC0CB", "lightpink": "#FFB6C1", "hotpink": "#FF69B4", "deeppink": "#FF1493", "mediumvioletred": "#C71585", "palevioletred": "#DB7093", "coral": "#FF7F50", "tomato": "#FF6347", "orangered": "#FF4500", "darkorange": "#FF8C00", "orange": "#FFA500", "gold": "#FFD700", "yellow": "#FFFF00", "lightyellow": "#FFFFE0", "lemonchiffon": "#FFFACD", "lightgoldenrodyellow": "#FAFAD2", "papayawhip": "#FFEFD5", "moccasin": "#FFE4B5", "peachpuff": "#FFDAB9", "palegoldenrod": "#EEE8AA", "khaki": "#F0E68C", "darkkhaki": "#BDB76B", "lavender": "#E6E6FA", "thistle": "#D8BFD8", "plum": "#DDA0DD", "violet": "#EE82EE", "orchid": "#DA70D6", "fuchsia": "#FF00FF", "magenta": "#FF00FF", "mediumorchid": "#BA55D3", "mediumpurple": "#9370DB", "rebeccapurple": "#663399", "blueviolet": "#8A2BE2", "darkviolet": "#9400D3", "darkorchid": "#9932CC", "darkmagenta": "#8B008B", "purple": "#800080", "indigo": "#4B0082", "slateblue": "#6A5ACD", "darkslateblue": "#483D8B", "mediumslateblue": "#7B68EE", "greenyellow": "#ADFF2F", "chartreuse": "#7FFF00", "lawngreen": "#7CFC00", "lime": "#00FF00", "limegreen": "#32CD32", "palegreen": "#98FB98", "lightgreen": "#90EE90", "mediumspringgreen": "#00FA9A", "springgreen": "#00FF7F", "mediumseagreen": "#3CB371", "seagreen": "#2E8B57", "forestgreen": "#228B22", "green": "#008000", "darkgreen": "#006400", "yellowgreen": "#9ACD32", "olivedrab": "#6B8E23", "olive": "#6B8E23", "darkolivegreen": "#556B2F", "mediumaquamarine": "#66CDAA", "darkseagreen": "#8FBC8B", "lightseagreen": "#20B2AA", "darkcyan": "#008B8B", "teal": "#008080", "aqua": "#00FFFF", "cyan": "#00FFFF", "lightcyan": "#E0FFFF", "paleturquoise": "#AFEEEE", "aquamarine": "#7FFFD4", "turquoise": "#40E0D0", "mediumturquoise": "#48D1CC", "darkturquoise": "#00CED1", "cadetblue": "#5F9EA0", "steelblue": "#4682B4", "lightsteelblue": "#B0C4DE", "powderblue": "#B0E0E6", "lightblue": "#ADD8E6", "skyblue": "#87CEEB", "lightskyblue": "#87CEFA", "deepskyblue": "#00BFFF", "dodgerblue": "#1E90FF", "cornflowerblue": "#6495ED", "royalblue": "#4169E1", "blue": "#0000FF", "mediumblue": "#0000CD", "darkblue": "#00008B", "navy": "#00008B", "midnightblue": "#191970", "cornsilk": "#FFF8DC", "blanchedalmond": "#FFEBCD", "bisque": "#FFE4C4", "navajowhite": "#FFDEAD", "wheat": "#F5DEB3", "burlywood": "#DEB887", "tan": "#D2B48C", "rosybrown": "#BC8F8F", "sandybrown": "#F4A460", "goldenrod": "#DAA520", "darkgoldenrod": "#B8860B", "peru": "#CD853F", "chocolate": "#D2691E", "saddlebrown": "#8B4513", "sienna": "#A0522D", "brown": "#A52A2A", "maroon": "#800000", "white": "#FFFFFF", "snow": "#FFFAFA", "honeydew": "#F0FFF0", "mintcream": "#F5FFFA", "azure": "#F0FFFF", "aliceblue": "#F0F8FF", "ghostwhite": "#F8F8FF", "whitesmoke": "#F5F5F5", "seashell": "#FFF5EE", "beige": "#F5F5DC", "oldlace": "#FDF5E6", "floralwhite": "#FDF5E6", "ivory": "#FFFFF0", "antiquewhite": "#FAEBD7", "linen": "#FAF0E6", "lavenderblush": "#FFF0F5", "mistyrose": "#FFE4E1", "gainsboro": "#DCDCDC", "lightgray": "#D3D3D3", "silver": "#C0C0C0", "darkgray": "#A9A9A9", "gray": "#808080", "dimgray": "#696969", "lightslategray": "#778899", "slategray": "#708090", "darkslategray": "#2F4F4F", "black": "#000000"
    }
    let theme;
    if (ns && ns.ui && typeof ns.ui.getTheme === "function") {
        theme = ns.ui.getTheme();
    } else {
        theme = { "primarylight": "#0f0", "primary": "#0c0", "primarydark": "#090", "successlight": "#0f0", "success": "#0c0", "successdark": "#090", "errorlight": "#f00", "error": "#c00", "errordark": "#900", "secondarylight": "#AAA", "secondary": "#888", "secondarydark": "#666", "warninglight": "#ff0", "warning": "#cc0", "warningdark": "#990", "infolight": "#69f", "info": "#36c", "infodark": "#039", "welllight": "#444", "well": "#222", "white": "#fff", "black": "#000", "hp": "#dd3434", "money": "#ffd700", "hack": "#adff2f", "combat": "#faffdf", "cha": "#a671d1", "int": "#6495ed", "rep": "#faffdf", "disabled": "#66cfbc", "backgroundprimary": "#000", "backgroundsecondary": "#000", "button": "#333", "maplocation": "#ffffff", "bnlvl0": "#ffff00", "bnlvl1": "#ff0000", "bnlvl2": "#48d1cc", "bnlvl3": "#0000ff" }
    }
    const re_bold = /<b>/g
    const re_bold_close = /<\/b>/g
    const re_italics = /<i>/g
    const re_italics_close = /<\/i>/g
    const re_underline = /<u>/g
    const re_underline_close = /<\/u>/g
    const re_color = /<color=([^>]+)>/g
    const re_color_close = /<\/color>/g
    const re_bgcolor = /<bgcolor=([^>]+)>/g
    const re_bgcolor_close = /<\/bgcolor>/g

    function hex2rgb(s) {
        s = s.toLowerCase().replace(/[^0-9a-f]/g, "")
        if (s.length == 3) {
            let n = parseInt("0x" + s)
            return [
                (n >> 8) * 0x11,
                (n >> 4) % 0x10 * 0x11,
                n % 0x10 ^ 0x11
            ]
        }
        if (s.length == 6) {
            let n = parseInt("0x" + s)
            return [
                n >> 16,
                (n >> 8) % 0x100,
                n % 0x100
            ]
        }
        return [-1, -1, -1]
    }
    function parse_color(match, capturegroup) {
        capturegroup = capturegroup.toLowerCase().trim()
        if (htmlcolors[capturegroup]) {
            capturegroup = htmlcolors[capturegroup]
        }
        if (capturegroup[0] === "#") {
            let [r, g, b] = hex2rgb(capturegroup.substring(1))
            if (r == -1) return ""
            return `\x1b[38;2;${r};${g};${b}m`
        }
        if (capturegroup.substring(0, 6) === "theme:") {
            let key = capturegroup.substring(6).trim()
            if (theme[key]) {
                let [r, g, b] = hex2rgb(theme[key].substring(1))
                if (r == -1) return ""
                return `\x1b[38;2;${r};${g};${b}m`
            }
            return ""
        }
        return ""
    }

    function parse_bgcolor(match, capturegroup) {
        capturegroup = capturegroup.toLowerCase().trim()
        if (htmlcolors[capturegroup]) {
            capturegroup = htmlcolors[capturegroup]
        }
        if (capturegroup[0] === "#") {
            let [r, g, b] = hex2rgb(capturegroup.substring(1))
            if (r == -1) return ""
            return `\x1b[48;2;${r};${g};${b}m`
        }
        if (capturegroup.substring(0, 6) === "theme:") {
            let key = capturegroup.substring(6).trim()
            if (theme[key]) {
                let [r, g, b] = hex2rgb(theme[key].substring(1))
                if (r == -1) return ""
                return `\x1b[48;2;${r};${g};${b}m`
            }
            return ""
        }
        return ""
    }

    s = s.replace(re_bold, "\x1b[1m")
    s = s.replace(re_bold_close, "\x1b[22m")
    s = s.replace(re_italics, "\x1b[3m")
    s = s.replace(re_italics_close, "\x1b[23m")
    s = s.replace(re_underline, "\x1b[4m")
    s = s.replace(re_underline_close, "\x1b[24m")
    s = s.replace(re_color, parse_color)
    s = s.replace(re_color_close, "\x1b[39m")
    s = s.replace(re_bgcolor, parse_bgcolor)
    s = s.replace(re_bgcolor_close, "\x1b[49m")

    s = s.replace(/&gt;/g, ">")
    s = s.replace(/&lt;/g, "<")
    s = s.replace(/&amp;/g, "&")

    return s
}

function terminalAction(command, autoExecute = false) {
    const ramBypassDocument=eval("document")
    const terminalInput = ramBypassDocument.getElementById("terminal-input");
    // @ts-ignore
    terminalInput.value = command;
    const handler = Object.keys(terminalInput)[1];
    terminalInput[handler].onChange({ target: terminalInput });
    terminalInput.focus()
    if (autoExecute) {
        terminalInput[handler].onKeyDown({ key: 'Enter', preventDefault: () => null });
    }
}

export function textFormatRaw(s, ns) {
    let theme;
    if (ns && ns.ui && typeof ns.ui.getTheme === "function") {
        theme = ns.ui.getTheme();
    } else {
        theme = { "primarylight": "#0f0", "primary": "#0c0", "primarydark": "#090", "successlight": "#0f0", "success": "#0c0", "successdark": "#090", "errorlight": "#f00", "error": "#c00", "errordark": "#900", "secondarylight": "#AAA", "secondary": "#888", "secondarydark": "#666", "warninglight": "#ff0", "warning": "#cc0", "warningdark": "#990", "infolight": "#69f", "info": "#36c", "infodark": "#039", "welllight": "#444", "well": "#222", "white": "#fff", "black": "#000", "hp": "#dd3434", "money": "#ffd700", "hack": "#adff2f", "combat": "#faffdf", "cha": "#a671d1", "int": "#6495ed", "rep": "#faffdf", "disabled": "#66cfbc", "backgroundprimary": "#000", "backgroundsecondary": "#000", "button": "#333", "maplocation": "#ffffff", "bnlvl0": "#ffff00", "bnlvl1": "#ff0000", "bnlvl2": "#48d1cc", "bnlvl3": "#0000ff" }
    }
    function parse_color(color) {
        color = color.toLowerCase().trim()
        if (color.substring(0, 6) === "theme:") {
            let key = color.substring(6).trim()
            if (theme[key]) {
                return theme[key]
            }
        }
        return color
    }
    function unescape(s) {
        s = s.replace(/&gt;/g, ">")
        s = s.replace(/&lt;/g, "<")
        s = s.replace(/&amp;/g, "&")
        return s
    }

    const validTags = [
        "b",
        "i",
        "u",
        "s",
        "color",
        "bgcolor",
        "tooltip", // displays a tooltip on mouse over. Temporarily uses `title` HTML attribute.
        "action", // performs an action on the terminal
        "fill", // puts text onto the terminal
        "br"
    ]

    // This re detects a tag like structure.
    // Captures the tag name (including the slash for the closing tag)
    // and the parameter.
    // eg: <b> captures "b", undefined
    // eg: </b> captures "/b", undefined
    // eg: <color=red> captures "color", "red"
    const re_tag = /<(\/?[a-z]+)(?:=([^>]+))?>/g

    // this splits the string at the tags, and between each two parts, the capture groups of the regex.
    // eg, "lorem<color=red>ipsum" becomes
    // [
    //    "lorem",
    //    "color", "red", // capture groups of the re
    //    "ipsum"
    // ]
    let tokens = s.split(re_tag)

    // react elements go here.
    let elements = []

    // Object<string, bool> representing which tags are currently active
    let activeTags = {}
    for (let i of validTags) {
        activeTags[i] = false
    }

    // data in the active tags.
    // action and fill share a field here because they can't be active at the same time.
    let tagData = {
        color: "",
        bgcolor: "",
        tooltip: "",
        action: ""
    }
    
    function makeElement(s){
        //console.log(s, activeTags, tagData)
        let tagActionData=tagData.action
        if(s=="")return
        let styleObj = {}
        if (activeTags.b) {
            styleObj.fontWeight = "bold"
        }
        if (activeTags.i) {
            styleObj.fontStyle = "italic"
        }
        if (activeTags.u || activeTags.s) {
            styleObj.textDecoration = `${activeTags.u ? "underline" : ""} ${activeTags.s ? "line-through" : ""}`
        }
        if (activeTags.color) {
            styleObj.color = parse_color(tagData.color)
        }
        if (activeTags.bgcolor) {
            styleObj.backgroundColor = parse_color(tagData.bgcolor)
        }

        let attrObj = {}
        attrObj.style = styleObj
        if (activeTags.tooltip) {
            // use title attribute for now, maybe switch to in-game-style tooltips later?
            attrObj.title = tagData.tooltip
        }
        if (activeTags.action) {
            attrObj.onClick = (ev) => { terminalAction(tagActionData, true) }
            //attrObj.onclick = (ev) => { console.log(tagData.action) }
        }
        if (activeTags.fill) {
            attrObj.onClick = (ev) => { terminalAction(tagActionData) }
        }
        elements.push(
            //@ts-ignore
            React.createElement(
                "span",
                attrObj,
                unescape(s)
            )
        )
    }
    
    // each loop will increment `i` 3 times
    // a break should happen mid-loop at the end
    for (let i = 0; i < tokens.length;) {
        // i%3==0
        // text
        makeElement(tokens[i])
        
        i+=1
        if(i>=tokens.length){
            // we are past the end of the list
            break
        }
        // i%3==1
        // tag name
        let tagName=tokens[i]
        let closeTag=false
        if(tagName[0]=="/"){
            closeTag=true
            tagName=tagName.substring(1)
        }
        i+=1
        // i%3==2
        // tag parameter
        let tagParameter=tokens[i]
        // process tag
        if(!validTags.includes(tagName)){
            // not a valid tag
            // re-construct the text and create a regular element
            let s=`<${closeTag?"/":""}${tagName}${tagParameter!=undefined?"="+tagParameter:""}>`
            makeElement(s)
            
            // increment i and continue here to save an indent level
            i+=1
            continue
        }
        // special case for br; it doesn't close
        if(tagName=="br"){
            elements.push(
                //@ts-ignore
                React.createElement("br", {})
            )
        }
        // valid tag
        if(closeTag){
            activeTags[tagName]=false
        }else{
            // open tag
            activeTags[tagName]=true
            if(activeTags.tooltip==false){
            }
            // action and fill cannot coexist
            if(tagName=="action")activeTags.fill=false
            if(tagName=="fill")activeTags.action=false
            
            // save tag parameter
            if(tagName=="fill")tagName="action"
            if(["color","bgcolor","action","tooltip"].includes(tagName)){
                tagData[tagName]=tagParameter || ""
                // we're not checking things for <color> or <color=>
                // these WILL be a CSS error
            }
        }
        i+=1
    }
    
    // @ts-ignore
    return React.createElement(
        "span",
        {},
        ...elements
    )
}