# Table of Contents

1. [Requirements](#requirements)
2. [Project Description](#project-description)
   - [Running the app](#running)
3. [Features Implemented](#features-implemented)
4. [Challenges](#challenges)
5. [What I would do differently if I had more time](#differently)
6. [Bugs I found (or questions that I have)](#assignment_issues)

<a name="requirements"></a>   
# Requirements

The assignment can be found on this [Google Doc](https://docs.google.com/document/d/1lhI8fJkxT-gVQZHte_CaPfgp5yaJv1pKerzr7eh62g8/edit)

<a name="project-description"></a>   
# Project Description

This is a fully working MVP, delivering the above requirements. Given the little time that I could spend on it, however, I would still consider it a WIP. 

Time spent so far: ~7h

<a name="running"></a>   
## Running the app

In order to start the app, please do the following:
- install dependencies

```
npm install
```
- run the app
```
npm run start
```

- see the app running at: `http://localhost:3000/app?hash=j2308jq`. `hash` is dynamic, so it can take other IDs as well.

<a name="features-implemented"></a>   
# Features implemented

_WIP_

For each type of node present in the JSON file, I made the following work:

1. Text elements
2. Image elements
3. Button elements

They all have most of the corresponding styles applied and follow a structure different from the one in the provided example. Each element lives in its own HTML element, instead of having multiple parents for different purposes (positioning, scaling, rotating etc).

<a name="challenges"></a>   
# Challenges

_WIP_

Time was the worst challenge. :<

<a name="differently"></a>   
# What I would do differently if I had more time

_WIP_

1. Reuse some of the functions for getting the styles for every single type of element, but currently the types don't allow it. For instance, we could use the same function for setting font styles (family, size, weight etc), same function for setting background etc.

1. Handle empty properties. For instance, if an expected property is missing from the json, we get this, with multiple semicolons: 
```
width: 99.71522275116348px; height: 94.75px;;
```

1. Rework the html generation logic so we can make use of recursive functions.

1. Testing. Hopefully I can do that this weekend.

<a name="assignment_issues"></a>   
# Bugs I found (or questions that I have)

These are some of the issues I found when developing the app. They were related to the typescript file that was provided.

1. main parent has no scale in the json file. However, in the generated html, we get width/height and scale. where does that 3x scale come from? That's the main difference between expected result and my result.

1. scolor does not exist for some elements
