const fs = require('fs');

const moveFile = (filename) => {
  // move to directory based on file names
  fs.rename(`./temp/${filename}`, `./level-${filename[filename.length - 5]}/${filename}`, function(err){
    if(err) {
      console.log(err);
      return;
    }
    console.log(`${filename} has been moved`);
  });
}

// Read directory
fs.readdir('./temp', function(err, files){
  if(err) throw err;
  // eval files by name
  console.log('files', files);
  files.map((filename)=>{
    // Make sure the file is one of the txt files
    console.log(filename.substring(filename.length - 4,filename.length))
    if(filename.substring(filename.length - 4,filename.length) !== '.txt') return;

    // Create dorectory if it does not work already
    fs.access(`./level-${filename[filename.length - 5]}`, function(err){
      if(err){
        fs.mkdir(`./level-${filename[filename.length - 5]}`, ()=>{moveFile(filename)})
      }
      moveFile(filename)
    })
  });
});