import { Injectable } from "@angular/core";
import * as _ from "lodash";
@Injectable()
export class CommonFunction {

  isUndefinedOrNullEmpty(val: any): any {
    let status: any = false;
    if (this.isEmptyString(val)) {
      status = true;
    } else if (this.isEmptyArray(val)) {
      status = true;
    } else if (val === null) {
      status = true;
    } else {
      if (val === undefined || val === "undefined") {
        status = true;
      } else {
        status = false;
      }
    }
    return status;
  }

  copy(datatocopy: any): any {
    let clone: any = "";
    if (
      this.isUndefinedOrNullEmpty(datatocopy) == false &&
      !this.isUndefinedOrNullEmpty(_)
    ) {
      clone = _.cloneDeep(datatocopy);
    }
    return clone;
  }

  isEmptyString(val: any): any {
    if (typeof val === "string") {
      if (val.trim() === "") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isEmptyArray(data: any[]): any {
    if (data instanceof Array && data.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  fileDownload(url: string): void {
    let fileDownloadUrl: string = url;

    let anchor: any = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute("target", "_self");
    anchor.setAttribute("id", "downloadExportFile");
    document.body.appendChild(anchor);
    document.getElementById("downloadExportFile").click();
    document.getElementById("downloadExportFile").remove();
  }
}