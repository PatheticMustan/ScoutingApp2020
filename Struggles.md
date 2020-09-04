# Struggles

## Problem

Recording the data of other teams was a real pain.
Scouters had to write the values, screenshot it, airdrop it over to a nearby Mac, and those screenshots would be transcribed into a spreadsheet... It was painful.

## Goal

Our goal was to ease the pain of scouting. We wanted to make an app that:
* Scouters could use on their school iPads.
* had forms/tickers to record the actual data, and any additional notes.
* had timers so Scouters wouldn't have to switch out of the app to log how long something took.
* could export all the data into a spreadsheet, and send it to the main computer, preferably over Bluetooth.

## Thought Process

> Scouters could use on their school iPads.

For this, we used [React Native](https://reactnative.dev/) + [Expo](https://expo.io/), so we could avoid using Xcode and Android Studio.

We also looked at [Xamarin Forms](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/). Both platforms allow us to build native apps without Xcode, which is only available on Macs. 😡

> had forms/tickers to record the actual data, and any additional notes.

React Native is based on the idea of having tons of tiny little components. Even the pages are components!
This made textboxes and tickers very easy. Once we wrote one, we could just re-use it, and pass in any custom placeholder/data-values we wanted. Kinda like a template.

> had timers so Scouters wouldn't have to switch out of the app to log how long something took.

this caused lots of pain 😭

> Group all the data together so we can export all the data into a spreadsheet, and send it to the main computer, preferably over Bluetooth.

This was actually way harder than I thought, not even with Bluetooth. (Suffering continued below)

## Act I, Curiosity

Since we were completely new the React Native, we didn't really know the common issues/painpoints, and didn't learn about Redux in time.

We wanted the state of each and every value. It would be incredibly tedious to pass down a prop down to each and every component that has some type of value.

We needed a few things:

* Be able to edit the fields (duh).
* Be able to reset the fields.
* Be able to import an existing match with it's data filling in the forms.
* Be responsive and fast

## Act II, Confusion

I ([PatheticMustan](https://github.com/PatheticMustan)) wanted to get all the values into one giant object.

After lots of confusion and testing, I eventually came up with a solution; having a globally defined object that would contain all the values. I'd then update the forms with these values. If we wanted to update a form, we could just modify the global object. Simple, right?

This approach would come with a few benefits:

* When we want to load an existing match, or clear everything, we can modify the values by changing the global object.
* Easy

## Act III, Pain

Actually, no. 
Apparently, [React doesn't update until the props/state change](https://www.w3schools.com/react/react_lifecycle.asp).

> The next phase in the lifecycle is when a component is updated. A component is updated whenever there is a change in the component's state or props.

Well, this sucks.

A quick, naïve solution, is to have setInterval update the props, just to re-render it.
It seemed to work fine on web, so I left it alone, and worked on timers, and the rest of the UI.

Since it was a pain to test on iOS, I was mainly testing the app on Web, and hoped it would look the same on iOS.

To test the app on iOS, we could

* use an emulator (Xcode)
* use [Snack](https://snack.expo.io/), which is Expo but online
* Rent a Mac to use Xcode??????
* Try to make a hackintosh to use Xcode
* Buy a Mac
* Install an Expo app

Installing the Expo app was pretty easy, just a trip to the local IT department, and an explanation of why we needed it.

Now we have everything right? Smooth sailing!

## Act IV, Suffering

Haha, nope! The app doesn't even start, bringing up angry red and gray error pages.

After days of more confusion AND pain, we found out it was because `<p>` and `<br>` worked on web, but not on iOS.
React Native felt pretty magical. Combining HTML, CSS, and JS into a native app, all without Xcode and Android Studio? It basically took care of everything.
In hindsight, it should have been incredibly obvious that web tags wouldn't work on non-web, but we trusted too much in the witchery that was React Native.

After actually running the app on iOS, we could immediately tell something was wrong.
The forms weren't quick and clean at all, and it actually limited how quickly you could type. If you typed too fast, it would rubber band back, and remove a few characters.

This issues comes from earlier, our "global state" object. Apparently constantly getting and setting the text from global scope isn't the most performant way of doing things. We were getting scrolling issues, and input issues.

To fix this, we temporarily sacrificed import/reset matches to the React Native gods, in favor of using setState.

Instead of grabbing from global, each component will have it's own state. When we update the state, the component updates. This has super cool benefits:

* fast
* no more lag
* that's it

Unfortunately, this meant it was also way harder to modify the fields. Now, everytime the state in the field changes, we update the global object. All our data is still in one place!

## Act V, Torment

Actually, that importing/resetting matches was really important. We really need to fix that.

For now, let's focus on how we're going to store the matches. Looking for a simple way to store JSON data, I found [AsyncStorage](https://docs.expo.io/versions/latest/react-native/asyncstorage/), which is like LocalStorage, but async. Very strange.

At this point, we were rushing to get the app finished. Whenever a match is changed/edited, we stringify the global object, and save it.
When we load the app, we can load the entire global object from storage. Very cool.

Staying up late enough to feel my eyeballs in my head, I finally came up with the idea of having a *current match ID*.

Using setState to keep track of values solves all the rendering problems, and the lag, but it becomes really hard to sync and set data.

Thinking carefully, we only need to change the state in a few instances.

* When we reset a match
* When we import a match

Either way, we're only changing data when we do a new match.
Our horrible, but working solution, is to have each component track the latest match they updated to.

* If the match ID is different (if we reset/import), global should be updating the state.
* If the match ID is the same, the state should be updating global.

With this, we have forms that don't rubberband, don't cause extreme lag, save, reset, import, and look cool.
Finally. Our torment is over.

## Act VI, Looking Back, Things we found useful

All of this pain could have been solved with something like [Redux](https://redux.js.org/). It pains me inside to see so much spaghetti depended upon. Since we have more years to work on this, I'll be able to clean up this huge pile of spaghetti.

We made the app look sorta presentable with lots of cool CSS. Really helpful things to know:

* [Border-Radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius): Gives containers round edges, very cool.
* [Margin vs Padding](https://stackoverflow.com/questions/5958699/difference-between-margin-and-padding): Margin is outside space, padding is inside space.
* [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/): Very important, basically aligning items left/center/right, top/center/bottom.
* [Just CSS in general](https://cssreference.io/)

React Native is huge, so learning can be challenging. Luckily, they have AWESOME documentaion, and tons of guides online. Here are some important guides:

* [React Native Core Concepts](https://reactnative.dev/docs/intro-react-native-components): Just read it.
* [React Native Fundamentals](https://reactnative.dev/docs/intro-react): Absolutely essential to starting RN.
* [Expo Docs](https://docs.expo.io/): Also essential

More important things to read:

* Make sure you properly learn how to use Git. Very important.
  * [Cannot do a partial commit during a merge](http://thomas-cokelaer.info/blog/2015/02/git-error-cannot-do-a-partial-commit-during-a-merge/): Fix for when you merge stuff wrong
  * [How to undo a checkout](https://stackoverflow.com/questions/3601911/how-do-i-undo-a-checkout-in-git)
  * [Git broken cuz self signed cert](https://confluence.atlassian.com/fishkb/unable-to-clone-git-repository-due-to-self-signed-certificate-376838977.html): We couldn't use git because the school network had weird certificates or something. This is only a temporary workaround, and not very safe. Make sure to disable this after you're done. 
  * [Oh Shit, Git!?!](https://ohshitgit.com/): Super helpful guide on undoing everything in git. God tier.

## Act VII, Looking Forward, Things we should have done

* Everytime we made a new thing, we just threw in a new component. It's really messy, and I'd like to have some more intuitive way for managing components.
* I'm extremely dissatisfied with how we managed CSS. It was all over the place. Maybe we should try having a global CSS, or use a library?
* We desperately need to refactor everything. The global state is horrible, and I'd like to replace it with [Redux](https://redux.js.org/). Redux would help avoid most of the pain of development.
* Lots of code is unused, I think a linter would be helpful in standardizing the style of the code, and prevent rookie mistakes.
* We should spend more time looking into scrolling, lists, and tabs. 
