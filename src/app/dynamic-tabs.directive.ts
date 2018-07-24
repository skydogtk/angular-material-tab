import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicTabs]'
})
export class DynamicTabsDirective {

  constructor(public viewContainer: ViewContainerRef) {}

}
