(function() {

function support_td(support_exists) {
    return `<td>${support_exists?'&#10003;':''}</td>`
}

function attribute_row(attribute, category_set) {
    const tr = new_elem('tr');
    const classes = [];

    let in_svg2 = false;
    let in_svg1 = false;

    for (support of attribute.support) {
        switch (support.version) {
            case 'SVG 2': in_svg2 = support; break;
            case 'SVG 1.1 SE': in_svg1 = support; break;
        }
    }

    tr.innerHTML = `<td>${attribute.name}</td>${support_td(in_svg2)}${support_td(in_svg1)}`;

    classes.push('attribute'); 

    if (in_svg1 && in_svg1.category != null) {
        const category_safe = `${in_svg1.category.replace(' ', '_')}_category`;
        classes.push(category_safe);
        category_set.add(category_safe);
    }

    if (in_svg2 && in_svg2.category != null) {
        const category_safe = `${in_svg2.category.replace(' ', '_')}_category`;
        classes.push(category_safe);
        category_set.add(category_safe);
    }

    if (in_svg2 && !in_svg1) {
        classes.push('svg2_new');
    }
    
    if (in_svg1 && in_svg2 && in_svg1.category != in_svg2.category) {
        classes.push('category_difference');
    }
        
    tr.className = classes.join(' ');
    $('#comparison_table > tbody').appendChild(tr);
}

function json_received(responseText) {
    const response = JSON.parse(responseText);
    const category_set = new Set();

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

        if (in_svg2) {
            for (attribute of element.attributes) {
                attribute_row(attribute, category_set);
            }
        }
    }

    for (category of category_set) {
        const checkbox = new_elem('input');
        const label = new_elem('label');
        var category_safe = category;
        const style_sheet = document.styleSheets[0];
        console.log(category_safe);
        console.log(typeof(category));

        checkbox.type = 'checkbox';
        checkbox.id = `show_${category_safe}`;
        label.htmlFor = `show_${category_safe}`;
        label.innerHTML = `Hide ${category_safe}?`;
        $('body').insertBefore(checkbox, $('#comparison_table'));
        $('body').insertBefore(label, $('#comparison_table'));
        $('body').insertBefore(new_elem('br'), $('#comparison_table'));

        style_sheet.insertRule(
            `#show_${category_safe}:checked ~ .${category_safe}, #show_${category_safe}:checked ~ * .${category_safe} {display:none}`,
            style_sheet.cssRules.length
        );
    }
}

window.onload = function() {
    http_get_async(
        'svg2-vs-svg1.json',
        json_received
    );    
}

})();

