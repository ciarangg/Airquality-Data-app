let finalListOfCities = []

let completeArrayOfObjects = []

let cleanArrayOfCitiesLatest = []

let cleanArrayOfCitiesMeasurements = []

let arrayOfCompoundIds = []

let outsideSelectedCompound = []

let outsideSelectedCity = []


fetch('https://api.openaq.org/v1/latest')
.then(response => response.json())
.then(response => response.results)
.then(response => manipulateLatestData(response))
.then(fetch('https://api.openaq.org/v1/measurements')
.then(response => response.json())
.then(response => response.results)
.then(response => manipulateMeasurementsData(response)))
.then(fetch('https://api.openaq.org/v1/parameters')
.then(response => response.json())
.then(response => response.results)
.then(response => compoundDataCompilationAndMenu(response)))
.then(() => cityDataCompilationAndMenu(cleanArrayOfCitiesLatest, cleanArrayOfCitiesMeasurements))
.then(() => webSite())

function manipulateLatestData(data) {


    for (i = 0; i < data.length; i++) {

        for (j=0; j < data[i].measurements.length; j++) {

        let improvedObject = {
            'city': data[i].city,
            'parameter': data[i].measurements[j].parameter ,
            'value': data[i].measurements[j].value,
            'unit': data[i].measurements[j].unit
        }

        completeArrayOfObjects.push(improvedObject)

        }

    }

    let arrayOfCitiesLatest = []

    for (i = 0; i < data.length; i++) {

        arrayOfCitiesLatest.push(data[i].city)
    }


    arrayOfCitiesLatest.sort()

    for (i = 0; i < arrayOfCitiesLatest.length; i++) {
        
        if(arrayOfCitiesLatest[i] !== arrayOfCitiesLatest[i-1]) {

            cleanArrayOfCitiesLatest.push(arrayOfCitiesLatest[i])
        }
    }

}    

function manipulateMeasurementsData(data) {


    for (i = 0; i < data.length; i++) {

        let improvedObject = {
            'city': data[i].city,
            'parameter': data[i].parameter ,
            'value': data[i].value,
            'unit': data[i].unit
        }

        completeArrayOfObjects.push(improvedObject)

    }

    let arrayOfCitiesMeasurements = []


    for (i = 0; i < data.length; i++) {

        arrayOfCitiesMeasurements.push(data[i].city)

    }

    arrayOfCitiesMeasurements.sort()

    for (i = 0; i < arrayOfCitiesMeasurements.length; i++) {
        
        if(arrayOfCitiesMeasurements[i] !== arrayOfCitiesMeasurements[i-1]) {

            cleanArrayOfCitiesMeasurements.push(arrayOfCitiesMeasurements[i])   

        }
    }
}

function compoundDataCompilationAndMenu(data) {

    for (i = 0; i < data.length; i++) {

        let menu = document.getElementById('compounds')
        let option = document.createElement('option')
        option.innerHTML = data[i].description
        option.value = data[i].id
        option.id = data[i].id
        menu.appendChild(option)

        arrayOfCompoundIds.push(data[i].id)  
    }
    
}

function cityDataCompilationAndMenu(latestArray, measurementsArray) {

    let allTheFuckingCities = []

    for (i = 0; i < latestArray.length; i++) {
        allTheFuckingCities.push(latestArray[i])
    }

    for (i = 0; i < measurementsArray.length; i++) {
        allTheFuckingCities.push(measurementsArray[i])
    }

    allTheFuckingCities.sort()

    for (i = 0; i < allTheFuckingCities.length; i++) {
        
        if(allTheFuckingCities[i] !== allTheFuckingCities[i-1]) {
            finalListOfCities.push(allTheFuckingCities[i])
        }
    }

    function dropDownMenuCities(array) {

        for (i = 0; i < array.length; i++) {

            let menu = document.getElementById('cities')
            let option = document.createElement('option')
            option.innerHTML = array[i]
            option.value = array[i]
            menu.appendChild(option)

        }
        
    }

    dropDownMenuCities(finalListOfCities)

}

function changeEventHandlerCompounds(event) {

    let selectedCompound = []

    selectedCompound.push(event.target.value)
    
    selectedCompound = selectedCompound.pop()

    outsideSelectedCompound = selectedCompound

}

function changeEventHandlerCities(event) {

    let selectedCity = []
    
    selectedCity.push(event.target.value)
   
    selectedCity = selectedCity.pop()

    outsideSelectedCity = selectedCity

}

function webSite() {

    document.querySelector('#compounds').addEventListener('change', changeEventHandlerCompounds)
        
    document.querySelector('#cities').addEventListener('change', changeEventHandlerCities)
    

    let submitButton = document.getElementById('submitButton')

    submitButton.addEventListener('click', function(event){

        let littleBoxWithInfo = document.getElementById('pa')

        event.preventDefault()

        let sumOfValues = 0

        let arrayOfValues = []

        let amountOfValues = 0

        let averageOfValues = 0

        for (i = 0; i < completeArrayOfObjects.length; i++) {

            if (outsideSelectedCity === completeArrayOfObjects[i].city && outsideSelectedCompound === completeArrayOfObjects[i].parameter) {
                
                sumOfValues += completeArrayOfObjects[i].value
                amountOfValues++

            }
        }

        averageOfValues = sumOfValues/amountOfValues

        littleBoxWithInfo.innerHTML = averageOfValues + 'µg/m³'

    })
}




