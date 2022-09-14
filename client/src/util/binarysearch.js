export const binarySearch = (array, value, comparisonFunction) => {
    let start = 0;
    let middle;
    let end = array.length;

    let ans = [false, 0];

    if( end == 0 ) {
        return ans;
    }

    while(true) {
        middle = Math.floor( (start+end) / 2 );

        if( start == end ) {

            if( comparisonFunction(array[middle], value) == 0 ) {
                ans[0] = true;
            }
            ans[1] = middle;
            return ans;
        }


        if( comparisonFunction(array[middle], value) == -1 ) {
            start = middle + 1;
        }
        else {
            end = middle;
        }
    }
}

// let a = [1,2,5,9,11,16];

// function cmpInt(a,b) {
//     if( a < b ) {
//         return -1;
//     }
//     else if ( a == b ) {
//         return 0;
//     }
//     return 1;
// }

// console.log(binarySearch(a, 16, cmpInt));