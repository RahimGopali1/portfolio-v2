import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { merge } from 'rxjs';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'contact',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  // Contact form group
  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  resetForm(): void {
  this.contactForm.reset();
  
  // Mark all controls as pristine and untouched
  Object.keys(this.contactForm.controls).forEach(key => {
    const control = this.contactForm.get(key);
    if (control) {
      control.markAsPristine();
      control.markAsUntouched();
      control.setErrors(null);
    }
  });
  
  // Update the form's status
  this.contactForm.updateValueAndValidity();
}


  // Individual email control (for backward compatibility)
  readonly email = this.contactForm.get('email') as FormControl;

  errorMessage = signal('');
  successMessage = signal('');
  isLoading = signal(false);
  generalError = signal('');

  // EmailJS configuration - Replace with your actual IDs
  private readonly EMAILJS_CONFIG = {
    serviceId: 'service_psw0ah4',
    templateId: 'template_luj2xhk',
    publicKey: 'KbpA_vrf3RzDOmw6-',
  };

  constructor() {
    // Subscribe to email validation changes
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    try {
      const now = new Date();

      // Prepare template parameters
      const templateParams = {
        to_name: 'Admin', // You can change this
        from_name:
          `${this.contactForm.value.firstName} ${this.contactForm.value.lastName}`.trim(),
        from_email: this.contactForm.value.email || '',
        message: this.contactForm.value.message || '',
        reply_to: this.contactForm.value.firstName || '',
        date: now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        time: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      };

      await emailjs.send(
        this.EMAILJS_CONFIG.serviceId,
        this.EMAILJS_CONFIG.templateId,
        templateParams,
        this.EMAILJS_CONFIG.publicKey
      );

      // Show success message
      this.successMessage.set('✅ Message sent successfully!');

      // Reset form
      this.resetForm();

      // Clear message after 5 seconds
      setTimeout(() => {
        this.successMessage.set('');
      }, 5000);
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      this.errorMessage.set('Failed to send message. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Helper method to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  // Get field error message
  getFieldErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);

    if (!field) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }

    if (fieldName === 'email' && field.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return '';
  }
}
