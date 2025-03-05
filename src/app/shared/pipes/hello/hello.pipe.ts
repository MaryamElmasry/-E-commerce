import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hello'
})
export class HelloPipe implements PipeTransform {

  transform(value: string,num:number): string {
    return `hello ${value} and ${num} `;
  }

}
