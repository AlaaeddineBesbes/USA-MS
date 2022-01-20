// maj +f5


/* ===========================
        MAP UTILS
============================*/

/**
 * Determine a value number for the total killed
 * in order to color the map
 * @param {*} value number of killed
 */
function reducevalue(value) {

    if (value <= 50) {
        value = 0;
    } else if (value <= 100) {
        value = 1;
    } else if (value <= 150) {
        value = 2;
    } else {
        value = 3;
    }
    return value
}


/**
 * Get all data refering to a State
 * @param {*} state 
 * @param {*} data 
 */
function getStateData(state, data) {

    let ret = [];
    let local = JSON.parse(JSON.stringify(data));   // deep copy of JSON array
    local.forEach(function (d) {
        if (d.State == state) {
            ret.push(d);
        }
    });
    return ret;
}



/* ===========================
        BAR UTILS
============================*/

/**
 * Tells if a number is between two values
 * @param {*} a 
 * @param {*} b 
 * @param {*} value 
 */
function isBetween(a, b, value) {

    let min = Math.min(a, b);
    let max = Math.max(a, b);
    return value ? this >= min && this <= max : this > min && this < max;
}


function countBarOccurences(categories, data) {

    let local = JSON.parse(JSON.stringify(data));
    let localCat = JSON.parse(JSON.stringify(categories));

    local.forEach(function (d) {
        localCat.forEach(function (c) {
            if (isBetween (c.sub[0], c.sub[1], d.Average_Shooter_Age)) {
                c.count += 1;
            }
        });
    });
    return localCat;
}


/**
 * Return labels of the chart
 * @param {*} categories 
 */
function getLabels(categories) {
    let labels = [];
    categories.forEach(function (c) {
        labels.push(c.label);
    })
    return labels;
}


/**
 * 
 */
