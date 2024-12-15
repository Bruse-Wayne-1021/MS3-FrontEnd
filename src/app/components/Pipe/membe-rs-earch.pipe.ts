import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'membeRsEARCH'
})
export class MembeRsEARCHPipe implements PipeTransform {

  transform(value: any[], memberSearchText: string): any[] {
    if (!memberSearchText) {
      return value;
    }

    const lowerCaseSearchText = memberSearchText.toLowerCase();

    return value.filter(a =>
      a.firstName.toLowerCase().includes(lowerCaseSearchText) ||
      a.lastName.toLowerCase().includes(lowerCaseSearchText) ||
      a.nic?.toLowerCase().includes(lowerCaseSearchText) ||
      a.email.toLowerCase().includes(lowerCaseSearchText)
    );
  }

}
