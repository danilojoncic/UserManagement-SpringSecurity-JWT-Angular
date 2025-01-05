import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {PermissionType} from "../../models/permissionType";

@Component({
  selector: 'app-user-form',
  template: `
    <div class="user-form-container">
      <h2>{{isEditMode ? 'Edit' : 'Create'}} User</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            formControlName="firstName"
            class="form-control">
          <div class="error-message" *ngIf="userForm.get('firstName')?.touched && userForm.get('firstName')?.invalid">
            First name is required
          </div>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            formControlName="lastName"
            class="form-control">
          <div class="error-message" *ngIf="userForm.get('lastName')?.touched && userForm.get('lastName')?.invalid">
            Last name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            formControlName="email"
            class="form-control">
          <div class="error-message" *ngIf="userForm.get('email')?.touched && userForm.get('email')?.invalid">
            <span *ngIf="userForm.get('email')?.errors?.['required']">Email is required</span>
            <span *ngIf="userForm.get('email')?.errors?.['email']">Please enter a valid email</span>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            formControlName="password"
            class="form-control">
          <div class="error-message" *ngIf="userForm.get('password')?.touched && userForm.get('password')?.invalid">
            Password is required
          </div>
        </div>

        <div class="form-group permissions-group">
          <label>Permissions</label>
          <div class="permissions-container">
            <div *ngFor="let permission of permissions" class="permission-item">
              <label>
                <input
                  type="checkbox"
                  [checked]="isPermissionSelected(permission)"
                  (change)="onPermissionChange($event, permission)">
                {{permission.title}}
              </label>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button type="submit" [disabled]="userForm.invalid">
            {{isEditMode ? 'Update' : 'Create'}} User
          </button>
          <button type="button" (click)="cancel()" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .user-form-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }
    .permissions-group {
      margin-top: 20px;
    }
    .permissions-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    .permission-item {
      padding: 5px;
    }
    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="submit"] {
      background-color: #007bff;
      color: white;
    }
    .cancel-button {
      background-color: #6c757d;
      color: white;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  permissions: PermissionType[] = [];
  selectedPermissions: PermissionType[] = [];
  isEditMode = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPermissions();
    this.userId = Number(this.route.snapshot.params['id']);

    if (this.userId) {
      this.isEditMode = true;
      this.loadUser(this.userId);
      // Make password optional in edit mode
      this.userForm.get('password')?.setValidators(null);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  loadPermissions(): void {
    this.userService.getPermissions().subscribe({
      next: (permissions) => this.permissions = permissions,
      error: (error) => alert('Error loading permissions')
    });}

    loadUser(id: number): void {
      this.userService.getUser(id).subscribe({
        next: (user) => {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          });
          this.selectedPermissions = user.permissionTypes;
        },
        error: (error) => alert('Error loading user')
      });
    }

    isPermissionSelected(permission: PermissionType): boolean {
      return this.selectedPermissions.some(p => p.id === permission.id);
    }

    onPermissionChange(event: any, permission: PermissionType): void {
      if (event.target.checked) {
      this.selectedPermissions.push(permission);
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(p => p.id !== permission.id);
    }
  }

    onSubmit(): void {
      if (this.userForm.valid) {
      const userData = {
        ...this.userForm.value,
        roles: this.selectedPermissions
      };

        if (this.isEditMode && !userData.password) {
          delete userData.password;  // Remove password if it's empty
        }

        if (this.isEditMode && this.userId) {
          this.userService.updateUser(this.userId, userData).subscribe({
            next: (response) => {
              alert('User updated successfully');
              this.router.navigate(['/users']);
            },
            error: (error) => {
              console.error('Update error:', error);  // Log for debugging
              alert('Error updating user');
            }
          });
        } else {
          this.userService.createUser(userData).subscribe({
            next: (response) => {
              alert('User created successfully');
              this.router.navigate(['/users']);
            },
            error: (error) => {
              console.error('Create error:', error);  // Log for debugging
              alert('Error creating user');
            }
          });
        }

      }
  }

    cancel(): void {
      this.router.navigate(['/users']);
    }
  }

