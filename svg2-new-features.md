_I'd like to move this into a proper matrix where we can list implementer feedback and support, but for now here's a basic list of what is new in SVG 2._

_Note: this list is now mostly complete, but is still being tidied up_

This list:
* Tries to describe new features and new behaviours
* Does not list features moved from one SVG spec to another (e.g. SVG Tiny 1.2 to SVG 2)

## New graphics features
* Mesh gradient shape element ('mesh') and paint server ('meshgradient')
* 'hatch' element - a new paint server for generating hatches with SVG paths
* 'context-fill' and 'context-stroke' values for 'fill' and 'stroke'
  These allow, for example, 'marker' elements to inherit the stroke color.
* New value 'auto-start-reverse' for the 'orient' attribute of the 'marker' element.
  Has implementations in Firefox, WebKit, Blink, and Inkscape.
* Path features:  
  * Allow closepath commands 'Z' and 'z' to fill in missing 'path data' from previous commands
  * Added bearing path commands 'B' and 'b' to 'path data'
  * New 'line join shape' definitions - 'miter-clip' and 'arcs'
* Support z-index on all SVG elements and define how SVG creates 'stacking contexts' 
* non-scaling-size, non-rotation, and fixed-position as options for the 'vector-effect' attribute
* 'paint-order' property to control stroke and fill drawing order
* Allow 'markers' on all shapes 
* Allow scroll bars when the 'overflow' property is set to scroll on 'svg' elements
* Allow control of the radius of focal 'circle' on the 'radialGradient' element
* extend getBBox() method of 'SVGGraphicsElement' with an argument that controls inclusion of the fill or the stroke

## Text changes
* CSS based multi-line text for 'text content elements':
  1. text area is contrained using 'inline-size'
  2. SVG creates a 'content area' and defers to CSS to perform layout within that area
* Support text in a shape using the 'shape-inside' and 'shape-subtract' properties
* Text on a path changes:
    * allow 'textPath' element to directly specify path data through the path attribute
    * Allow referencing basic shapes from 'textPath' element
    * Add 'side' attribute to 'textPath' to enable control of which side of the path text is placed on
* Font features (alternative glyphs, 'font-variant', etc.)
* Support @font-face rules on 'text' element
* masks, filters and other graphics effects may now be applied to 'tspan' and 'textPath' elements
* support ::first-letter & ::first-line pseudo selectors on 'text' element
* WOFF font support now required

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

## Accessibility
* Include WAI-ARIA attributes and define semantics
* Change role mapping for the ‘a’ element to depend on whether it is actually a valid link.

## Internationalisation
* ordering of 'systemLanguage' preferences follows SMIL allowReorder definition
* Add 'lang' attribute to replace xml:lang'

## Interactivity
* Require user agents that support 'interaction' to include :focus and ::selection styles.
* 'clip' and 'overflow' no longer ignored when SVG document referenced via 'image'
* Allow 'bounding box' area to be used for 'pointer-events' via the 'bounding-box' value
* Replace SVG specific events with common equivalents

## Document structure changes
* 'unknown' elements are treated as a 'g' or 'tspan' element
* Allow the 'script' element anywhere
* Allow 'animation elements' to be descended from the 'view' element
* Allow the 'pathLength' attribute on all 'basic shapes'
* Add 'text-decoration-fill' and 'text-decoration-stroke' properties
* Add left|middle|center keywords for 'refX' and 'refY' attributes
* Allow 'paint server elements' and 'marker' elements to descend from 'shapes' and be referenced through child(n)

## Synchronise with other tech (e.g. HTML)
* Add additional attributes to the 'a' element to synchronise with HTML
* Added 'tabindex' attribute
* Update requirements for ‘id’ values to harmonize with HTML
* 'white space character' set now includes form feed (U+000C) to align with HTML and CSS
* Support 'white-space' property in favour of xml:space' attribute 
* Support custom data attributes on all SVG elements
* Support percentages and CSS lengths in many places
* HTML 'link' element supported and must load external style sheets
* Add 'crossorigin' attribute to the 'image' and 'script' elements
* Inclusion of HTML 'audio', 'video', 'iframe', 'canvas', 'source', and 'track' elements

## Promote attributes to presentation attributes
* Made many attributes 'presentation attributes':
  * 'd'
  * what else?
* Convert some geometry attributes to 'geometry properties'
  Geometry properties support lengths and percentages and auto:
  * 'ellipse' & 'circle': cx, cy
  * 'circle': 'r'
  * 'ellipse': 'rx', 'ry'
  * 'svg', 'rect', image, 'foreignObject': 'x', 'y', 'width', 'height'
* Support many properties defined by other specifications (list?)

## Other Visual changes from SVG 1.1
* inner 'svg' elements and 'foreignObject' elements are no longer have 'overflow' hidden by default
* 'svg' root elements and 'foreignObject' no longer have 'overflow' hidden by default
* Allow scroll bars to be shown for 'overflow' auto in special cases

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
* Remove contentScriptType attribute

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

## API Changes
__To do: Draw up UML diagrams to show this info graphically__
* Added "length" attribute and indexed property access to all list interfaces.
* Replace 'SVGMatrix' with DOMMatrix or DOMMatrixReadOnly
* Replace 'SVGRect' with DOMRect or DOMRectReadOnly
* Replace 'SVGPoint' with DOMPoint or DOMPointReadOnly
* Moved members from 'SVGStylable' and 'SVGLangSpace' to 'SVGElement' and removed those interfaces
* Added 'SVGGraphicsElement'
* Moved members from 'SVGLocatable' and 'SVGTransformable' to 'SVGGraphicsElement' and removed those interfaces
* Added 'SVGGeometryElement' with isPointInFill and isPointInStroke methods
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
* Added 'SVGUnknownElement'
* Removed the viewport attribute from 'SVGSVGElement'
* 'SVGElement' has been extended to replace the core functionality from 'SVGElementInstance'.
* 'SVGSymbolElement' now inherits from 'SVGGraphicsElement'
* ShadowAnimation interface defined
* 'SVGStyleElement' now implements LinkStyle
* Remove SVGPathSeg* interfaces
* Remove 'SVGAnimatedPathData' interface
* Remove methods on 'SVGPatElement' related to SVGPathSeg* and 'SVGAnimatedPathData'
* Moved pathLength, getTotalLength() and getPointAtLength() on to 'SVGGeometryElement' interface
* animatedPoints attribute of 'SVGAnimatedPoints' now aliases the points attribute
* Remove 'SVGPaint' interface
* Replace 'SVG' specific events with common equivalents
* Define the 'SVGUseElementShadowRoot' interface as an extension of the ShadowRoot interface,
  and require it to be used for use-element shadow trees


