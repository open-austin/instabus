# Instabus 6.7

This is a rewrite of github.com/luqmaan/instabus.

Why are we rewriting Instabus?

1. Fetch data from the OneBusAway so that Instabus works for multiple cities (Austin, Tampa, Atlanta, etc.)
2. Add missing features like viewing the schedule for a stop or viewing nearby arrivals
3. Modernize the code, make it easier to read and easier to reason about
4. Be available as mobile apps first through Phonegap and then through React-Native

Check out the issues labeled with `components`, to see what we're thinking for a new layout. https://github.com/open-austin/instabus/issues?q=is%3Aissue+is%3Aopen+label%3Acomponents

:warning: The code is still in the very early stages and not quite ready for contributions. If you'd like to start contributing code, please let me know so I can have a sense of urgency and get the code ready. 

## Contributing

Want to help? Have idea for what the "new" Instabus should look like?

- Open an Issue on this repo
- Join the #instabus channel on the Open Austin slack: http://slack.open-austin.org
- Tweet @luqmonster

## Installing

```
npm install
npm start
```

We recommend using a editor with plugins for `editorconfig` and `eslint`.
