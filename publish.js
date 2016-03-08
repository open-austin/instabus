var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'dist'), function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('available on gh page');
  }
});
