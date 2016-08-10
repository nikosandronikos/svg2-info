if (process.argv.length != 4) {
    console.log('Replace all instances of svg element and attribute names with links to the spec');
    console.log(`usage: ${process.argv[0]} <path-to-svg-defs> <inputfile>`);
    process.exit(1);
}

var fs = require('fs');
var readline = require('readline');
var DOMParser = require('xmldom').DOMParser;

var definitions_xml = process.argv[2];
var input_md = process.argv[3];

var defs = new DOMParser().parseFromString(
        fs.readFileSync(definitions_xml, {encoding: "utf-8"})
    );

function add_replaced_terms(collection, replacements) {
    let svg_base_url = 'https://svgwg.org/svg2-draft/';

    function is_relative_url(url) {
        return false == /^(?:[a-z]+:)?\/\//.test(url);
    }

   for (let i = 0; i < collection.length; i++) {
        let item = collection.item(i);
        let href = item.getAttribute('href');
        if (is_relative_url(href)) {
            href = svg_base_url + href;
        }
        replacements.push({
            name: item.getAttribute('name'),
            name_regex: new RegExp(`'${item.getAttribute('name')}'`, 'g'),
            href: href
        }); 
    }
}

var replacements = [];

add_replaced_terms(defs.getElementsByTagName('element'), replacements);
add_replaced_terms(defs.getElementsByTagName('term'), replacements);
add_replaced_terms(defs.getElementsByTagName('property'), replacements);
add_replaced_terms(defs.getElementsByTagName('interface'), replacements);
// To do: attributes are a bit complicated, so skipping them for now

readline.createInterface(
        {input: fs.createReadStream(input_md, {encoding: 'utf-8'})}
    )
    .on('line', (line) => {
        for (let replace of replacements) {
            line = line.replace(
                replace.name_regex, 
                `<a href="${replace.href}">'${replace.name}'</a>`
            );
        }
        console.log(line);
    });
