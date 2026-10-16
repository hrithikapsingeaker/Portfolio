import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, ToastMessage } from '../../services/portfolio.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="portfolioService.toast$ | async as toast" class="toast-wrapper">
      <div class="toast-content">
        <div class="toast-icon">
          <i class="fa-solid" [ngClass]="{
            'fa-circle-check': toast.type === 'success',
            'fa-circle-info': toast.type === 'info',
            'fa-triangle-exclamation': toast.type === 'warning',
            'fa-circle-xmark': toast.type === 'error'
          }"></i>
        </div>
        <div class="toast-body">
          <h4 class="toast-title">{{ toast.title }}</h4>
          <p class="toast-msg">{{ toast.message }}</p>
        </div>
        <button class="toast-close" (click)="portfolioService.dismissToast()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="toast-progress"></div>
    </div>
  `,
  styles: [`
    .toast-wrapper {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 3000;
      min-width: 340px;
      max-width: 460px;
      background: #1E1E1E;
      border-radius: var(--radius-sm);
      border: 1px solid var(--primary-orange);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes slideIn {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .toast-content {
      padding: 16px 18px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .toast-icon {
      font-size: 1.3rem;
      margin-top: 2px;
      color: var(--primary-orange);
    }
    .toast-body {
      flex: 1;
    }
    .toast-title {
      font-size: 0.98rem;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 3px;
    }
    .toast-msg {
      font-size: 0.86rem;
      color: #CCCCCC;
      line-height: 1.4;
      margin: 0;
    }
    .toast-close {
      background: transparent;
      border: none;
      color: #737373;
      cursor: pointer;
      font-size: 0.9rem;
      padding: 4px;
    }
    .toast-close:hover {
      color: #FFFFFF;
    }
    .toast-progress {
      height: 3px;
      background: var(--primary-orange);
      animation: progressCountdown 5.5s linear forwards;
    }
    @keyframes progressCountdown {
      from { width: 100%; }
      to { width: 0%; }
    }

    @media (max-width: 600px) {
      .toast-wrapper {
        left: 20px;
        right: 20px;
        bottom: 20px;
        min-width: auto;
      }
    }
  `]
})
export class ToastComponent {
  constructor(public portfolioService: PortfolioService) {}
}
