var ghpages = require('gh-pages');
var path = require('path');

const options = !process.env.GH_TOKEN ? null : {
  repo: 'https://' + process.env.GH_TOKEN + '@github.com/open-austin/instabus.git',
  user: {
    name: 'Travis CI',
    email: 'hack@open-austin.org',
  },
};

ghpages.publish(path.join(__dirname, 'dist'), options, function (err) {
  if (err) {
    console.error(err);
  }
  else {
    console.log('available on gh page');
  }
});
