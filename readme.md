# Store category list example buil with Stencil
This is just a try and fail project to see how stencil works, dont expect rocket science here.

Project was built on Node v.14 not tested on lower versions :) 
To run project install dependencies `npm run i`
Run project from root dir `npm start`

# Product list filtering by params
In order to filter items use product property and add value You expet item should have.
Example: `?internalMemoryGB=512`

# Running tests
So far I don't know how to run tests with fetching data, so mocking and making data into a variable is required.
To run test suits use commented data on these components `category-landing` & `product-list`
Flow:
 - comment the lines containing async code where data is fetched
 - uncomment the `data` variable with static data
```
 NOTE! just do the oposite after tests are passed
```

 Definately will work on this later... :)