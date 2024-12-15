import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gellery'
})
export class GelleryPipe implements PipeTransform {
  transform(value: any[], searchText: string): any[] {
    if (!searchText) {
      return value; // Return all books if search text is empty
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    return value.filter(book => {
      const bookName = book.name?.toLowerCase() || '';
      const authorName = book.author?.name?.toLowerCase() || '';
      const bookGenre = book.genre?.toLowerCase() || '';

      return (
        bookName.includes(lowerCaseSearchText) ||
        authorName.includes(lowerCaseSearchText) ||
        bookGenre.includes(lowerCaseSearchText)
      );
    });
  }
}
