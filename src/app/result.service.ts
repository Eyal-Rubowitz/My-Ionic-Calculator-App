import { Injectable } from '@angular/core';
import { ListResult } from '../app/shared/results-list';
import { HistoryResultsPage } from '../app/history-results/history-results.page';
import { Observable, of, from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Parse } from 'parse';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class ResultService {

  // public result: number; // object "result" holds a number property

  // Observable - updates UI template async
  // Observer - refresh data from DB
  // Subject is a combination of Observable & Observer
  public resultList: Subject<any[]>; // object "resultList" is a "result" array 
  private Result: Parse.Object;

  constructor() {
    Parse.serverURL = 'https://parseapi.back4app.com/';
    // Parse.initialize(ID, JS Key);
    Parse.initialize("Hp0z6bWqSH7SYziWnzOiIwD0hLBcBshvOaXy9iyp", "gl1OGKk4rsepWec68pzENFhXWic7L0ZploMMF9Hu");
    this.Result = Parse.Object.extend("Result");
    // query.find().then((db) => console.info(db[0].get('value')));
    this.resultList = new Subject<any[]>();
    this.refreshList();
    //this.resultList = of(query.find().then((db) => db.map((r) => r.get('value'))));
  }

  addResult(res: number) {
    let dbRes = new this.Result();
    dbRes.set('value', res);
    dbRes.save().then(() => this.refreshList());

    //ListResult.push(res);
  }

  deleteResult(index: string) {
    // ListResult.splice(index, 1);
    let result = new this.Result({id: index});
    result.destroy().then(() => this.refreshList());
  }

  refreshList(){
    // create query to DB
    let query = new Parse.Query(this.Result);
    // send query to DB
    query.find().then((dbList) => {
      let list = dbList.map((res) => {return {value: res.get('value'),  id: res.id}});
      this.resultList.next(list)
    })
  }


}

  // reuseResult(res: number) {
  //   return res;
  // }




