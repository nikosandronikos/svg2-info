if (process.argv.length < 4) {
    console.log('Compare two SVG definitions.xml files.');
    console.log(`usage: ${process.argv[0]} <path-to-svg1-defs> <path-to-svg2-defs> <ignore-categories-1>..<ignore-categories-n>`);
    process.exit(1);
}

const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;

// Return the union of two sets
function set_add(a, b) {
    return new Set([...a, ...b]);
}

// Return a Set containing elements in Set a, that are not in Set b
function set_minus(a, b) {
    return new Set([...a].filter(x => !b.has(x)));
}

// Return a Set containing elements in Set a that are also in Set b
function set_intersection(a, b) {
    return new Set([...a].filter(x => b.has(x)));
}

// Find a DOM node of tag type 'tag' and with attribute name = 'name'
function node_with_name(dom, tag, name) {
    const elements = dom.getElementsByTagName(tag)
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute('name') == name)
            return elements[i]
    }
    return null;
}

// Return a set of all the name attributes from the given nodes
function set_from_node_names(nodes) {
    var s = new Set();
    for (let i = 0; i < nodes.length; i++) {
        s.add(nodes[i].getAttribute('name'));
    }
    return s;
}

// Return a set of all the attribute names included in a category 
function attributes_from_category(dom, category) {
    const category_node = node_with_name(dom, 'attributecategory', category);
    const attribute_nodes = category_node.getElementsByTagName('attribute');
    return set_from_node_names(attribute_nodes);
}

// Return a set containing the names of all attributes for an element
function attribute_set(dom, element, ignore_categories = new Set()) {
    // Include attributes defined as a child of the element
    let attributes = 
        set_from_node_names(element.getElementsByTagName('attribute'));

    // Include attributes from all attribute categories
    const categories = element.getAttribute('attributecategories').split(/,\s*/);
    for (category of categories) {
        if (!ignore_categories.has(category)) {
            attributes = set_add(attributes, attributes_from_category(dom, category));
        }
    }

    return attributes; 
}

// Returns a dictionary mapping attributes to their category
function attributes_with_categories(dom, element) {
    const r = {};

    for (attribute of set_from_node_names(element.getElementsByTagName('attribute'))) {
        r[attribute] = null;
    }

    const categories = element.getAttribute('attributecategories').split(/,\s*/);
    for (category of categories) {
        for (attribute of attributes_from_category(dom, category)) {
            r[attribute] = category; 
        }
    }

    return r;
}

// Return a set containing the names of all the elements with tagname 'tag' in the DOM
function element_set(dom, tag) {
    return set_from_node_names(dom.getElementsByTagName(tag));
}

// main  
const ignore_categories = new Set(
    process.argv.length > 4
    ? process.argv.slice(4)
    : []
);

const svg1_dom = new DOMParser().parseFromString(
        fs.readFileSync(process.argv[2], {encoding: "utf-8"})
    );
const svg2_dom = new DOMParser().parseFromString(
        fs.readFileSync(process.argv[3], {encoding: "utf-8"})
    );

const svg2_elements = element_set(svg2_dom, 'element');
const svg1_elements = element_set(svg1_dom, 'element');

/*
console.log('Elements in SVG 2, but not in SVG 1.1SE:');
for (element of set_minus(svg2_elements, svg1_elements))
    console.log(`* ${element}`);

console.log('\nElements removed in SVG 2');
for (element of set_minus(svg1_elements, svg2_elements))
    console.log(`* ${element}`);

console.log('\nSVG 2 elements that existed in SVG 1.1, with only new attributes listed:');
console.log(`Ignoring categories: ${[...ignore_categories].join(', ')}.`);
for (element of set_intersection(svg2_elements, svg1_elements)) {
    console.log(`${element}:`);
    for (attribute of set_minus(
            attribute_set(svg2_dom, node_with_name(svg2_dom, 'element', element), ignore_categories),
            attribute_set(svg1_dom, node_with_name(svg1_dom, 'element', element), ignore_categories)
        )
    ) {
        console.log(`    ${attribute}`);
    }
}

console.log('\nProperties in SVG 2 that were not in SVG 1.1SE');
for (property of
    set_minus(
        element_set(svg2_dom, 'property'),
        element_set(svg1_dom, 'property')
    )
) {
    console.log(`${property}`);
}
*/

// Build a JSON table of the data
function support(in_svg2, in_svg1) {
    const support = [];
    if (in_svg2) support.push('SVG 2');
    if (in_svg1) support.push('SVG 1.1 SE');
    return support;
}

function support_with_category(in_svg2, svg2_category, in_svg1, svg1_category) {
    const support = [];
    if (in_svg2) support.push({'version':'SVG 2', 'category':svg2_category});
    if (in_svg1) support.push({'version':'SVG 1.1 SE', 'category':svg1_category});
    return support;
}

const comparison = {};
comparison.elements = [];

for (element of set_add(svg1_elements, svg2_elements)) {
    const in_svg2 = svg2_elements.has(element);
    const in_svg1 = svg1_elements.has(element);

    const element_obj = {"name": element, "support": support(in_svg2, in_svg1), "attributes": []};
    comparison.elements.push(element_obj);

    if (in_svg2 && in_svg1) {
        const svg2_elem = node_with_name(svg2_dom, 'element', element);
        const svg1_elem = node_with_name(svg1_dom, 'element', element);

        const svg2_attribs = attribute_set(svg2_dom, svg2_elem);
        const svg1_attribs = attribute_set(svg1_dom, svg1_elem);

        const svg2_attrib_category = attributes_with_categories(svg2_dom, svg2_elem);
        const svg1_attrib_category = attributes_with_categories(svg1_dom, svg1_elem);
        
        for (let attribute of set_add(svg2_attribs, svg1_attribs)) {
            element_obj.attributes.push({
                    "name": attribute,
                    "support": support_with_category(
                        svg2_attribs.has(attribute),
                        svg2_attrib_category[attribute],
                        svg1_attribs.has(attribute),
                        svg1_attrib_category[attribute]
                    )
            });
        }
    } else {
        for (let attribute of
            attribute_set(
                in_svg2 ? svg2_dom : svg1_dom,
                node_with_name(in_svg2 ? svg2_dom : svg1_dom, 'element', element)
            )
        ) {
            element_obj.attributes.push({
                    "name": attribute,
                    "support": support(in_svg2, in_svg1)
            });
        }
    }
        
}

console.log(JSON.stringify(comparison, null, 2));

