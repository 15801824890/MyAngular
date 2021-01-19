import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

//该服务对外暴露了它的 messages 缓存
export class MessageService {
  messages: string[] = [];

  //add() 方法往缓存中添加一条消息
  add(message: string) {
    this.messages.push(message);
  }

  //clear() 方法用于清空缓存
  clear() {
    this.messages = [];
  }
}