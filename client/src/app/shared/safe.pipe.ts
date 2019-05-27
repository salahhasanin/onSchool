import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
constructor(private sanitizer: DomSanitizer){}
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
