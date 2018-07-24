import { AfterContentInit, Component, ComponentFactoryResolver, ContentChildren} from '@angular/core';
import { QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicTabsDirective } from '../dynamic-tabs.directive';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
  dynamicTabs: TabComponent[] = [];

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  // @ViewChild(DynamicTabsDirective)
  // dynamicTabPlaceholder: DynamicTabsDirective;

  // viewContainerRef: ViewContainerRef;
  // @ViewChild(DynamicTabsDirective)
  // set setViewContainerRef(dynamicTabPlaceholder: DynamicTabsDirective) {
  //   this.viewContainerRef = dynamicTabPlaceholder.viewContainer;
  // }

  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;
  // @ViewChild('container') dynamicTabPlaceholder: DynamicTabsDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  openTab(title: string, template, data, isCloseable = false) {
    // get a component factory for our TabComponent
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);

    // fetch the view container reference from our anchor directive
    // const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // alternatively...
    const viewContainerRef = this.dynamicTabPlaceholder;

    // create a component instance
    const componentRef = viewContainerRef.createComponent(componentFactory);
    // const componentRef = this.viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    // remember the dynamic component for rendering the
    // tab navigation headers
    this.dynamicTabs.push(componentRef.instance as TabComponent);

    // set it active
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  selectTab(selectedTab: TabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    this.dynamicTabs.forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    selectedTab.active = true;
  }

  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i, 1);

        // destroy our dynamically created component again
        // const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        const viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);
        // this.viewContainerRef.remove(i);

        // set tab index to 1st one
        this.selectTab(this.tabs.first);
        break;
      }
    }
  }

  closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter((tab) => tab.active);
    if (activeTabs.length > 0)  {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }
}
