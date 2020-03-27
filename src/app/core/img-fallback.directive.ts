import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]'
})
export class ImgFallbackDirective {

  @Input() appImgFallback: string;

  constructor(private eRef: ElementRef) {
  }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = this.eRef.nativeElement;
    element.src = this.appImgFallback || 'https://via.placeholder.com/160';
  }

}
