# Cars Database API

## About the API
This API provides access to a car database. It allows users to make HTTP GET requests to fetch a list of cars from the years 2004 to 2020.

## How to use the API

**Note: The "year" parameter is required in the URL, while "make" and "model" are optional.**


1. Send a GET request to the following URL: https://kf-car-db.web.app/car/{year}

    Replace `{year}` with the desired year, e.g., 2016.
    
    Example URL: `https://kf-car-db.web.app/car/2016`
    
    This URL will retrieve all the cars from the year 2016:

```
[
    {
        "Year": 2016,
        "Make": "Toyota",
        "Model": "4Runner"
    },
    {
        "Year": 2016,
        "Make": "Hyundai",
        "Model": "Sonata Hybrid"
    },
    {
        "Year": 2016,
        "Make": "Ram",
        "Model": "1500 Crew Cab"
    }
]
```
2. To filter by make, add the "make" parameter (uppercase) to the URL: https://kf-car-db.web.app/car/{year}?make={make}

    Replace {year} with the desired year and {make} with the desired car make.
    
    Example URL: https://kf-car-db.web.app/car/2016?make=Ford
    
    This URL will retrieve all the cars from the year 2016 with the make "Ford":
```
[
    {
        "Year": 2016,
        "Make": "Ford",
        "Model": "Taurus"
    },
    {
        "Year": 2016,
        "Make": "Ford",
        "Model": "Transit 250 Van"
    },
    {
        "Year": 2016,
        "Make": "Ford",
        "Model": "C-MAX Hybrid"
    }
]
```

3. To filter by both make and model, add the "model" parameter (including spacing and uppercase letters) to the URL: https://kf-car-db.web.app/car/{year}?make={make}&model={model}

    Replace {year} with the desired year, {make} with the desired car make, and {model} with the desired car model.

    Example URL: https://kf-car-db.web.app/car/2016?make=Ford&model=Taurus
    
    This URL will retrieve the car from the year 2016 with the make "Ford" and the model "Taurus":

```
[
    {
        "Year": 2016,
        "Make": "Ford",
        "Model": "Taurus"
    }
]
```

Feel free to adjust the URLs based on your specific needs and configuration.




