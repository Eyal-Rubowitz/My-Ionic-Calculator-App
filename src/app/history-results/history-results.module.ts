import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryResultsPage } from './history-results.page';
import { ResultService } from '../result.service';

const routes: Routes = [
  {
    path: '',
    component: HistoryResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoryResultsPage]
})
export class HistoryResultsPageModule implements OnInit {
  
  public results: any;
  private check: string  = '12345667890';

  constructor(private resService: ResultService){
    // this.results = [1,3,5,7,9,11];
    // this.ngOnInit();
  }

  ngOnInit(){ 
    this.results = this.resService.resultList;
  }

  // ionViewDidLoad(){
  //   this.resService.ionViewDidLoad();
  //   this.resList = this.resService.resultList;
  // }

  reuseResult(res){
    return res;
  }

}
