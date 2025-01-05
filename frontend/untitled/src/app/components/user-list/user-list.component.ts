import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from "../../models/user";

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list-container">
      <div class="header">
        <h2>User Management</h2>
        <button
          *ngIf="canCreateUsers"
          (click)="navigateToCreate()"
          class="create-button">
          Add New User
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Permissions</th>
            <th *ngIf="canDeleteUsers">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let user of users">
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>
              <a *ngIf="canUpdateUsers"
                 [routerLink]="['/users', user.id, 'edit']"
                 class="edit-link">
                {{user.email}}
              </a>
              <span *ngIf="!canUpdateUsers">{{user.email}}</span>
            </td>
            <td>
                <span *ngFor="let permission of user.permissionTypes" class="permission-tag">
                  {{permission.title}}
                </span>
            </td>
            <td *ngIf="canDeleteUsers">
              <button
                (click)="deleteUser(user.id)"
                class="delete-button">
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .user-list-container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .table-container {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
    }
    .edit-link {
      color: #007bff;
      text-decoration: none;
    }
    .edit-link:hover {
      text-decoration: underline;
    }
    .delete-button {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .delete-button:hover {
      background-color: #c82333;
    }
    .permission-tag {
      display: inline-block;
      background-color: #e9ecef;
      padding: 2px 8px;
      margin: 2px;
      border-radius: 4px;
      font-size: 12px;
    }
    .create-button {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    .create-button:hover {
      background-color: #218838;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  canCreateUsers = false;
  canUpdateUsers = false;
  canDeleteUsers = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.checkPermissions();
  }

  checkPermissions(): void {
    this.canCreateUsers = this.authService.hasPermission('can_create');
    this.canUpdateUsers = this.authService.hasPermission('can_edit');
    this.canDeleteUsers = this.authService.hasPermission('can_delete');
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => alert('Error loading users')
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/users/create']);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          // Handle success response
          alert('User deleted successfully');
          window.location.reload();  // Refresh the page
        },
        error: (error) => {
          console.error('Delete error:', error);  // Log for debugging
          alert('Error deleting user');
        }
      });
    }
  }

}
