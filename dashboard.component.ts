import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  responceText: string = '';
  writtenInputValue;
  questionsValue;
  explainedText: string = '';
  codewrite: boolean = false;
  codeexplain: boolean = false;
  codedebug: boolean = false;
  coderate: boolean = false;
  invalidCode: boolean = false;
  questionAndAnswersDiv: boolean = false;
  constructor(
    private service: ServiceService,
    private spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  generateFunction() {
    this.questionAndAnswersDiv = false;
    if (this.writtenInputValue == null || this.writtenInputValue.length < 3) {
      this.invalidCode = true;
      this.responceText = '';
    } else {
      this.invalidCode = false;
      this.spin.show();
      this.explainedText = '';
      let input = 'write a code for' + this.writtenInputValue;
      this.service.responce(input).then((res) => {
        this.spin.hide();
        this.responceText = res['data'].choices[0].text;
      });
    }
  }
  QAns() {
    this.explainedText = '';
    this.questionAndAnswersDiv = true;
  }
  askQuestions() {
    this.spin.show();
    let input =
      'Answer the Question based on code ,here is the code:' +
      this.responceText +
      'and the question is' +
      this.questionsValue +
      ',note:answer if it a coding related question';
    this.service.responce(input).then((res) => {
      this.spin.hide();
      this.explainedText = res['data'].choices[0].text;
    });
  }
  explainFunction() {
    this.spin.show();
    this.questionAndAnswersDiv = false;
    let input =
      'explain this code in bullet points,here is the code:' +
      this.responceText +
      ',note:answer if it a coding related question';
    this.service.responce(input).then((res) => {
      this.spin.hide();
      this.explainedText = res['data'].choices[0].text;
    });
  }
}
