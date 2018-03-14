# svg2-info
Documents providing information on SVG 2, and tools to simplify writing them.

Currently this repository includes the source for:
* https://nikosandronikos.github.io/svg2-info/svg2-feature-support
* https://github.com/w3c/svgwg/wiki/SVG-2-new-features

## SVG2 feature support
This page reads data from the JSON file '__svg2-new-features-processed.json__' and displays a table outlining the current state of SVG 2 support in user agents.
'__svg2-new-features-processed.json__' must not be edited directly. Instead edit '__svg2-new-features.json__' and generate' '__svg2-new-features-processed.json__' using:  
```node link_to_svg_defs.js <path_to_definitions.xml> svg2-new-features.json > svg2-new-features-processed.json```

Where &lt;path_to_definitions.xml&gt; points to the [definitions.xml](https://github.com/w3c/svgwg/blob/master/master/definitions.xml) file in the master directory of the SVG 2 spec repository.

## SVG2 new features
The source for the [wiki page](https://github.com/w3c/svgwg/wiki/SVG-2-new-features) on the svgwg repository.
The process for updating the page is:
* Edit the markdown from this repository
* Run link_to_svg_defs.js to create a version that links terms to the SVG spec
* Paste result into wiki
* Submit PR to this repository with your changes to the source markdown files

## link_to_svg_defs.js
The source documents in this repository do not include links, but refer to elements, properties, and terms defined in SVG 2, which can be linked automatically using this script.
To reference a possible term, surround the term in single quotes (e.g. 'rect').

To replace terms with links, try:  
```node link_to_svg_defs.js ```  
This will print out usage instructions.

Requires:
* https://www.npmjs.com/package/xmldom


