# Table of Contents

1. [Requirements](#requirements)
2. [Project Description](#project-description)
   - [Running the app](#running)
   - [Testing the app](#testing)
3. [Features Implemented](#features-implemented)
4. [Challenges](#challenges)
5. [What I would do differently if I had more time](#differently)
6. [Bugs I found (or questions that I have)](#assignment_issues)

<a name="requirements"></a>   
# Requirements

The assignment can be found on this [Google Doc](https://docs.google.com/document/d/1lhI8fJkxT-gVQZHte_CaPfgp5yaJv1pKerzr7eh62g8/edit)

<a name="project-description"></a>   
# Project Description

This is a fully working MVP, delivering the above requirements. This is how it works:
- it starts an Express server
- the client hits `localhost:3000/app?hash=j2308jq` (hash is dynamic)
- the Express server returns a server-rendered React app (`server.ts:19`) with the json corresponding to the sent hash converted into a working react app
- user is happy

Inside of the `/app` Express controller, we:
- fetch the json from a constant URL (set through environment variables)
- render the needed react application, by having the json definition sent as a prop. Inside of that component, we go through the definition and we first construct HTML elements which are then converted into JSX (`html.helpers.ts: 156`) that is rendered inside of the `Index.tsx` file.
- send the render to the client.

The app was developed keeping in mind functional programming and separation of concerns. Tried to have everything as clean as possible. There are a couple of places where code might be repeated, but more on that below.

Time spent so far: ~9h

<a name="running"></a>   
## Running the app

In order to start the app, please do the following:
- install dependencies:
```
npm install
```
- run the app:
```
npm run start
```
- see the app running at: `http://localhost:3000/app?hash=j2308jq`. `hash` is dynamic, so it can take other IDs as well.

<a name="testing"></a>   
## Testing the app

```
npm test
```

For now, there are a couple of unit tests testing the most basic functions used to generate styles.

<a name="features-implemented"></a>   
# Features implemented

For each type of node present in the JSON file, we have the following working:

1. Text elements
2. Image elements
3. Button elements

They all have most of the corresponding styles applied and follow a structure different from the one in the provided example. Each element lives in its own element, instead of having multiple parents for different purposes (positioning, scaling, rotating etc).

<a name="challenges"></a>   
# Challenges

- The provided typescript interfaces were not really matching the proposed json. It would have been a bit easier if they could be used properly. Instead, I had to cast to `any` every now and then and I couldn't be sure whether a property would exist for an object or not. This in turn generated errors and made me not reuse some of the functions
- Not really a challenge, but I sometimes I had to spend some more time understanding where some properties could be found in the JSON schema. For instance, the scaling of the main parent.
- Other small things/errors that were not allowing my code to be built, but nothing major.
- Time, my worst challenge :)

<a name="differently"></a>   
# What I would do differently if I had more time

1. Reuse some of the functions for getting the styles for every single type of element, but currently the types don't allow it. For instance, we could use the same function for setting font styles (family, size, weight etc), same function for setting background etc.

1. Handle empty properties. For instance, if an expected property is missing from the json, we can get this, with multiple semicolons: `width: 99.71522275116348px; height: 94.75px;;`

1. Set up linting and formatting. For now I only used my own IDE formatter.

1. Rework the html generation logic so we can make use of recursive functions. I'm not entirely sure if my solution works well for more complex JSON schemas, as I didn't fully understand how and when `children` are used.

1. Add more testing. Currently I even avoided testing more specific/corner-case scenarios because I knew they would not be working.

1. Few more things, as can be seen in my multiple TODO comments

1. Depending on necessity, maybe even implement semantic versioning

<a name="assignment_issues"></a>   
# Bugs I found (or questions that I have)

These are some of the issues I found when developing the app. They were related to the typescript file that was provided. Mentioning 2 here, although I added more comments in my code in various places where I noticed an issue.

1. main parent has no scale in the json file. However, in the generated html, we get width/height and scale. where does that 3x scale come from? That's the main difference between expected result and my result.

1. scolor does not exist for some elements