(function() {

function support_td(support_exists) {
    return `<td>${support_exists?'&#10003;':''}</td>`
}

function attribute_row(attribute) {
    const tr = new_elem('tr');

    let in_svg2 = false;
    let in_svg1 = false;

    for (support of attribute.support) {
        switch (support.version) {
            case 'SVG 2': in_svg2 = support; break;
            case 'SVG 1.1 SE': in_svg1 = support; break;
        }
    }

    tr.innerHTML = `<td>${attribute.name}</td>${support_td(in_svg2)}${support_td(in_svg1)}`;

    if (in_svg1 && in_svg2 && in_svg2.category != in_svg1.category) {
        tr.className = `category_difference ${in_svg2.category}_category ${in_svg1.category}_category`;
    } else if (in_svg2) {
        tr.className = `${in_svg2.category}_category`;
    } else if (in_svg1) {
        tr.className = `${in_svg1.category}_category`;
    }
        
    tr.className = tr.className + ' attribute';
    
    $('#comparison_table > tbody').appendChild(tr);
}

function json_received(responseText) {
    const response = JSON.parse(responseText);

    for (element of response.elements) {
        let in_svg2 = false;
        let in_svg1 = false;

        for (version of element.support) {
            switch(version) {
                case 'SVG 2': in_svg2 = true; break;
                case 'SVG 1.1 SE': in_svg1 = true; break;
            }
        }

        const tr = new_elem('tr');
        tr.innerHTML = `<td>${element.name}</td>${support_td(in_svg2)}${support_td(in_svg1)}`;
        tr.className = 'element';
        $('#comparison_table > tbody').appendChild(tr);

        for (attribute of element.attributes) {
            attribute_row(attribute);
        }
    }
}

window.onload = function() {
    http_get_async(
        'svg2-vs-svg1.json',
        json_received
    );    
}

})();

