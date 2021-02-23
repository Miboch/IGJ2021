import {Component, OnInit} from '@angular/core';
import {ToastOutletDirective} from '../../directives';

@Component({
  selector: 'igj-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [ToastOutletDirective]
})

export class PageComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
