_I'd like to move this into a proper matrix where we can list implementer feedback and support, but for now here's a basic list of what is new in SVG 2._

_Note: this list is now mostly complete, but is still being tidied up_

This list:
* Tries to describe new features and new behaviours
* Does not list features moved from one SVG spec to another (e.g. SVG Tiny 1.2 to SVG 2, SVG 1.1 to CSS Masking Level 1)

## Key new features:

### New elements: 

- 'meshgradient', 'meshrow' and 'meshpatch' define gradient mesh paint servers to define two-dimensional gradients with arbitrary shapes; 'mesh' draws a path-like shape that tightly fits a mesh gradient and is filled with it
- 'hatch' and 'hatchpath' define a hatch paint server, which draws a repeating pattern of paths that are continuous in one dimension and tiled in the other
- Selected HTML embedded content elements ('video', 'audio', 'canvas', 'iframe') can now be embedded direcly in SVG without requiring a 'foreignObject' wrapper
- Selected HTML metadata elements ('base', 'link', 'meta', 'style', and 'script') can be included within the SVG fragment and have their normal effect (but except for linked stylesheets, user agents are only required to support them if they already support HTML)

### New attributes on existing elements:
* 'tabindex' on all rendered elements
* 'role' and WAI-ARIA state & property attributes on all elements
* 'href' as a replacement for 'xlink:href'
* 'lang' as a replacement for 'xml:lang'
* 'fr' on the 'radialGradient' element allows control of the radius of focal circle
* 'refX' and 'refY' on a 'symbol' element supports more precise placement in maps and data charts
* 'x','y','width', and 'height' on a symbol (as presentation attributes)
* 'pathLength' attribute on all 'basic shapes'

### New style properties:
* Support 'z-index' on all SVG elements and define how SVG creates 'stacking contexts'
* 'paint-order' property to control stroke, fill, and marker drawing order.
  Has implementations in Firefox, WebKit, Blink, and Inkscape.
* 'vector-effect' property with non-scaling-size, non-rotation, and fixed-position as options (in addition to non-scaling-stroke which was defined in SVG Tiny 1.2)
* Many properties to control text layout (see section on text changes, below)
* Support now required for these CSS properties defined elsewhere (in addition to styles that were required in SVG 1.1):
  * 'text-overflow', 
  * 'isolation', 'mix-blend-mode', 
  * 'transform', 'transform-origin', 'transform-box', 
  * 'text-align', 'text-align-all', 'text-align-last', 'text-indent', 
  * 'white-space', 'text-space-collapse'
  * 'vertical-align'
  * 'font-feature-settings', 'font-kerning', 'font-size-adjust', new 'font-variant' sub-properties
  * New 'text-decoration' sub-properties
* 'text-decoration-fill' and 'text-decoration-stroke' properties defined to complement the new 'text-decoration' sub-properties

### Geometric attributes that can now be specified as style properties:
* 'x', 'y', 'width' and 'height' on 'svg', 'rect', image, 'foreignObject', 'use', and 'symbol'
* 'cx' and 'cy' on 'ellipse' & 'circle'
* 'r' on 'circle'
* 'rx' and 'ry' on 'ellipse' & 'rect'
* 'd' on a 'path'

### New values for existing properties or attributes:
* 'context-fill' and 'context-stroke' values for 'fill' and 'stroke'.
  These allow, for example, 'marker' elements to match the stroke paint of the path they are marking.
* 'child' and `child(_n_)` referencences instead of `url()` references for paint servers and markers.
* New value 'auto-start-reverse' for the 'orient' attribute of the 'marker' element.  This allows the same arrow marker to be used at the start and end of a line, automatically transformed to point in opposite directions.
  Has implementations in Firefox, WebKit, Blink, and Inkscape.
* New values 'miter-clip' and 'arcs' for 'stroke-linejoin' provide more aesthetically pleasing 'line join shape'
* 'auto' values for 'rx' and 'ry'
* Add left|middle|center keywords for 'refX' and 'refY' attributes

### New interfaces:
* 'SVGGraphicsElement' interface merges various previous interfaces
* 'SVGGeometryElement' defines common behavior for all shapes
* 'SVGUnknownElement' is used for unrecognized markup in the SVG namespace
* 'SVGUseElementShadowRoot' interface as an extension of the ShadowRoot interface,
  and require it to be used for use-element shadow trees
* 'ShadowAnimation' interface defines a read-only clone of a WAAPI animation for use-element shadow trees

### New/expanded interface methods and properties:
(See also other API changes, below)

* Added "length" attribute and indexed property access to all list interfaces.
* Extend getBBox() method of 'SVGGraphicsElement' with an argument that controls inclusion of the fill or the stroke
* isPointInFill and isPointInStroke methods added for all shapes ('SVGGeometryElement')
* getTotalLength and getPointAtLength methods now available for all shapes ('SVGGeometryElement')
* focus and blur methods, on any 'SVGElement'

### New path features:
* Allow closepath commands 'Z' and 'z' to fill in missing 'path data' from previous commands
* Added bearing path commands 'B' and 'b' to 'path data'
* Define a canonical equivalent path for all basic shapes (used in stroke dashing and marker positioning)


## Text changes
* CSS based multi-line text for 'text content elements':
  1. text area is contrained using 'inline-size'
  2. SVG creates a 'content area' and defers to CSS to perform layout within that area
* Support more whitespace preservation options, using CSS 'white-space' property
* Support text in a shape using the 'shape-inside' and 'shape-subtract' properties, modified by the 'shape-image-threshold', 'shape-padding' and 'shape-margin' properties
* Text on a path changes:
    * allow 'textPath' element to directly specify path data through the path attribute
    * Allow referencing basic shapes from 'textPath' element
    * Add 'side' attribute to 'textPath' to enable control of which side of the path text is placed on
    * Clarify other areas where there have been inconsistencies
* Require CSS/OpenType font feature support (alternative glyphs, 'font-variant', etc.)
* Require support for @font-face rules
* Masks, filters and other graphics effects may now be applied to 'tspan' and 'textPath' elements
* Support ::first-letter & ::first-line pseudo selectors on 'text' element
* WOFF font support now required
* Vertical text and alternative text baseline properties now harmonized with CSS

## Use element changes
* 'use' element now defined in terms of Web Components
  * 'use' elements may now reference an entire document
  * 'use' element 'shadow tree' now consist of actual 'SVGElement' objects in a proper
    shadow DOM node tree, not 'SVGElementInstance' pseudo-nodes.
  * Events bubbling out of a 'use' element shadow tree must follow the shadow DOM re-targetting rules.
  * Styles rules are resolved independently for clones versus the referenced graphics
  * Some interactive animations are now triggered independently on the shadow content vs the referenced graphics.
  * Never-rendered elements will now have a computed style of display: none
  * The shadow tree must now have a 'ShadowRoot' object, and implement extra functionality from shadow DOM specs.
  * All elements in a subtree must now be cloned, not only graphics elements.
  * The shadow tree has scoped stylesheets.
  * Symbol elements can have 'x'/'y'/'width'/'height' properties.

## Interactivity Changes
* Require user agents that support 'interaction' to include :focus and ::selection styles.
* Allow scroll bars when the 'overflow' property is set to scroll on 'svg' elements
* 'clip' and 'overflow' no longer ignored when SVG document referenced via 'image'
* Allow 'bounding box' area to be used for 'pointer-events' via the 'bounding-box' value
* Replace SVG-specific events with common equivalents

## Other New Behavior or Visual Changes:
* 'unknown' elements are treated as a 'g' or 'tspan' element
* Allow 'paint server elements' and 'marker' elements to descend from 'shapes' and be referenced through child(n) instead of by ID
* Allow 'markers' on all shapes
* Make the content model of many elements more flexible, e.g. the 'script' element is allowed anywhere; 'animation elements' can be descended from the 'view' element
* 'svg' elements that are children of HTML elements or 'foreignObject' elements no longer have 'overflow' hidden by default
* 'foreignObject' elements no longer have 'overflow' hidden by default
* New guidance on resolving URLs and loading external files
* Conditional processing attributes and 'switch' only affect the display of the relevant elements, not processing of styles, scripts, or fetching of external resources.
* Clearer guidance given on the intrinsic sizing of SVG elements when embedded in other layout systems

## Accessibility Improvements
* Provide both declarative ('tabindex') and scripted control over which elements receive keyboard focus, allowing the creation of keyboard-accessible widgets
* Allow 'WAI-ARIA attributes' on all elements
* Define default and allowed 'role' values for each element; with the SVG Accessibility API Mappings specification, this provide
* Allow alternative text metadata ('title' and 'desc') to be provided in multiple language versions in the same file.

## Internationalisation Improvements
* Ordering of 'systemLanguage' preferences follows SMIL allowReorder definition, allowing language selection to better match user preferences.
* The 'lang' attribute replace 'xml:lang' for greater language support in non-XML contexts (e.g., in HTML 5) and for authoring consistency.
* Required support for the :lang() CSS pseudoclass.
* Alternative text metadata ('title' and 'desc') can be provided in multiple language versions in the same file, with the user agent selecting based on system language preferences.
* Support for non-Western writing modes is now harmonized with CSS, which should lead to wider and more consistent implementations; includes support for additional vertical writing modes compared to SVG 1.1.

## Improved Harmonization with HTML
* Add additional attributes to the 'a' element to synchronise with HTML
* Focus control uses the same model as HTML ('tabindex' attribute, `focus` and `blur` methods)
* Update requirements for ‘id’ values to harmonize with HTML
* Support custom data attributes on all SVG elements
* HTML 'link' element supported and must load external style sheets; other HTML metadata supported
* Add 'crossorigin' attribute to the 'image' and 'script' elements
* Inclusion of HTML 'audio', 'video', 'iframe', 'canvas', 'source', and 'track' elements
* Many DOM API interfaces have been harmonized (see Other API changes, below)

## Improved Harmonization with CSS
* CSS support now required for user agents
* 'transform' attributes and properties now defined in CSS Transforms
* Clipping and masking now defined in CSS Masking spec
* Filters now defined in CSS Filters spec
* Use CSS parsing rules for all presentation attributes and many other attributes
* Support 'white-space' property in favour of xml:space' attribute 
* 'white space character' set now includes form feed (U+000C) to align with HTML and CSS
* Support percentages and CSS lengths in many places
* Elements that are never rendered are now defined in terms of user agent stylesheets
* Required support for @media, @import, @charset and @font-face
* Required support for all pseudo-classes defined in CSS 2.1
* Required support for ::first-line and ::first-letter pseudo-elements, and for ::selection in interactive user agents
* SVGStyleElement now implements the LinkStyle interface


## Removed
* Remove DTD
* Removed SVG Fonts
* Removed externalResourcesRequired attribute
* Removed baseProfile and version attributes from the 'svg' element
* Removed requiredFeatures attribute
* Removed the ‘contentStyleType’ attribute.
* Removed xml:base
* Removed defer keyword from preservedAspectRatio
* Removed the tref element
* removed the Alternate Glyph elements (altGlyph, altGlyphItem, glyphRef)
* Removed xlink:type, xlink:role, xlink:arcrole, xlink:show, and xlink:actuate attributes
* Removed the viewTarget attribute from the view element
* Removed contentScriptType attribute

## Deprecated
* methods suspendRedraw, unsuspendRedraw, and unsuspendRedrawAll on 'SVGSVGElement'
* rootElement attribute
* forceRedraw method on 'SVGSVGElement'
* deselectAll method on 'SVGSVGElement'
* xml:space
* xlink:href
* xlink:title
* selectSubString() method on 'SVGTextContentElement' interface
* 'cursor' element
* 'kerning', 'glyph-orientation-vertical', 'glyph-orientation-horizontal'

## Other API Changes
__To do: Draw up UML diagrams to show this info graphically__
* Replace 'SVGMatrix' with DOMMatrix or DOMMatrixReadOnly
* Replace 'SVGRect' with DOMRect or DOMRectReadOnly
* Replace 'SVGPoint' with DOMPoint or DOMPointReadOnly
* Moved members from 'SVGStylable' and 'SVGLangSpace' to 'SVGElement' and removed those interfaces
* Moved members from 'SVGLocatable' and 'SVGTransformable' to 'SVGGraphicsElement' and removed those interfaces
* Removed 'SVGExternalResourcesRequired' interface
* Removed 'SVGColor' and 'SVGICCCOlor' interfaces
* Removed getPresentationAttribute method from 'SVGElement'
* Add tabindex attribute, and focus and blur methods, to 'SVGElement'
* Add activeElement attribute to Document
* 'SVGElement' now inherits GlobalEventHandlers from HTML
* extend getBBox with an argument that controls inclusion of fill or stroke
* Remove xmlbase, xmllang, and xmlspace attributes from 'SVGElement' interface
* Remove 'SVGViewSpec' interface
* Remove getTransformToElement from 'SVGGraphicsElement'
* Allow getCTM on outermost 'svg' element
* Make animVal an alias for baseVal and no longer reflect animated value
* Added dataset attribute to 'SVGElement'
* Moved methods pathLength, getTotalLength, and getPointAtLength to 'SVGGeometryElement'
* Removed 'SVGElementInstance' and 'SVGElementInstanceList' interfaces
* Removed currentView and useCurrentView properties on 'SVGSVGElement'
* Removed the viewport attribute from 'SVGSVGElement'
* 'SVGElement' has been extended to replace the core functionality from 'SVGElementInstance'.
* 'SVGSymbolElement' now inherits from 'SVGGraphicsElement'
* ShadowAnimation interface defined
* 'SVGStyleElement' now implements LinkStyle
* Remove SVGPathSeg* interfaces
* Remove 'SVGAnimatedPathData' interface
* Remove methods on 'SVGPathElement' related to SVGPathSeg* and 'SVGAnimatedPathData'
* Moved pathLength, getTotalLength() and getPointAtLength() on to 'SVGGeometryElement' interface
* animatedPoints attribute of 'SVGAnimatedPoints' now aliases the points attribute
* Remove 'SVGPaint' interface
* Replace SVG-specific events with common equivalents


