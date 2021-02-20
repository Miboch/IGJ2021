import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HoverMenuModel} from '../../models/hover-menu.model';
import {Router} from '@angular/router';

@Component({
  selector: 'igj-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})

export class DropdownMenuComponent implements OnInit {
  actions: HoverMenuModel[];
  isSignedIn = false;
  username = "AccordingToBo";
  @ViewChild('choice') choiceElement!: ElementRef<HTMLElement>

  constructor(private router: Router) {
    this.actions = [
      {
        actionText: 'Show Feedback',
        callbackAction: () => {
          this.goToFeedback();
        }
      },
      {
        actionText: 'Show Feedback',
        callbackAction: () => {
          this.goToFeedback();
        }
      },
      {
        actionText: 'Show Feedback',
        callbackAction: () => {
          this.goToFeedback();
        }
      }
    ]
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.choiceElement?.nativeElement?.getBoundingClientRect())
    }, 1000)
  }

  goToFeedback() {
    this.router.navigate(["/feedback"]);
  }

  itemIsClicked(clickedItem: HoverMenuModel) {
    clickedItem.callbackAction();
  }

}
