import { Component, OnInit } from '@angular/core';
import { Constants } from '../contsants';
import { ApiService } from 'app/api.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  generateReport() {
    this.apiService.fileDownloadByAPI(Constants.REPORT_URL + 'downloadReport').subscribe(res => {
      var result = this.ab2str(res);
      var resultStr = "" + result;
      if (resultStr.substr(0, 1) == "{") {
        var jsonObject = JSON.parse(result);
        var message = jsonObject.message;
        if (message == "No Cards found for Generating Report") {
          this._snackBar.open(message, 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
        }
      }
      else {
        let fileName = "Card_Details.xlsx";
        var a = document.createElement("a");
        document.body.appendChild(a);
        let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
}