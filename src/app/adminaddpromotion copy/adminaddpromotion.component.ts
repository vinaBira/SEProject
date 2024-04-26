import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { appApiServices } from '../services/app.services';


@Component({
  selector: 'app-adminaddpromotion',
  templateUrl: './adminaddpromotion.component.html',
  styleUrls: ['./adminaddpromotion.component.css']
})
export class AdminaddpromotionComponent implements OnInit {
  addPromoForm: FormGroup;
  promoAlreadyExistsPop : boolean= false;
  loading : boolean= false;
  promoErrorMessage : any;
  minShowTime: string;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private appService: appApiServices) {
    this.addPromoForm = this.fb.group({
      promoCode : [''],
      promoDescription : [''],
      startDate : [''],
      endDate : [''],
      discountApplied : ['']
    })
    const today = new Date();
    this.minShowTime = this.formatDate(today);
   }
   private formatDate(date: Date): string {
    // Format the date to 'yyyy-MM-dd' for HTML date input
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  ngOnInit(): void {
  }
  addNewPromotion()
  {
    const finalFormData = this.addPromoForm.value;
    console.log("Form Data:", finalFormData); // Log the form data to check if it's captured properly
    this.loading = true;
    this.appService.addNewPromotion(finalFormData).subscribe(
      (response: any) => {
        if(response[200])
        {
          this.loading = false;
          console.log("Added promo to DB", response);
        this.router.navigate(['/admin/home']);
        }
        else
        {
          this.loading = false;
          this.promoAlreadyExistsPop = true;
          this.promoErrorMessage = "Promotion already exists!"
        }
        
      },
      (error) => {
        console.error('Error:', error);
      })
  }
  closeErrorModal() {
    this.promoAlreadyExistsPop = false;
    this.router.navigate(['/admin/home']);
  }
  goHome() {
    this.router.navigate(['/admin/home']);
  }
}
