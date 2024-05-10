1. main parent has no scale in the json file. However, in the generated html, we get width/height and scale. where does that 3x scale come from? That's the main difference between expected result and my result.
1. ideally we should use the same functions for getting the styles for every single type of element, but the types don't allow it.

1. example.json mistakes, for instance: scolor does not exist in types, 

example of fuckup

        width: 99.71522275116348px; height: 94.75px;; 
