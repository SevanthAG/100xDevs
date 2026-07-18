const fs = require("fs")
const { Command } = require('commander');
const program = new Command();

program
  .name('Counter')
  .description('Count the  Number Of words in the file')
  .version('0.0.1');

program.command('count')
  .description('Count the number of words in the files')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
        let words = 1;
        for (let i = 0; i< data.length; i++){
            if (data[i] === " "){
                words++;
            }
        }
        console.log(`There are ${words} words in the ${file}`)
    })
  });

program.parse();