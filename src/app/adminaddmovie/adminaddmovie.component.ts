import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appApiServices } from '../services/app.services';

@Component({
  selector: 'app-adminaddmovie',
  templateUrl: './adminaddmovie.component.html',
  styleUrls: ['./adminaddmovie.component.css']
})
export class AdminaddmovieComponent implements OnInit {
  logoImg = '../assets/img/Logo-SE.jpeg';
  movieForm: FormGroup;
  submitted = false;
  minShowTime: string;

  constructor(private router: Router, private fb: FormBuilder, private appService: appApiServices) {
    this.movieForm = this.fb.group({
      movieTitle: ['', Validators.required],
      releaseDate: ['', Validators.required],
      synopsis: ['', Validators.required],
      reviews: ['', Validators.required],
      rating: ['', Validators.required],
      posterSrc: ['', Validators.required],
      bannerSrc: ['', Validators.required],
      movieDirector: [''],
      movieCategory: ['', Validators.required],
      movieAvailability : ['', Validators.required],
      trailerLink: ['', Validators.required],
      movieCast: ['', Validators.required],
      movieProducer: ['', Validators.required],
      movieCertificationCode: [''],
      language: ['', Validators.required]
    });

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

  get f() { return this.movieForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    if (this.movieForm.invalid) {
      return;
    }
  
    const finalFormData = this.movieForm.value;
    this.appService.addMovieAdmin(finalFormData).subscribe(
      (response: any) => {
        console.log("Added movie to DB", response);
        alert('Movie added successfully!');
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      });
  }
  goHome() {
    this.router.navigate(['/admin/home']);
  }
}
