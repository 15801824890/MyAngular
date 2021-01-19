import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

//@Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据。
//selector— 组件的选择器（CSS 元素选择器）
//templateUrl— 组件模板文件的位置。
//styleUrls— 组件私有 CSS 样式表文件的位置。
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  // heroes = HEROES;
  heroes: Hero[];
  selectedHero: Hero;
  //1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点
  //创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的单例对象。
  // constructor(private heroService: HeroService) { }
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  //ngOnInit() 生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit()。
  //这里是放置初始化逻辑的好地方。始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。
  ngOnInit() {
    this.getHeroes();//最佳实践ngOnInit生命周期钩子中调用 getHeroes()
  }

  //模板中被点击的英雄赋值给组件的 selectedHero 属性
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  //Original
  //HeroService必须等服务器给出响应， 而 getHeroes() 不能立即返回英雄数据， 浏览器也不会在该服务等待期间停止响应。
  //把英雄的数组赋值给了该组件的 heroes 属性。 同步的，假设是服务器能立即返回英雄数组或者浏览器能在等待服务器响应时冻结界面。
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //Observable 异步
  //subscribe()把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}