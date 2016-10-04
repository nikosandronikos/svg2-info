function Category(name) {
    this.category = name;
    this.features = [];
}

Category.prototype.addFeature = function(name) {
    this.features.push({"name": name, "support": []});
}

if (process.argv.length != 3) {
    console.log('Generate JSON representation of the SVG 2 new features Markdown file.');
    console.log(`usage: ${process.argv[0]} <inputfile>`);
    process.exit(1);
} else {
    const fs = require('fs');
    const readline = require('readline');
    const input_md = process.argv[2];

    const categories = [];
    let current_category = null;

    readline.createInterface(
            {input: fs.createReadStream(input_md, {encoding: 'utf-8'})}
        )
        .on('line', (line) => {
            // By convention, categories are level 3 headings, and
            // features are items in a list. Ignore anything else.
            if (line.startsWith('###')) {
                const name = /^###\s*(.+?):??\s*$/.exec(line);
                current_category = new Category(name[1]);
                categories.push(current_category);
            } else if ((line.startsWith('*') || line.startsWith('-')) && current_category) {
                const name = /[*-]\s*(.*)/.exec(line);
                current_category.addFeature(name[1]);
            }
        })
        .on('close', () => {
            console.log(JSON.stringify(categories, null, 4));
        });
}

