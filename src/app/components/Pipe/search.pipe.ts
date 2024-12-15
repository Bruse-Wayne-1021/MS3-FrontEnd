import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBook'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], searchText: string): any[] {
    if (!searchText) {
      return value;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    return value.filter(a =>
      a.name.toLowerCase().includes(lowerCaseSearchText) ||
      a.bookGenre?.toLowerCase().includes(lowerCaseSearchText) ||
      a.author?.name?.toLowerCase().includes(lowerCaseSearchText) ||
      a.typeOfLanguage?.toLowerCase().includes(lowerCaseSearchText) ||
      a.publisher?.name?.toLowerCase().includes(lowerCaseSearchText)
    );
  }
}
