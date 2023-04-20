import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {TabComponent} from "../tab/tab.component";

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();
  // another way to get the tabs
  // @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;


  ngOnInit() {
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs?.filter(
      tab => tab.active
    )

    if (activeTabs && activeTabs.length === 0) {
      this.selectActiveTab(this.tabs!.first);
    }

  }

  selectActiveTab(tab: TabComponent) {
    this.tabs?.forEach(tab => tab.active = false);
    tab.active = true;

    return false; // prevent the default link behavior
  }
}
