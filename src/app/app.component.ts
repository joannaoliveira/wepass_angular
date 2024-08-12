import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  form: FormGroup = new FormGroup({
    iNome: new FormControl(''),
    iWhatsapp: new FormControl(''),
    iEmail: new FormControl(''),
    iCidade: new FormControl(''),
    iCondominio: new FormControl(''),
    iLotes: new FormControl(''),
    tObs: new FormControl(''),
  });
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
            return;
        }
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0)
        }
    });

    this.form = this.formBuilder.group(
      {
        iNome: ['', Validators.required],
        iWhatsapp: ['', Validators.required],
        iEmail: ['', [Validators.required, Validators.email]],
        iCidade: ['', Validators.required],
        iCondominio: ['', Validators.required],
        iLotes: ['', Validators.required],
        tObs: ['']
      }
    );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
    return false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

}
