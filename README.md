# airheader.js
## A JS+CSS solution for pretty webpage headers - as light as air!

Airheader.js is a simple JS+CSS solution to create pretty webpage headers in a single line of code. It defines two new HTML elements, `air-header` and `air-header-body`. The former, when used, immediately transforms into a fixed block, displacing the rest of the content in an instance of the second - which is created automatically, so you don't need to worry about that.

The simplest way to use it is to create an element:

```html
<air-header>Title of my page</air-header>
```

right at the top of your page's `body`. It's important that the header is placed as the first element, as it won't put in `air-header-body` anything that comes before it. This will immediately create a header with "Title of my page" right at the center and displace everything down. Of course that might still look a little dreary, so let's see how to spice it up with some style!

## Attributes

The `air-header` element has some special attributes that allow it to define some aspects of how it looks like. Let's go through them.

### Height

```html
<air-header height='40%'>Title of my page</air-header>
```

The `height` attribute simply controls the height of the header and, by proxy, the remaning height for the body. Important: even if you don't specify any units, this height is intended in ***percent***. Anything else will be ignored.

### Image

```html
<air-header height='40%' image='img/background.png'>Title of my page</air-header>
```

The `image` attribute sets the URL of an image you want to display in the background of header. Make sure the image is big enough to look good at any resolution and has a ratio sufficient not to leave any empty space! This image is placed in a special `div` element with ID `air-header-bkgimg`.

### Foil

```html
<air-header height='40%' image='img/background.png' 
foil-color='rgba(0,0,0,0.2)'>Title of my page</air-header>
```

```html
<air-header height='40%' image='img/background.png' 
foil-gradient='45deg,rgba(0,0,0,0.0),rgba(0,0,0,0.5)'>Title of my page</air-header>
```

The 'foil' is the name of a layer that stays in between the background image and the layer displaying the text of the header. It allows you to apply special effects to make the header look different and possibly mutable. `foil-color` simply sets a uniform background color for the foil, while `foil-gradient` accepts the same arguments as the CSS definition of `linear-gradient` (don't worry about prefixes, airheader takes care of those). In this case the first example places a gray half transparent layer over the entire header, while the second makes it gradually appear over the image from bottom left. If neither of these options are enough, you can use the attribute `foil-background` to directly set the CSS for the `background` attribute, or style directly `#air-header-bkgfoil`.

## Styling elements

Of course there's still plenty of styling possibilities you may have in mind, but those don't affect anything too much, so you can simply set them yourself through ordinary CSS (except for positioning related ones and transforms - mess with those at your own risk!). For than it's important however to know the names of the elements that appear in the page after the header has been placed.

The main element is of course `air-header`. If you're not looking for anything too sophisticated you can style this (text size, color, font etc.) and leave it at that. For most applications this will work.

Everything else in the page is dumped into `air-header-body`. This basically becomes a replacement for your `body` element, so treat it as such. Anything that is supposed to involve all your content goes here.

The header can create up to three elements inside itself (they're created only if needed). These are all divs, defined by their IDs:

* `#air-header-text` is the 'title' of the page. It contains the *first child of `air-header`*. Normally, if you simply wrote text into it, that text is it; however you can also use a div or any other more complex element. Anything that comes afterwards in the header will be left where it is and will keep whatever styling you applied to it; whatever ends considered as the 'text' however will be centred. Styling this element will give you control over the look of your title text if you also places something else inside the header and don't want to touch it.

* `#air-header-bkgfoil` is the foil. Styling this allows to go beyond the limitations set by the simple use of attributes.

* `#air-header-bkgimg` is the image, if you asked for one. It's pretty self explanatory and probably there's not much you can style in it.

## And in the end...

...that's it! Airheader does not depend any other JS library, partly because I thought it would be overkill for something so simple, partly because I wanted to experiment a bit with vanilla JS. It was a one-day hobby project basically. Some recipes have been taken from [plain JS](https://plainjs.com/), which is a pretty cool website for this stuff. For similar reasons of simplicity and lightness I haven't bothered using NPM or Gulp - Makefile, sass and UglifyJS were all I needed to make a build. The library's released under GPL 3.0, if you do anything with it let me know and I'll be happy to integrate any changes. I'm willing to take suggestions for new functionality but right now I'm not planning to expand this much beyond its current scope. Have fun!
