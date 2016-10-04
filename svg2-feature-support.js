(function() {

function $(selector) {
    return document.querySelector(selector);
}

function new_elem(type) {
    return document.createElement(type);
}

function httpGetAsync(theUrl, callback, callback_data, page)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, callback_data);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function features_json_received(responseText) {
    var categories = JSON.parse(responseText);
    for (category of categories) {
        const tbody = new_elem('tbody');
        const tr = new_elem('tr');
        const td = new_elem('td');

        td.innerHTML = category.category;

        tr.appendChild(td);
        tbody.appendChild(tr);
        $('#feature-support-table').appendChild(tbody);
        
        for (feature of category.features) {
            const tr = new_elem('tr');
            const td = new_elem('td');
            td.innerHTML = feature.name;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }
}

window.onload = function() {
    httpGetAsync(
        'svg2-new-features.json',
        features_json_received
    );    
}

})();
