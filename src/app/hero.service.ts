import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

//通过给 @Injectable() 装饰器添加 providedIn: 'root' 元数据的形式，用根注入器将你的服务注册成为提供者
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // constructor() { }
  //“服务中的服务”: MessageService 注入到了 HeroService 中，而 HeroService 又被注入到了 HeroesComponent 中。
  constructor(private messageService: MessageService) { }
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // getHeroes(): Observable<Hero[]> {
  //   //of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组
  //   return of(HEROES);
  // }

  //在获取到英雄数组时发送一条消息
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}

