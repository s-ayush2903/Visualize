export function animate(array) {
  const animatees = [];   //to fill in all the values/bars that are to be animated
  if (array.length <= 1) return array;
  const tempArr = array.slice();
  differentiate(array, 0, array.length - 1, tempArr, animatees);
  return animatees;
}


/* To break array in two equal halves until reach unity (basically to generate logarithmic complexity) */
function differentiate(array, initial, final, tempArr, animatees) {
  if (initial === final) return;
  const middleIdx = Math.floor((initial + final) / 2);
  differentiate(tempArr, initial, middleIdx, array, animatees);
  differentiate(tempArr, middleIdx + 1, final, array, animatees);
  mergeSort(array, initial, middleIdx, final, tempArr, animatees);
}


function mergeSort(array, initial, mid, final, tempArr, animations) {
  let e = initial;  
  let i = initial;  /** first index of @param array */
  let m = mid + 1;
  while (i <= mid && m <= final) {
    animations.push([i, m]);    //change color while comparing
    animations.push([i, m]);   //undo color change now

    if (tempArr[i] <= tempArr[m]) {  
      animations.push([e, tempArr[i]]); //overwrite the value at eth index of main_array with ith index of temp_array
      array[e++] = tempArr[i++];
    } else {
      animations.push([e, tempArr[m]]);
      array[e++] = tempArr[m++];
    }
  }

  //above loop will terminate when it'll run out of either i or m, so to cover those edge cases
  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([e, tempArr[i]]);
    array[e++] = tempArr[i++];
  }

  while (m <= final) {
    animations.push([m, m]);
    animations.push([m, m]);
    animations.push([e, tempArr[m]]);
    array[e++] = tempArr[m++];
  }

}
