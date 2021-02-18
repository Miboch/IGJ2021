import {
  Component,
  ContentChild,
  ElementRef,
  HostListener, Input, OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef, ViewChild
} from '@angular/core';
import {OverlayPanelHeaderDirective} from '../../directives';
import {slideAnimation} from '../../animations/slide.animation';
import {Subject, Subscription} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'igj-overlay-panel',
  templateUrl: './overlay-panel.component.html',
  styleUrls: ['./overlay-panel.component.scss'],
  animations: [slideAnimation]
})

export class OverlayPanelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() panelCloseSubject: Subject<boolean>;
  @ContentChild(OverlayPanelHeaderDirective, {read: TemplateRef}) headerTemplate!: TemplateRef<any>;
  @ViewChild('overlayTray', {static: false}) trayReference!: ElementRef
  panelCloseSubscription!: Subscription;
  showPanelState: boolean;
  showOverlay: boolean;

  @HostListener('window:keydown.escape')
  @HostListener('window:mousedown', ['$event'])
  closePanel(event: MouseEvent | undefined) {
    if (!this.showPanelState) {
      return;
    }
    if (event instanceof MouseEvent) {
      let element = <HTMLElement>event.target;
      if (!this.clickedOutsidePanel(element))
        return;
    }
    this.panelClose();
  }

  constructor() {
    this.panelCloseSubject = new Subject<boolean>();
    this.showPanelState = false;
    this.showOverlay = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('panelCloseSubject' in changes) {
      this.resubscribe()
    }
  }

  ngOnDestroy() {
    this.panelCloseSubscription.unsubscribe();
  }

  resubscribe() {
    this.panelCloseSubscription?.unsubscribe();
    this.panelCloseSubscription = this.panelCloseSubject.pipe(
      tap(shouldClose => {
        this.showPanelState = !shouldClose;
      }),
      delay(300)
    ).subscribe(shouldClose => {
      this.showOverlay = !shouldClose;
    });
  }

  panelClose() {
    this.panelCloseSubject.next(true);
  }

  private clickedOutsidePanel(element: HTMLElement): boolean {
    return element === this.trayReference?.nativeElement;
  }
}
