import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { HistoryResultsPage } from '../history-results/history-results.page';
import { ResultService } from '../result.service';
import { HistoryResultsPage } from '../history-results/history-results.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // inputs as user enter it 
  private uiInputs: string;

  // number inputs as user enter it
  private numInputs: String;

  // numbersAndOperators
  private numsAndOprts: any[];

  private result: number;

  private isHoleNumber = true;



  constructor(private router: Router, private resService: ResultService) {
    this.numsAndOprts = [];
    this.uiInputs = '0';
  }

  ngOnInit() {
    // debugger;
    // if(this.resService == null) {
    // this.resService.ngOnInit();
    // }

    // this.historyRes.ngOnInit();
    // this.resService.resultList = [];
  }

  numInput(charNum) {
    // if there is no input yet... else...
    if (this.numsAndOprts.length == 0 && this.numInputs == undefined || this.numInputs == '0') {
      // calculetor except first input "." as decimal number after zero
      if (charNum == '.') {
        this.numInputs = "0.";
        this.uiInputs = "0.";
        this.isHoleNumber = false;
      } else {
        // when "numInputs" has an input of decimal number already,
        // "isHoleNumber" is false, so...
        // the calculator cannot response user clicking for another "." input   
        if (!this.isHoleNumber) {
          return;
        }
        this.numInputs = charNum;
        this.uiInputs = charNum;
      }
    } else {
      if (this.numInputs == undefined) {
        // another number input but the first number input
        if (charNum == '.') {
          this.numInputs = "0";
          this.uiInputs += "0.";
        } else {
          if(!this.isHoleNumber){
            return;
          }
          this.numInputs = charNum;
          this.uiInputs += charNum;
        }
      } else if (this.numInputs == '0') {
        this.numInputs = charNum;
        this.uiInputs = '0';
      } else {
        this.numInputs += charNum;
        this.uiInputs += charNum;
      }
    }
  }

  operatorInput(oprtr: string) {
    // condition - if there is no numbers inputs, don't allow operatos input
    if (this.numInputs != undefined && this.numInputs != '-') {
      // if it's an operator, set the number first and then add the operator
      this.uiInputs += oprtr;
      this.numsAndOprts.push(Number(this.numInputs));
      this.numsAndOprts.push(oprtr);
      // when operator is executed, set the condition to prohibit operator repeats
      this.numInputs = undefined;
      // after using aperator, the next number becomes by default to a hole number
      this.isHoleNumber = true;
    } else if (oprtr == '-') {
      this.numInputs = oprtr;
      this.uiInputs = oprtr;
    } else {
      if (this.numsAndOprts.length == 0) {
        this.uiInputs = '';
      }
    }
  }

  onCalcResult() {
    var tempRes: number;
    this.uiInputs = '';
    // calculate if input was entered & last input entered was number 
    if (this.numInputs == undefined) {
      this.result = NaN;
    } else {
      // first, before calculate, add the last input number into numsAndOprts array
      this.numsAndOprts.push(Number(this.numInputs));

      // beginig of calculating...

      // Prioritize to multiple & divide operators calculate first
      // when operator found... calculate temporary result, 
      // and extract numsAndOprts array operands & operators. 
      // Runug time complexity is O(n2)squere, cuase array.splaice() is also O(n).
      for (var i = 0; i < this.numsAndOprts.length; i++) {
        if (this.numsAndOprts[i] == '*' || this.numsAndOprts[i] == '/') {
          if (this.numsAndOprts[i] == '*') {
            tempRes = this.numsAndOprts[i - 1] * this.numsAndOprts[i + 1];
            this.numsAndOprts.splice((i - 1), 3, tempRes);
            i--;
          } else if (this.numsAndOprts[i] == '/') {
            tempRes = this.numsAndOprts[i - 1] / this.numsAndOprts[i + 1];
            this.numsAndOprts.splice((i - 1), 3, tempRes);
            i--;
          }
        }
      }

      // Calculates the regular operators that left 
      // and extract operands into numsAndOprts
      // into temporary result
      // Runug time complexity is O(n2)squere, cuase array.splaice() is also O(n).
      for (var i = 0; i < this.numsAndOprts.length; i++) {
        if (this.numsAndOprts[i] == '+') {
          tempRes = this.numsAndOprts[i - 1] + this.numsAndOprts[i + 1];
          this.numsAndOprts.splice((i - 1), 3, tempRes);
          i--;
        } else if (this.numsAndOprts[i] == '-') {
          tempRes = this.numsAndOprts[i - 1] - this.numsAndOprts[i + 1];
          this.numsAndOprts.splice((i - 1), 3, tempRes);
          i--;
        }
      }

      // after all operands & operators was extract, 
      // numsAndOprts array left only one element 
      this.result = this.numsAndOprts.pop();
      // show result in UI
      this.uiInputs = String(this.result);
      // reset numInputs for a new calculation
      this.numInputs = undefined;
    }
  }

  // point() {
  //   this.inputs += ".";
  // }

  onClearInput() {
    this.numInputs = undefined;
    this.uiInputs = undefined;
  }

  onSaveRes() {
    if (this.result !== undefined) {
      this.resService.addResult(this.result);
    }
    // this.resAddToHistory.onResultAdded(this.result);
  }

  onGetLastRes() {

  }

  onHistoryPage() {
    // debugger;
    this.router.navigateByUrl('/history-results')
  }
}
