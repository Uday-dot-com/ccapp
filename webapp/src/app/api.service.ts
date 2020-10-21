import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './contsants';
import { Banks } from '../classes/banks';
import { Observable } from 'rxjs';
@Injectable()
export class ApiService {
  banks: Banks[];
  selectedBank: Banks;
  path = Constants.API_URL;
  downloadPath=Constants.REPORT_URL
  constructor(private http: HttpClient) {

  }
  saveBank(bank: Banks) {
    return this.http.post(this.path + 'addbank', bank);
  }

  getBanks(): Observable<any> {
    return this.http.get(this.path + 'getBanks')
  }

  saveCard(data) {
    return this.http.post(this.path + 'addCard', data);
  }

  getCards(): Observable<any> {
    return this.http.get(this.path + 'getCards');
  }

  getCardsForBank(bankId) {
    return this.http.get(this.path + 'getCardsForBank/' + bankId);
  }

  deleteBanks(_id: string) {
    return this.http.delete(this.path + `deleteBank/${_id}`);
  }

  editBanks(banks: Banks) {
    return this.http.put(this.path + `updateBank`, banks);
  }

  deleteCard(CardId) {
    return this.http.delete(this.path + `deleteCards/${CardId}`);
  }
  editCard(data) {
    return this.http.put(this.path + 'editCard', data);
  }
  getUser(): Observable<any> {
    return this.http.get(this.path + 'getUser');
  }

  deleteUser(userID) {
    return this.http.delete(this.path + `deleteUser/${userID}`);
  }
  editUser(data: any) {
    return this.http.put(this.path + 'editUser', data);
  }

  saveCardDetails(data){
    return this.http.put(this.path + 'saveCardDetails', data);
  }
 
  getCardDetails(cardID) {
    return this.http.get(this.path + `getCardDetails/${cardID}`);
  }

  fileDownloadByAPI(url){
    return this.http.get( url,{responseType: "arraybuffer"})
  }
 
}
