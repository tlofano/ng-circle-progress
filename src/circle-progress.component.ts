import { Component, ViewChild, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

export interface CircleProgressOptionsInterface {
  class?: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  backgroundStroke?: string;
  backgroundStrokeWidth?: number;
  backgroundPadding?: number;
  percent?: number;
  radius?: number;
  space?: number;
  toFixed?: number;
  maxPercent?: number;
  renderOnClick?: boolean;
  outerStrokeWidth?: number;
  outerStrokeColor?: string;
  outerStrokeLinecap?: string;
  innerStrokeColor?: string;
  innerStrokeWidth?: number;
  titleFormat?: Function;
  title?: string|Array<String>;
  titleColor?: string;
  daysHoursFontSize?: string;
  minutesSecondsFontSize?: string;
  animation?: boolean;
  animateTitle?: boolean;
  animateSubtitle?: boolean;
  animationDuration?: number;
  showContent?: boolean;
  showBackground?: boolean;
  showInnerStroke?: boolean;
  clockwise?: boolean;
  endDate?: Date;
  initDate?: Date;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  stringColor?: string;
  daysInitialXY?:Array<number>;
  hoursInitialXY?:Array<number>;
  minutesSecondsInitialXY?:Array<number>;
}

export class CircleProgressOptions implements CircleProgressOptionsInterface {
  class = '';
  backgroundColor = 'transparent';
  backgroundOpacity = 1;
  backgroundStroke = 'transparent';
  backgroundStrokeWidth = 0;
  backgroundPadding = 5;
  percent = 0;
  radius = 90;
  space = 4;
  toFixed = 0;
  maxPercent = 1000;
  renderOnClick = true;
  outerStrokeWidth = 8;
  outerStrokeColor = '#78C000';
  outerStrokeLinecap = 'round';
  innerStrokeColor = '#C7E596';
  innerStrokeWidth = 4;
  titleFormat = undefined;
  title: string|Array<String> = 'auto';
  titleColor = '#444444';
  daysHoursFontSize = '20';
  minutesSecondsFontSize =  '15';
  animation = true;
  animateTitle = true;
  animateSubtitle = false;
  animationDuration = 500;
  showContent= true;
  showBackground = true;
  showInnerStroke = true;
  clockwise = true;
  endDate = new Date('08/14/2030 10:0 AM');
  initDate = new Date('04/15/2018 10:0 AM');
  days = "days";
  hours = "hours";
  minutes = "min";
  seconds = "sec";
  stringColor = '#e6ea00';
  daysInitialXY = [68, 125];
  hoursInitialXY = [90, 125];
  minutesSecondsInitialXY = [85, 155];
}

@Component({
  selector: 'circle-progress',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" *ngIf="svg"
      [attr.height]="svg.height" [attr.width]="svg.width" (click)="emitClickEvent($event)" [attr.class]="options.class">
      <circle *ngIf="options.showBackground"
        [attr.cx]="svg.backgroundCircle.cx"
        [attr.cy]="svg.backgroundCircle.cy"
        [attr.r]="svg.backgroundCircle.r"
        [attr.fill]="svg.backgroundCircle.fill"
        [attr.fill-opacity]="svg.backgroundCircle.fillOpacity"
        [attr.stroke]="'#000000'"
        [attr.stroke-opacity]=0.3
        [attr.stroke-width]="svg.backgroundCircle.strokeWidth"/>
      <circle *ngIf="options.showInnerStroke"
        [attr.cx]="svg.circle.cx"
        [attr.cy]="svg.circle.cy"
        [attr.r]="svg.circle.r"
        [attr.fill]="svg.circle.fill"
        [attr.stroke]="svg.circle.stroke"
        [attr.stroke-width]="svg.circle.strokeWidth"/>
      <path
        [attr.d]="svg.path.d"
        [attr.stroke]="svg.path.stroke"
        [attr.stroke-width]="svg.path.strokeWidth"
        [attr.stroke-linecap]="svg.path.strokeLinecap"
        [attr.fill]="svg.path.fill"/>
      <text *ngIf="options.showContent"
        alignment-baseline="baseline"
        [attr.x]="svg.circle.cx"
        [attr.y]="svg.circle.cy"
        >
       <ng-container *ngIf="options.showContent && this.daysReaming > 0">
         <tspan *ngFor="let tspan of svg.title.tspans"
           [attr.x]=this.options.daysInitialXY[0]
           [attr.y]=this.options.daysInitialXY[1]
           [attr.dy]="tspan.dy"
           [attr.font-size]="svg.title.daysHoursFontSize"
           [attr.fill]="svg.title.color">
             {{this.daysReaming}}<tspan [attr.font-size]="svg.subtitle.daysHoursFontSize"
               [attr.fill]="svg.title.color"> {{this.options.days}}</tspan>
             {{this.hoursReaming}}<tspan [attr.font-size]="svg.subtitle.daysHoursFontSize"
               [attr.fill]="svg.title.color"> {{this.options.hours}}</tspan>
           </tspan>
           <tspan *ngFor="let tspan of svg.title.tspans"
             [attr.x]=this.options.minutesSecondsInitialXY[0]
             [attr.y]=this.options.minutesSecondsInitialXY[1]
             [attr.dy]="tspan.dy"
             [attr.font-size]="svg.title.minutesSecondsFontSize"
             [attr.fill]="svg.title.color">
             {{this.minutesReaming}}<tspan [attr.font-size]="svg.subtitle.minutesSecondsFontSize"
               [attr.fill]="svg.title.color"> {{this.options.minutes}}</tspan>
             {{this.secondsRemaining}}<tspan [attr.font-size]="svg.subtitle.minutesSecondsFontSize"
               [attr.fill]="svg.title.color"> {{this.options.seconds}}</tspan>
           </tspan>
       </ng-container>
       <ng-container *ngIf="options.showContent && this.daysReaming <= 0">
         <tspan *ngFor="let tspan of svg.title.tspans"
           [attr.x]=this.options.hoursInitialXY[0]
           [attr.y]=this.options.hoursInitialXY[1]
           [attr.dy]="tspan.dy"
           [attr.font-size]="svg.title.daysHoursFontSize"
           [attr.fill]="svg.title.color">
             {{this.hoursReaming}}<tspan [attr.font-size]="svg.subtitle.daysHoursFontSize"
               [attr.fill]="svg.title.color"> {{this.options.hours}}</tspan>
           </tspan>
           <tspan *ngFor="let tspan of svg.title.tspans"
             [attr.x]=this.options.minutesSecondsInitialXY[0]
             [attr.y]=this.options.minutesSecondsInitialXY[1]
             [attr.dy]="tspan.dy"
             [attr.font-size]="svg.title.minutesSecondsFontSize"
             [attr.fill]="svg.title.color">
             {{this.minutesReaming}}<tspan [attr.font-size]="svg.subtitle.minutesSecondsFontSize"
               [attr.fill]="svg.title.color"> {{this.options.minutes}}</tspan>
             {{this.secondsRemaining}}<tspan [attr.font-size]="svg.subtitle.minutesSecondsFontSize"
               [attr.fill]="svg.title.color"> {{this.options.seconds}}</tspan>
           </tspan>
       </ng-container>
      </text>
    </svg>
  `
})
export class CircleProgressComponent implements OnChanges {

  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onCompletedTime: EventEmitter<any> = new EventEmitter();
  @Output() isTimeReaming: EventEmitter<any> = new EventEmitter();

  @Input() class: string;
  @Input() backgroundColor: string;
  @Input() backgroundOpacity: number;
  @Input() backgroundStroke: string;
  @Input() backgroundStrokeWidth: number;
  @Input() backgroundPadding: number;

  @Input() radius: number;
  @Input() space: number;
  @Input() toFixed: number;
  @Input() renderOnClick: boolean;

  @Input() outerStrokeWidth: number;
  @Input() outerStrokeColor: string;
  @Input() outerStrokeLinecap: string;

  @Input() innerStrokeColor: string;
  @Input() innerStrokeWidth: string | number;

  @Input() titleFormat: Function;
  @Input() title: string|Array<String>;
  @Input() titleColor: string;
  @Input() daysHoursFontSize: string;
  @Input() minutesSecondsFontSize: string;

  @Input() animation: boolean;
  @Input() animateTitle: boolean;
  @Input() animationDuration: number;

  @Input() showContent: boolean;
  @Input() showBackground: boolean;
  @Input() showInnerStroke: boolean;
  @Input() clockwise: boolean;

  @Input() endDate:Date;
  @Input() initDate:Date;
  @Input() days:string;
  @Input() hours:string;
  @Input() minutes:string;
  @Input() seconds:string;
  @Input() stringColor: string;
  @Input() daysInitialXY:Array<number>;
  @Input() hoursInitialXY:Array<number>;
  @Input() minutesSecondsInitialXY:Array<number>;

  @Input('options') templateOptions: CircleProgressOptions;

  svg: any;

  options: CircleProgressOptions = new CircleProgressOptions();
  defaultOptions: CircleProgressOptions = new CircleProgressOptions();

  private _timerSubscription: Subscription;

  private second:number;
  private minute:number;
  private hour:number;
  private day:number;

  private everySecond:Subscription;

  private secondsRemaining:number;
  private minutesReaming:number;
  private hoursReaming:number;
  private daysReaming:number;

  public isDrawing(): boolean {
    return (this._timerSubscription && !this._timerSubscription.closed) ? true : false;
  }

  constructor(
    defaultOptions: CircleProgressOptions) {
    Object.assign(this.options, defaultOptions);
    Object.assign(this.defaultOptions, defaultOptions);

    //Earth's time system ;)
    this.second = 1000;
    this.minute = this.second * 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;

    this.setValuesReaming();

    this.everySecond = Observable.interval(1000).takeWhile(() => true).subscribe(() => this.setValuesReaming());
  }

  ngOnChanges(changes) {
    this.render();
  }

  private setValuesReaming():void{
    let reaming:{days:number, hours:number, minutes:number, seconds:number} = this.calculateReamingTime();
    this.secondsRemaining = reaming.seconds;
    this.minutesReaming = reaming.minutes;
    this.hoursReaming = reaming.hours;
    this.daysReaming = reaming.days;
    this.options.percent = this.calculatePercentage(this.calculateReamingTime(this.options.initDate), this.calculateReamingTime());
  }

  private calculatePercentage(remainingFromInit:{days:number, hours:number, minutes:number, seconds:number}, remainingFromNow:{days:number, hours:number, minutes:number, seconds:number}):number{
    let milisecondsFromInit:number = this.acumulateMiliSeconds(remainingFromInit);
    let milisecondsFromNow:number = this.acumulateMiliSeconds(remainingFromNow);
    return Math.round(milisecondsFromNow * 100 / milisecondsFromInit);
  }

  private acumulateMiliSeconds(data:{days:number, hours:number, minutes:number, seconds:number}):number{
    let accumulator: number = 0
    accumulator = accumulator + data.seconds;
    accumulator = accumulator + data.minutes * this.second;
    accumulator = accumulator + data.hours * this.hour;
    accumulator = accumulator + data.days * this.day;
    return accumulator;
  }

  private calculateReamingTime(initialOptionalDate:Date = null):{days:number, hours:number, minutes:number, seconds:number}{ //Document parameter
    let now:Date;
    initialOptionalDate ? now = initialOptionalDate : now = new Date();
    let distance:number =  this.options.endDate.getTime() - now.getTime();
    if (distance < 0) {
      let days:number = 0;
      let hours:number = 0;
      let minutes:number = 0;
      let seconds:number = 0;
      let resultado:{days:number, hours:number, minutes:number, seconds:number} = {days:days, hours:hours, minutes:minutes, seconds:seconds}
      if(this.everySecond) this.everySecond.unsubscribe();
      this.onCompletedTimeEmitter();
      return resultado;
    }
    let days:number = Math.floor(distance / this.day);
    let hours:number = Math.floor((distance % this.day) / this.hour);
    let minutes:number = Math.floor((distance % this.hour) / this.minute);
    let seconds:number = Math.floor((distance % this.minute) / this.second);
    let resultado:{days:number, hours:number, minutes:number, seconds:number} = {days:days, hours:hours, minutes:minutes, seconds:seconds}
    return resultado;
  }

  private onCompletedTimeEmitter():void {
    this.onCompletedTime.emit(true);
  }


  private applyOptions = () => {
    // the options of <circle-progress> may change already
    for (let name of Object.keys(this.options)) {
      if (this.hasOwnProperty(name) && this[name] !== undefined) {
        this.options[name] = this[name];
      }else if(this.templateOptions && this.templateOptions[name] !== undefined){
        this.options[name] = this.templateOptions[name];
      }
    }
    // make sure key options valid
    this.options.radius = Math.abs(+this.options.radius);
    this.options.space = +this.options.space;
    this.options.percent = this.calculatePercentage(this.calculateReamingTime(this.options.initDate), this.calculateReamingTime());
    this.options.maxPercent = Math.abs(+this.options.maxPercent);
    this.options.animationDuration = Math.abs(this.options.animationDuration);
    this.options.outerStrokeWidth = Math.abs(+this.options.outerStrokeWidth);
    this.options.innerStrokeWidth = Math.abs(+this.options.innerStrokeWidth);
    this.options.backgroundPadding = +this.options.backgroundPadding;
  }

  render = () => {
    this.applyOptions();
    if (this.options.animation && this.options.animationDuration > 0) {
      this.animate();
    } else {
      this.draw(this.options.percent);
    }
  }

  polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    let angleInRadius = angleInDegrees * Math.PI / 180;
    let x = centerX + Math.sin(angleInRadius) * radius;
    let y = centerY - Math.cos(angleInRadius) * radius;
    return { x: x, y: y };
  }

  draw = (percent: number) => {
    // make percent reasonable
    percent = (percent === undefined) ? this.options.percent : Math.abs(percent);
    // circle percent shouldn't be greater than 100%.
    let circlePercent = (percent > 100) ? 100 : percent;
    // determine box size
    let boxSize = this.options.radius * 2 + this.options.outerStrokeWidth * 2;
    if(this.options.showBackground){
      boxSize += (this.options.backgroundStrokeWidth * 2 + this.max(0, this.options.backgroundPadding * 2));
    }
    // the centre of the circle
    let centre = { x: boxSize / 2, y: boxSize / 2 };
    // the start point of the arc
    let startPoint = { x: centre.x, y: centre.y - this.options.radius };
    // get the end point of the arc
    let endPoint = this.polarToCartesian(centre.x, centre.y, this.options.radius, 360 * (this.options.clockwise ? circlePercent : (100 - circlePercent)) / 100);  // ####################
    // We'll get an end point with the same [x, y] as the start point when percent is 100%, so move x a little bit.
    if (circlePercent === 100) {
      endPoint.x = endPoint.x + (this.options.clockwise ? -0.01 : +0.01);
    }
    // largeArcFlag and sweepFlag
    let largeArcFlag, sweepFlag;
    if (circlePercent > 50) {
      [largeArcFlag, sweepFlag] = this.options.clockwise ? [1, 1] : [1, 0];
    } else {
      [largeArcFlag, sweepFlag] = this.options.clockwise ? [0, 1] : [0, 0];
    }
    // percent may not equal the actual percent
    let titlePercent = this.options.animateTitle ? percent : this.options.percent;
    let titleTextPercent = titlePercent > this.options.maxPercent ?
      `${this.options.maxPercent.toFixed(this.options.toFixed)}+` : titlePercent.toFixed(this.options.toFixed);
    let subtitlePercent = this.options.animateSubtitle ? percent : this.options.percent;
    // get title object
    let title = {
      //x: centre.x, NEW VALUE
      x: 55,
      y: centre.y,
      textAnchor: 'middle', //No USED MORE
      color: this.options.titleColor,
      daysHoursFontSize: this.options.daysHoursFontSize,
      minutesSecondsFontSize: this.options.minutesSecondsFontSize,
      texts: [],
      tspans: []
    };
    // from v0.9.9, both title and titleFormat(...) may be an array of string.
    if(this.options.titleFormat !== undefined && this.options.titleFormat.constructor.name === 'Function'){
      let formatted = this.options.titleFormat(titlePercent);
      if(formatted instanceof Array){
        title.texts = [...formatted];
      }else{
        title.texts.push(formatted.toString());
      }
    }else{
      if(this.options.title === 'auto'){
        title.texts.push(titleTextPercent);
      }else{
        if(this.options.title instanceof Array){
          title.texts = [...this.options.title]
        }else{
          title.texts.push(this.options.title.toString());
        }
      }
    }
    // get subtitle object
    let subtitle = {
      x: centre.x,
      y: centre.y + (+centre.y) + (+this.options.daysHoursFontSize),
      textAnchor: 'middle',
      color: this.options.stringColor,
      texts: [],
      tspans: []
    }
    // get total count of text lines to be shown
    let rowCount = 0, rowNum = 1;
    this.options.showContent && (rowCount += title.texts.length);
    this.options.showContent && (rowCount += subtitle.texts.length);
    // calc dy for each tspan for title
    if(this.options.showContent){
      for(let span of title.texts){
        title.tspans.push({span: span, dy: this.getRelativeY(rowNum, rowCount)});
        rowNum++;
      }
    }
    // Bring it all together
    this.svg = {
      width: boxSize,
      height: boxSize,
      backgroundCircle: {
        cx: centre.x,
        cy: centre.y,
        r: this.options.radius + this.options.outerStrokeWidth / 2 + this.options.backgroundPadding,
        fill: this.options.backgroundColor,
        fillOpacity: this.options.backgroundOpacity,
        stroke: this.options.backgroundStroke,
        strokeWidth: this.options.backgroundStrokeWidth,
      },
      path: {
        // A rx ry x-axis-rotation large-arc-flag sweep-flag x y (https://developer.mozilla.org/en/docs/Web/SVG/Tutorial/Paths#Arcs)
        d: `M ${startPoint.x} ${startPoint.y}
        A ${this.options.radius} ${this.options.radius} 0 ${largeArcFlag} ${sweepFlag} ${endPoint.x} ${endPoint.y}`,
        stroke: this.options.outerStrokeColor,
        strokeWidth: this.options.outerStrokeWidth,
        strokeLinecap: this.options.outerStrokeLinecap,
        fill: 'none'
      },
      circle: {
        cx: centre.x,
        cy: centre.y,
        r: this.options.radius - this.options.space - this.options.outerStrokeWidth / 2 - this.options.innerStrokeWidth / 2,
        fill: 'none',
        stroke: this.options.innerStrokeColor,
        strokeWidth: this.options.innerStrokeWidth,
      },
      title: title,
      subtitle: subtitle,
    };
  }

  private getRelativeY = (rowNum: number, rowCount: number): string => {
    // why '-0.18em'? It's a magic number when property 'alignment-baseline' equals 'baseline'. :)
    let initialOffset = -0.18, offset = 1;
    return (initialOffset + offset * (rowNum-rowCount/2)).toFixed(2) + 'em';
  }

  private min = (a, b) => {
    return a < b ? a : b;
  }

  private max = (a, b) => {
    return a > b ? a : b;
  }

  getAnimationParameters = () => {
    const MIN_INTERVAL = 10;
    let times, step, interval;
    if (this.options.percent >= 100) {
      // we will finish animation in 100 times
      times = 100;
      if (!this.options.animateTitle && !this.options.animateSubtitle) {
        step = 1;
      } else {
        // show title or subtitle animation even if the arc is full, we also need to finish it in 100 times.
        step = Math.round(this.min(this.options.percent, this.options.maxPercent) / times);
      }
    } else {
      // we will finish in as many times as the number of percent.
      times = this.options.percent;
      step = 1;
    }
    // Get the interval of timer
    interval = Math.round(this.options.animationDuration / times);
    // Readjust all values if the interval of timer is extremely small.
    if (interval < MIN_INTERVAL) {
      interval = MIN_INTERVAL;
      times = this.options.animationDuration / interval;
      if (!this.options.animateTitle && !this.options.animateSubtitle && this.options.percent > 100) {
        step = Math.round(100 / times);
      } else {
        step = Math.round(this.min(this.options.percent, this.options.maxPercent) / times);
      }
    }
    // step must be greater than 0.
    if (step < 1) { step = 1; }
    return { times: times, step: step, interval: interval };
  }

  animate = () => {
    if (this._timerSubscription && !this._timerSubscription.closed) {
      this._timerSubscription.unsubscribe();
    }
    let { step: step, interval: interval } = this.getAnimationParameters();
    let count = 0;
    this._timerSubscription = Observable.timer(0, interval).subscribe(() => {
      count += step;
      if (count <= this.options.percent) {
        if (!this.options.animateTitle && !this.options.animateSubtitle && count >= 100) {
          this.draw(this.options.percent);
          this._timerSubscription.unsubscribe();
        } else {
          this.draw(count);
        }
      } else {
        this.draw(this.options.percent);
        this._timerSubscription.unsubscribe();
      }
    });
  }

  emitClickEvent = (event) => {
    if (this.options.renderOnClick) { this.animate(); }
    this.onClick.emit(event);
  }

}
