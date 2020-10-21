import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { CommonFunction } from '../../commonFunctions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from '../../messages';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

export interface Drop {
  value: string;
  viewValue: string;
}

export interface DropNAY {
  value: string;
  viewValue: string;
}

export interface Network {
  values: string;
}

export interface Category {
  categories: string;
}

export interface Reward {
  value: string;
  viewValue: string;
}

export interface RewardAmount {
  rewardAmount: string;
  viewValue: string;
}

export interface FirstPurchase {
  rewardAmount: string;
  viewValue: string;
}

@Component({
  selector: 'app-card-filldetails',
  templateUrl: './card-filldetails.component.html',
  styleUrls: ['./card-filldetails.component.scss']
})
export class CardFilldetailsComponent implements OnInit {
  id: number;
  private sub: any;
  disabled:true
  displayedColumns: string[] = ['bankName', 'cardName'];
  cardDetail: any = [];
  dataSource: any = [];
  formControlObj: FormControl;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eighthFormGroup: FormGroup;
  options: FormGroup;
  selectModel: any = {};
  constructor(private route: ActivatedRoute, private _router: Router, private httpService: HttpClient, private _apiService: ApiService, private _commonFunction: CommonFunction, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder, fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: 'auto'
    });

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getCardDetails();
      this.firstFormGroup = this._formBuilder.group({
        cardUrl: ['', Validators.required],
        cardImageUrl: ['', Validators.required],
        cardDescription: [''],
        generalNotes: ['']
      });
      this.secondFormGroup = this._formBuilder.group({
        rewardUnit: ['',Validators.pattern(/[$]$/)],
        annualFee: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$/)],
        apr_introductory: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        apr_freeBillingCycle: new FormControl({ value: "", disabled: true }, [Validators.pattern(/^(\d{0,2})?$/)]),
        apr_varApr_min: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|(N\/A)$/)],
        apr_varApr_max: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|(N\/A)$/)],
        apr_cashAdvances_min: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|(N\/A)$/)],
        apr_cashAdvances_max: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|(N\/A)$/)],
        latePenalty_amount: ['', Validators.pattern(/^(\d{0,2})?$|(N\/A)$/)],
        latePenalty_lateApr: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        cashAdvanceFee_percent: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        cashAdvanceFee_min: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        balanceTransferFee_percent: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        balanceTransferFee_min: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        feeNotes: ['']
      });
      this.thirdFormGroup = this._formBuilder.group({
        rewards_onlineShop: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_travel: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_dining: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_gas: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_groceries: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_drugStore: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_homeFurnishing: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_usSupermarkets: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_everythingElse: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_choiceMultiplier: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        rewards_rotatingMultiplier: ['', Validators.pattern(/^\d{0,2}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        conditionalRequirements: ['', Validators.pattern(/^((N\/A)|(Y)|(N))$/)],
        rewardNotes: ['']
      });
      this.forthFormGroup = this._formBuilder.group({
        forthFormGroup: [''],
        redemptionCash_holderName: ['', Validators.pattern(/^[a-z A-Z]+$|(N\/A)$/)],
        redemptionNotes: ['']
      });
      this.fifthFormGroup = this._formBuilder.group({
        bonusOffer_rewardAmount: ['', Validators.pattern(/^\d{0,8}(\.\d{1,2})?$|((N\/A)|(N))$/)],
        bonusOffer_purchaseAmount: ['', Validators.pattern(/^(\d{0,8})?$|(N\/A)$/)],
        bonusOffer_days: ['', Validators.pattern(/^(\d{0,3})?$|(N\/A)$/)],
        bonusOfferCondition_newMember: [''],
        bonusOfferCondition_notRecievedBonus: [''],
        bonusOfferCondition_timePeriod: ['', Validators.pattern(/^(\d{0,3})?$|(N\/A)$/)],
        bonusNotes: ['']
      });
      this.sixthFormGroup = this._formBuilder.group({
        sixthCtrl: ['', Validators.required],
        perksNotes: ['']

      });
      this.seventhFormGroup = this._formBuilder.group({
        storePattern_firstPurchase: ['', Validators.pattern(/^\d{0,4}?$|((N\/A)|(Y)|(N))$/)],
        storePattern_arriveInMail: ['', Validators.pattern(/^\d{0,4}?$|((N\/A)|(Y)|(N))$/)],
        storePattern_specialOfferPerYear: ['', Validators.pattern(/^\d{0,2}?$|((N\/A)|(Y)|(N))$/)],
        storePattern_additionalOfferPerYear: ['', Validators.pattern(/^\d{0,2}?$|((N\/A)|(Y)|(N))$/)],
        storePattern_additionalOfferConditions_amount: ['', Validators.pattern(/^(\d{0,5})?$|((N\/A)|(N)|(Y))$/)],
        storePattern_additionalOfferConditions_duration: ['', Validators.pattern(/^(\d{0,4})?$|((N\/A)|(N))$/)],
        storecardNotes: ['']
      });
      this.eighthFormGroup = this._formBuilder.group({
        value_payingLateApr: [''],
        value_lateFirstPayment: [''],
        value_overLimitFee: [''],
        value_higherCreditLine: [''],
        value_duration: new FormControl({ value: "", disabled: true }, [Validators.pattern(/^\d{0,3}?$/)]),
        value_balanceTransfer: new FormControl({ value: '', disabled: true }, []),
        value_foreignFee: [''],
        fraudProtection_fraudLiability: [''],
        fraudProtection_virtualCardNumber: [''],
        valueNotes: ['']
      });

    });
    this.secondFormGroup.get('apr_introductory').valueChanges.subscribe(checked => {
      if ((checked === 'N/A') || (checked === 'N')) {
        this.secondFormGroup.get('apr_freeBillingCycle').disable();
        this.secondFormGroup.get('apr_freeBillingCycle').patchValue('N/A');
      } else {
        this.secondFormGroup.get('apr_freeBillingCycle').enable();
        this.secondFormGroup.get('apr_freeBillingCycle').patchValue('');
      }
    });

    this.secondFormGroup.get('balanceTransferFee_percent').valueChanges.subscribe(checked => {
      if ((checked === 'N/A') || (checked === 'N')) {
        this.eighthFormGroup.get('value_balanceTransfer').disable();
        this.eighthFormGroup.get('value_balanceTransfer').patchValue('N/A');
        this.secondFormGroup.get('balanceTransferFee_min').valueChanges.subscribe(checked => {
          if ((checked === 'N/A') || (checked === 'N')) {
            this.eighthFormGroup.get('value_balanceTransfer').disable();
            this.eighthFormGroup.get('value_balanceTransfer').patchValue('N/A');
          }
          else {
            this.eighthFormGroup.get('value_balanceTransfer').disable();
            this.eighthFormGroup.get('value_balanceTransfer').patchValue('Y');
          }
        });
      }
      else {
        this.eighthFormGroup.get('value_balanceTransfer').disable();
        this.eighthFormGroup.get('value_balanceTransfer').patchValue('Y');
      }
    });

    this.secondFormGroup.get('rewardUnit').setValue('$');

  }

  getCardDetails() {
    this._apiService.getCardDetails(this.id).subscribe((cardDetails: any) => {
      this.dataSource = cardDetails;
      this.cardDetail = cardDetails;
      this.selectModel = cardDetails[0];
    });

  }

  onSelectionChanged({ value }) {
    if ((value === 'N/A') || (value === 'N')) {
      this.eighthFormGroup.get('value_duration').disable();
      this.eighthFormGroup.get('value_duration').patchValue('N/A');
    } else {
      this.eighthFormGroup.get('value_duration').enable();
      this.eighthFormGroup.get('value_duration').patchValue('');
    }
  }

  drops: Drop[] = [
    { value: 'N/A', viewValue: 'N/A' },
    { value: 'Y', viewValue: 'Y' },
    { value: 'N', viewValue: 'N' }
  ];

  dropNAYN: Drop[] = [
    { value: 'N/A', viewValue: 'N/A' },
    { value: 'Y', viewValue: 'Y' },
    { value: 'N', viewValue: 'N' }
  ];

  dropNAY: DropNAY[] = [
    { value: 'N/A', viewValue: 'N/A' },
    { value: 'Y', viewValue: 'Y' }
  ]

  Drops: Drop[] = [
    { value: 'Y', viewValue: 'Y' },
    { value: 'N', viewValue: 'N' }
  ]

  networks: Network[] = [
    { values: 'American Express' },
    { values: 'Capital One' },
    { values: 'Citi' },
    { values: 'Discover' },
    { values: 'Mastercard' },
    { values: 'Visa' },
    { values: 'N/A' }
  ];

  category: Category[] = [
    { categories: 'Auto Care & Fuel Ups' },
    { categories: 'Balance Transfer' },
    { categories: 'Business Accounting' },
    { categories: 'Cashback' },
    { categories: 'Credit Building-Unsecured' },
    { categories: 'Credit Building-Secured' },
    { categories: 'Financing' },
    { categories: 'HealthCare Financing' },
    { categories: 'Low Rate Card' },
    { categories: 'Prepaid Card' },
    { categories: 'Rewards' },
    { categories: 'Travel & Miles' }
  ];

  views: Reward[] = [
    { value: 'P', viewValue: 'Percentage (%)' },
    { value: 'M', viewValue: 'Points / Miles' },
  ];

  rewardamount: RewardAmount[] = [
    { rewardAmount: "%", viewValue: 'Percentage(%)' },
    { rewardAmount: "$", viewValue: 'Dollar($)' },
    { rewardAmount: "Points", viewValue: 'Points' }
  ];

  firstPurchase: FirstPurchase[] = [
    { rewardAmount: "%", viewValue: 'Percentage(%)' },
    { rewardAmount: "$", viewValue: 'Dollar($)' }
  ];

  addIdinModel() {
    this.selectModel._id = this.id;

  }

  redirectToMangeCard() {
    this._router.navigate(['add-card']);
  }

  saveCardDetails() {
    this.addIdinModel()
    this._apiService.saveCardDetails(this.selectModel).subscribe((response: any) => {
      if (response) {
        this._snackBar.open(Messages.CARD_MODEL_DATA_SAVED_SUCCESSFULLY, Messages.OK, {
          duration: 4000,
        });
        this.redirectToMangeCard();
      }
    },
      (error) => {
        let message: any = '';
        message = Messages.CARD_MODEL_FAILED_SAVE;
        this._snackBar.open(message, Messages.OK, {
          duration: 4000,
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
