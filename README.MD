# ng-circle-progress-day-countdown
* Fork from [bootsoon/ng-circle-progress](https://github.com/bootsoon/ng-circle-progress)

## Demo

| | |
--- | --- | ---
![screenshot_20180613-141150_fixture russia 2018](https://user-images.githubusercontent.com/14917667/50729185-5d122880-1114-11e9-8597-090088a7918c.jpg) | ![screenshot_20180613-141930_fixture russia 2018](https://user-images.githubusercontent.com/14917667/50729186-5d122880-1114-11e9-84ff-3ddb6a10ee96.jpg) | ![screenshot_20180803-173749_fixture russia 2018](https://user-images.githubusercontent.com/14917667/50729187-5d122880-1114-11e9-90f5-1bce8756cdd7.jpg)

## About

It is a simple circle day progress component created for Angular 4 based only on SVG graphics and has various of options to customize it.

## Installation

To install this library, run:

```bash
$ npm i ng-circle-progress-day-countdown
```

Once you have installed it, you can import it in any Angular application,

then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import ng-circle-progress-day-countdown
import { NgCircleProgressModule } from 'ng-circle-progress-day-countdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      ...
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once NgCircleProgressModule is imported, you can use CircleProgressComponent in your Angular application:

```xml
<!-- You can now use it in app.component.html -->
<circle-progress
  [endDate]="endDate"
  [initDate]="initDate"
  [radius]="100"
  [outerStrokeWidth]="16"
  [innerStrokeWidth]="8"
  [outerStrokeColor]="'#78C000'"
  [innerStrokeColor]="'#C7E596'"
  [animation]="true"
  [animationDuration]="300"
></circle-progress>

```

## Options

Option | Type | Default | Description
--- | --- | --- | ---
radius | `number` | `90` | Radius of circle
clockwise | `boolean` | `true` | Whether to rotate clockwise or counter-clockwise
showBackground | `boolean` | `true` | Whether to display background circle
showInnerStroke | `boolean` | `true` | Whether to display inner stroke
backgroundStroke | `string` | `'transparent'` | Background stroke color
backgroundStrokeWidth | `number` | `0` | Stroke width of background circle
backgroundPadding | `number` | `5` | Padding of background circle
backgroundColor | `string` | `'transparent'` | Background color
backgroundOpacity | `number` | `1` | Opacity of background color
space | `number` | `4` | Space between outer circle and inner circle
toFixed | `number` | `0` | Using fixed digital notation in Title
renderOnClick | `boolean` | `true` | Render when component is clicked
unitsColor | `string` | `'#444444'` | Font color of 'day', 'hour', etc. strings
outerStrokeWidth | `number` | `8` | Stroke width of outer circle (progress circle)
outerStrokeColor | `sting` | `'#78C000'` | Stroke color of outer circle
outerStrokeLinecap | `sting` | `'round'` | Stroke linecap of outer circle. Possible values(butt, round, square, inherit)
innerStrokeWidth | `number` | `4` | Stroke width of inner circle
innerStrokeColor | `sting` | `'#C7E596'` | Stroke color of inner circle
titleColor | `string` | `'#444444'` | Font color of 'day', 'hour', etc. values
titleFontSize | `string` | `'20'` | Font size of 'day', 'hour', etc. values
subtitleFontSize | `string` | `'10'` | Font size of 'day', 'hour', etc. strings
animation | `boolean` | `true` | Whether to animate the outer circle when rendering
animateTitle | `boolean` | `true` | Whether to animate the title when rendering
animationDuration | `number` | `500` | Duration of animation in microseconds
class | `string` | `''` | CSS class name for SVG element
initDate | `Date` | `new Date ('04/15/2018 10:0 AM')` | Init date of the percent
endDate| `Date` | `new Date ('08/14/2021 10:0 AM')` | End date of the percent
stringColor| `string` | `'#A9A9A9'` | Font color of 'day', 'hour', etc. strings
daysHoursFontSize| `string` | `'20'` | Font size of the first line
minutesSecondsFontSize| `string` | `'15'` | Font size of the second line
showContent | `boolean` | `true` | Display or not the remaining days
days| `string` | `'days'` | Day string value
hours| `string` | `'hours'` | Hours string value
minutes| `string` | `'min'` | Minutes string value
seconds| `string` | `'sec'` | Seconds string value
daysInitialXY| `Array<number>` | [68, 125] | First value represent position in `X` axis and second represent `Y` axis of remaining days value
hoursInitialXY| `Array<number>` | [90, 125] | First value represent position in `X` axis and second represent `Y` axis of remaining hours value
minutesSecondsInitialXY| `Array<number>` | [85, 155] | First value represent position in `X` axis and second represent `Y` axis of remaining minutes and seconds value


Event: `onCompletedTime` triggered on 0 days, 0 hours, 0 minutes, 0 seconds remaining

```xml
<!-- You can now use it in app.component.html -->
<circle-progress
  [endDate]="endDate"
  [initDate]="initDate"
  [radius]="100"
  [outerStrokeWidth]="16"
  ...
  (onCompletedTime)="completedTimeEventHandler($event)"
></circle-progress>

```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [bootsoon](mailto:bootsoon@aliyun.com)

This project was generated by [Yeoman generator angular2-library](https://github.com/jvandemo/generator-angular2-library)
