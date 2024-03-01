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
    console.log("Isplaying response", this.movieForm.value);
    console.log("Entered details are",finalFormData);
    
    this.appService.addMovieAdmin(finalFormData).subscribe(
      (response: any) => {
        console.log("Added movie to DB", response);
        this.router.navigate(['/admin/home']);
      },
      (error) => {
        console.error('Error:', error);
      });
  }
}
