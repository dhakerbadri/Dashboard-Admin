import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  numbers: number[] = [1, 2, 3, 4, 5];
   rangeFilter(numbers:any, min:number, max:number) {
    var filteredNumbers = [];

    for (var i = 0; i < numbers.length; i++) {
      var number = numbers[i];

      if (number >= min && number <= max) {
        filteredNumbers.push(number);
      };
    }

    return filteredNumbers;
  };


}
