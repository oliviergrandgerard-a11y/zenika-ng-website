import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BasketStore } from '../../../store/basket.store';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
})
export class CheckoutForm implements OnInit {
  checkoutForm!: FormGroup;

  hasError: boolean = false;
  isCheckoutComplete: boolean = false;

  constructor(
    private fb: FormBuilder,
    private basketStore: BasketStore,
  ) {}

  isInvalidAndTouchedOrDirty(formControl: FormControl) {
    return formControl.invalid && (formControl.touched || formControl.dirty);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      creditCard: ['', [Validators.required, Validators.pattern(/^[0-9]{3}-[0-9]{3}$/)]],
    });
  }

  onSubmit(): void {
    console.log(this.checkoutForm.value);
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.basketStore.checkout(this.checkoutForm.value).subscribe({
      next: () => {
        this.isCheckoutComplete = true;
        console.log('Checkout OK');
      },
      error: (err) => {
        this.hasError = true;
        console.error('Erreur checkout', err);
      },
    });
  }

  get name(): FormControl {
    return this.checkoutForm.get('name') as FormControl;
  }

  get address(): FormControl {
    return this.checkoutForm.get('address') as FormControl;
  }

  get creditCard(): FormControl {
    return this.checkoutForm.get('creditCard') as FormControl;
  }
}
