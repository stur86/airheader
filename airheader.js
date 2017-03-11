var AirHeader = document.registerElement('air-header');
var AirHeaderBody = document.registerElement('air-header-body');

(function() {

    // Function to find all siblings coming after a DOM element (thanks PureJS!)

    function getNextSiblings(el) {
        var siblings = [];
        var nEl = el.nextSibling;
        while (nEl != null) {
            siblings.push(nEl);
            nEl = nEl.nextSibling;
        }
        return siblings;
    }

    function insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }

    // Attribute handlers
    // Generic decorator to check that value is not null
    function attr_decor(f) {
        return function(ah, ab, val) {
            if (val != null) {
                f(ah, ab, val);
            }
        };
    }

    var attr_handlers = {
        'height': attr_decor(function(ah, ab, val) { // Fix the height of the header
            // Only accepted as PERCENT
            var val = parseFloat(val);
            ah.style.height = val + '%';
            ab.style.top = val + '%';
            ab.style.bottom = '0';
        }),
        // Select an image for the background of the header 
        'image': attr_decor(function(ah, ab, val) {
            var bkgImg = document.createElement('img');
            bkgImg.setAttribute('src', val);
            bkgImg.setAttribute('id', 'air-header-bkgimg');
            ah.appendChild(bkgImg);
        }),
        // Set a single color for the 'foil' (layer between image and text)
        'foil-color': attr_decor(function(ah, ab, val) {
            ah._foil.style.backgroundColor = val;
        }),
        // Set a gradient color for the 'foil'
        'foil-gradient': attr_decor(function(ah, ab, val) {
            // Create gradient style
            var gstyle = 'background: linear-gradient(' + val + ');';
            gstyle += 'background: -webkit-linear-gradient(' + val + ');';

            ah._foil.style.cssText += gstyle;
        }),
        // Set the foil's background CSS attribute directly
        'foil-background': attr_decor(function(ah, ab, val) {
            ah._foil.style.background = val;
        }),
    }

    function airheader_init() {
        var ah = document.getElementsByTagName('air-header')[0];

        if (ah == null)
            return;

        // Cram all siblings after this into a 'body' element
        var sibls = getNextSiblings(ah);
        var ab = document.createElement('air-header-body');
        for (var i = 0; i < sibls.length; ++i) {
            ab.appendChild(sibls[i]);
        }
        insertAfter(ab, ah);
        // Create the text element
        ah._text = document.createElement('div');
        ah._text.setAttribute('id', 'air-header-text');
        // And set to it the first child of the header
        ah._text.appendChild(ah.firstChild);
        ah.appendChild(ah._text);
        // Foil always created
        bkgFoil = document.createElement('div');
        bkgFoil.setAttribute('id', 'air-header-bkgfoil');
        ah._foil = bkgFoil;
        ah.appendChild(bkgFoil);

        for (attr in attr_handlers) {
            attr_handlers[attr](ah, ab, ah.getAttribute(attr));
        }


    }

    // in case the document is already rendered
    if (document.readyState != 'loading') airheader_init();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', airheader_init);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function() {
        if (document.readyState == 'complete') airheader_init();
    });

})();