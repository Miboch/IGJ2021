import {GameComponent} from './routed/game/game.component';
import {TestPageComponent} from './routed/test-page/test-page.component';

import {FeedbackFormComponent} from './feedback-form/feedback-form.component';
import {FormTypeSelectorComponent} from './form-type-selector/form-type-selector.component';
import {IconDecoratorComponent} from './icon-decorator/icon-decorator.component';
import {MenuComponent} from './menu/menu.component';
import {OverlayPanelComponent} from './overlay-panel/overlay-panel.component';
import {RatingComponent} from './rating/rating.component';
import {StarComponent} from './star/star.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

export const components = [
  FeedbackFormComponent,
  FormTypeSelectorComponent,
  IconDecoratorComponent,
  MenuComponent,
  OverlayPanelComponent,
  RatingComponent,
  StarComponent,
  ToolbarComponent,
];

export const routedComponents = [
  GameComponent,
  TestPageComponent
];

export * from './feedback-form/feedback-form.component';
export * from './form-type-selector/form-type-selector.component';
export * from './icon-decorator/icon-decorator.component';
export * from './menu/menu.component';
export * from './overlay-panel/overlay-panel.component';
export * from './rating/rating.component';
export * from './star/star.component';
export * from './toolbar/toolbar.component';

export * from './routed/game/game.component';
export * from './routed/test-page/test-page.component';
