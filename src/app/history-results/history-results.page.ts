import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResultService } from '../result.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from '@ionic/angular';

@Component({
  selector: 'app-history-results',
  templateUrl: './history-results.page.html',
  styleUrls: ['./history-results.page.scss'],
})
export class HistoryResultsPage implements OnInit {

  // a reference to service list
  //public results: any[];
  public results: Observable<any[]>;
  @ViewChild('ionList') listEl: List;
  //@ViewChild('itemResult') resultEl: ElementRef;
  //@ViewChild('ion-btn') btnEl: ElementRef;

  constructor(private router: Router, private resService: ResultService) { 
    // this.results = this.resService.resultList;
  }

  ngOnInit() {
    this.results = this.resService.resultList
    //this.resService.resultList.subscribe(results => this.results = results);
  }

  onToCalcPage() {
    this.router.navigateByUrl('/home');
  }

  // when use this method in history-results ts & html files
  // the dynamic list is not being shown
  // for some reason it being overide with no Error reference

  // onDeleteRes() {
  //   // console.log('button was pressed');
    
  //   // debugger;
  //   // var chack = this.resultEl.nativeElement.value;
  //   // this.resService.deleteResult(res);
  // }

  updateHistory(){
    //this.results = this.resService.resultList;

  }

  onClick() {
    // this.results = [1, 2, 4, 16];
    this.resService.refreshList();
    console.log(this.resService.resultList);
  }

  
  deleteRes(index){
    this.listEl.closeSlidingItems();
    this.resService.deleteResult(index);
  }
}
