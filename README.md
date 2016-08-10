# svg2-info
Documents providing information on SVG 2, and tools to simplify writing them.

Currently this repository includes the source for:
* https://github.com/w3c/svgwg/wiki/SVG-2-new-features

The source documents in this repository do not include links, but refer to elements, properties, and terms defined in SVG 2, which can be linked automatically.
To reference a possible term, surround the term in single quotes (e.g. 'rect').

The process for updating the documents is:
* Edit the markdown from this repistory
* Run link_to_svg_defs.js to create a version with links to the SVG spec
* Paste result into wiki
* Submit PR to this repository with your changes to the source markdown files

To add links use:
```node link_to_svg_defs.js ```
This will print out usage instructions.
Requires:
* https://www.npmjs.com/package/xmldom
