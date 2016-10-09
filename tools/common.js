function $(selector) {
    return document.querySelector(selector);
}

function new_elem(type) {
    return document.createElement(type);
}

function http_get_async(theUrl, callback, callback_data, page)
{
    var xml_http = new XMLHttpRequest();
    xml_http.onreadystatechange = function() { 
        if (xml_http.readyState == 4 && xml_http.status == 200)
            callback(xml_http.responseText, callback_data);
    }
    xml_http.open("GET", theUrl, true); // true for asynchronous 
    xml_http.send(null);
}
