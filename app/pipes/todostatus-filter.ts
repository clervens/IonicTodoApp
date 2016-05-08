import {Pipe, Injectable, PipeTransform} from 'angular2/core';
import {Todo, TodoState} from '../models/todo';

@Pipe({
    name: 'TodoStatus',
    pure: false
})
@Injectable()
export class TodoStatusFilterPipe implements PipeTransform {
    transform(items: Todo[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(
          item => item.status == args[0]
        );
    }
}
