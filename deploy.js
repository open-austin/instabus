var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'dist'), {
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/open-austin/instabus.git',
  user: {
    name: 'Travis CI',
    email: 'hack@open-austin.org',
  },
}, function (err) {
  if (err) {
    console.error(err);
  }
  else {
    console.log('available on gh page');
  }
});
