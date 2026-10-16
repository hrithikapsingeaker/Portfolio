import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { FormSubmissionSummary } from '../../models/portfolio.model';

@Component({
  selector: 'app-forms-hub',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <section id="forms-hub" class="forms-hub-section">
      <div class="container">
        
        <div class="section-header">
          <div class="section-tag">
            <i class="fa-solid fa-bolt-lightning"></i> Communication Suite
          </div>
          <h2>Interactive <span class="gradient-text">Forms & Collaboration Hub</span></h2>
          <p>
            Whether you are extending an employment offer, scheduling an interview, requesting a project proposal, or submitting a peer endorsement—select a dedicated form below.
          </p>
        </div>

        <!-- Form Switcher Navigation Tabs -->
        <div class="form-navigation-tabs">
          <button 
            type="button" 
            class="tab-nav-btn" 
            [class.active]="activeFormTab === 'contact'" 
            (click)="setTab('contact')">
            <div class="tab-btn-icon icon-cyan"><i class="fa-solid fa-envelope"></i></div>
            <div class="tab-btn-text">
              <span class="tab-title">Quick Contact</span>
              <span class="tab-desc">Direct inquiry & messages</span>
            </div>
          </button>


          <button 
            type="button" 
            class="tab-nav-btn" 
            [class.active]="activeFormTab === 'consultation'" 
            (click)="setTab('consultation')">
            <div class="tab-btn-icon icon-green"><i class="fa-solid fa-calendar-check"></i></div>
            <div class="tab-btn-text">
              <span class="tab-title">Schedule Interview / Call</span>
              <span class="tab-desc">1-on-1 slot reservation</span>
            </div>
          </button>

          <button 
            type="button" 
            class="tab-nav-btn" 
            [class.active]="activeFormTab === 'recommendation'" 
            (click)="setTab('recommendation')">
            <div class="tab-btn-icon icon-amber"><i class="fa-solid fa-star"></i></div>
            <div class="tab-btn-text">
              <span class="tab-title">Leave Endorsement</span>
              <span class="tab-desc">Peer review & rating</span>
            </div>
          </button>

          <button 
            type="button" 
            class="tab-nav-btn" 
            [class.active]="activeFormTab === 'activity'" 
            (click)="setTab('activity')">
            <div class="tab-btn-icon icon-blue"><i class="fa-solid fa-clock-rotate-left"></i></div>
            <div class="tab-btn-text">
              <span class="tab-title">Submissions Wall</span>
              <span class="tab-desc">Live activity log</span>
            </div>
          </button>
        </div>

        <!-- FORM CONTAINER CARD -->
        <div class="form-display-card glass-card">
          
          <!-- ================= FORM 1: QUICK CONTACT ================= -->
          <div *ngIf="activeFormTab === 'contact'" class="form-pane">
            <div class="form-header-bar">
              <div class="badge badge-cyan"><i class="fa-solid fa-paper-plane"></i> Form 1 of 4</div>
              <h3>Send a Direct Message to Hrithik</h3>
              <p>Fill out this form and Hrithik will get back to you via your preferred communication channel.</p>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="onContactSubmit()" class="styled-form">
              <div class="form-grid-2">
                
                <div class="form-group">
                  <label for="c-name"><i class="fa-regular fa-user"></i> Your Full Name *</label>
                  <input 
                    id="c-name" 
                    type="text" 
                    formControlName="fullName" 
                    placeholder="e.g. Rahul Sharma"
                    class="form-control"
                    [class.is-invalid]="contactForm.get('fullName')?.touched && contactForm.get('fullName')?.invalid"
                  />
                  <small *ngIf="contactForm.get('fullName')?.touched && contactForm.get('fullName')?.invalid" class="validation-error">
                    Please provide your name (minimum 2 characters).
                  </small>
                </div>

                <div class="form-group">
                  <label for="c-email"><i class="fa-regular fa-envelope"></i> Email Address *</label>
                  <input 
                    id="c-email" 
                    type="email" 
                    formControlName="email" 
                    placeholder="e.g. rahul@example.com"
                    class="form-control"
                    [class.is-invalid]="contactForm.get('email')?.touched && contactForm.get('email')?.invalid"
                  />
                  <small *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.invalid" class="validation-error">
                    Please enter a valid email address.
                  </small>
                </div>

              </div>

              <div class="form-group">
                <label for="c-pref"><i class="fa-solid fa-envelope"></i> Preferred Communication Channel</label>
                <select id="c-pref" formControlName="preferredContact" class="form-control">
                  <option value="email">Direct Email (apsingekarhrithik&#64;gmail.com)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="c-subject"><i class="fa-solid fa-heading"></i> Subject *</label>
                <input 
                  id="c-subject" 
                  type="text" 
                  formControlName="subject" 
                  placeholder="e.g. Job Opportunity: Full Stack .NET Developer"
                  class="form-control"
                  [class.is-invalid]="contactForm.get('subject')?.touched && contactForm.get('subject')?.invalid"
                />
                <small *ngIf="contactForm.get('subject')?.touched && contactForm.get('subject')?.invalid" class="validation-error">
                  Subject is required.
                </small>
              </div>

              <div class="form-group">
                <label for="c-msg"><i class="fa-regular fa-message"></i> Detailed Message *</label>
                <textarea 
                  id="c-msg" 
                  rows="5" 
                  formControlName="message" 
                  placeholder="Share details about the role, technical requirements, or your query..."
                  class="form-control"
                  [class.is-invalid]="contactForm.get('message')?.touched && contactForm.get('message')?.invalid"
                ></textarea>
                <small *ngIf="contactForm.get('message')?.touched && contactForm.get('message')?.invalid" class="validation-error">
                  Message must be at least 10 characters long.
                </small>
              </div>

              <div class="form-actions">
                <button type="submit" [disabled]="contactForm.invalid || submitting" class="btn btn-primary btn-lg">
                  <i class="fa-solid fa-paper-plane"></i>
                  <span>{{ submitting ? 'Dispatching Message...' : 'Send Message Now' }}</span>
                </button>
                <button type="button" (click)="contactForm.reset({ preferredContact: 'email' })" class="btn btn-secondary">
                  <i class="fa-solid fa-rotate-left"></i> Reset Form
                </button>
              </div>
            </form>
          </div>

          <!-- ================= FORM 2: SCHEDULE 1-ON-1 CONSULTATION ================= -->
          <div *ngIf="activeFormTab === 'consultation'" class="form-pane">
            <div class="form-header-bar">
              <div class="badge badge-green"><i class="fa-solid fa-calendar-check"></i> Form 2 of 3</div>
              <h3>Schedule a 1-on-1 Consultation or Technical Interview</h3>
              <p>Reserve a dedicated time slot to interview Hrithik or discuss your system architecture in detail.</p>
            </div>

            <form [formGroup]="consultationForm" (ngSubmit)="onConsultationSubmit()" class="styled-form">
              
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="cs-name"><i class="fa-regular fa-user"></i> Your Name *</label>
                  <input 
                    id="cs-name" 
                    type="text" 
                    formControlName="fullName" 
                    placeholder="e.g. Vikram Joshi"
                    class="form-control"
                    [class.is-invalid]="consultationForm.get('fullName')?.touched && consultationForm.get('fullName')?.invalid"
                  />
                  <small *ngIf="consultationForm.get('fullName')?.touched && consultationForm.get('fullName')?.invalid" class="validation-error">
                    Name is required.
                  </small>
                </div>

                <div class="form-group">
                  <label for="cs-email"><i class="fa-regular fa-envelope"></i> Email Address *</label>
                  <input 
                    id="cs-email" 
                    type="email" 
                    formControlName="email" 
                    placeholder="e.g. vikram@techrecruiters.com"
                    class="form-control"
                    [class.is-invalid]="consultationForm.get('email')?.touched && consultationForm.get('email')?.invalid"
                  />
                  <small *ngIf="consultationForm.get('email')?.touched && consultationForm.get('email')?.invalid" class="validation-error">
                    Valid email address required.
                  </small>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label for="cs-org"><i class="fa-regular fa-building"></i> Organization / Hiring Entity *</label>
                  <input 
                    id="cs-org" 
                    type="text" 
                    formControlName="organization" 
                    placeholder="e.g. TechCorp Solutions"
                    class="form-control"
                    [class.is-invalid]="consultationForm.get('organization')?.touched && consultationForm.get('organization')?.invalid"
                  />
                  <small *ngIf="consultationForm.get('organization')?.touched && consultationForm.get('organization')?.invalid" class="validation-error">
                    Organization name is required.
                  </small>
                </div>

                <div class="form-group">
                  <label for="cs-purpose"><i class="fa-solid fa-bullseye"></i> Meeting Purpose *</label>
                  <select id="cs-purpose" formControlName="purpose" class="form-control">
                    <option value="technical-interview">Technical Interview (.NET / Full-Stack)</option>
                    <option value="freelance-contract">Contract / Freelance Project Briefing</option>
                    <option value="architecture-discussion">Database & System Architecture Consultation</option>
                    <option value="mentorship">Peer Code Review & Technical Exchange</option>
                  </select>
                </div>
              </div>

              <div class="form-grid-3">
                <div class="form-group">
                  <label for="cs-date"><i class="fa-regular fa-calendar"></i> Preferred Date *</label>
                  <input 
                    id="cs-date" 
                    type="date" 
                    formControlName="preferredDate" 
                    class="form-control"
                    [class.is-invalid]="consultationForm.get('preferredDate')?.touched && consultationForm.get('preferredDate')?.invalid"
                  />
                  <small *ngIf="consultationForm.get('preferredDate')?.touched && consultationForm.get('preferredDate')?.invalid" class="validation-error">
                    Select a date.
                  </small>
                </div>

                <div class="form-group">
                  <label for="cs-slot"><i class="fa-regular fa-clock"></i> Preferred Time Window *</label>
                  <select id="cs-slot" formControlName="timeSlot" class="form-control">
                    <option value="morning">Morning Slot (10:00 AM – 01:00 PM IST)</option>
                    <option value="afternoon">Afternoon Slot (02:00 PM – 05:00 PM IST)</option>
                    <option value="evening">Evening Slot (06:00 PM – 09:00 PM IST)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="cs-platform"><i class="fa-solid fa-video"></i> Video Platform *</label>
                  <select id="cs-platform" formControlName="meetingPlatform" class="form-control">
                    <option value="google-meet">Google Meet</option>
                    <option value="microsoft-teams">Microsoft Teams</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="cs-agenda"><i class="fa-regular fa-note-sticky"></i> Agenda & Discussion Topics *</label>
                <textarea 
                  id="cs-agenda" 
                  rows="3" 
                  formControlName="agendaNotes" 
                  placeholder="Outline topics to cover (e.g. C# WinForms experience, Stored Procedure tuning, team fit, or architecture questions)..."
                  class="form-control"
                  [class.is-invalid]="consultationForm.get('agendaNotes')?.touched && consultationForm.get('agendaNotes')?.invalid"
                ></textarea>
                <small *ngIf="consultationForm.get('agendaNotes')?.touched && consultationForm.get('agendaNotes')?.invalid" class="validation-error">
                  Agenda is required (min 10 characters).
                </small>
              </div>

              <div class="form-actions">
                <button type="submit" [disabled]="consultationForm.invalid || submitting" class="btn btn-primary btn-lg">
                  <i class="fa-solid fa-calendar-check"></i>
                  <span>Confirm Slot Reservation</span>
                </button>
                <button type="button" (click)="consultationForm.reset({ purpose: 'technical-interview', timeSlot: 'afternoon', meetingPlatform: 'google-meet' })" class="btn btn-secondary">
                  <i class="fa-solid fa-rotate-left"></i> Reset
                </button>
              </div>

            </form>
          </div>

          <!-- ================= FORM 4: LEAVE RECOMMENDATION & ENDORSEMENT ================= -->
          <div *ngIf="activeFormTab === 'recommendation'" class="form-pane">
            <div class="form-header-bar">
              <div class="badge badge-purple"><i class="fa-solid fa-star"></i> Form 4 of 4</div>
              <h3>Colleague, Mentor & Client Endorsement</h3>
              <p>Have you collaborated with Hrithik at Tweak Software, university, or on a project? Leave your feedback!</p>
            </div>

            <form [formGroup]="recommendationForm" (ngSubmit)="onRecommendationSubmit()" class="styled-form">
              
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="rc-name"><i class="fa-regular fa-user"></i> Your Name *</label>
                  <input 
                    id="rc-name" 
                    type="text" 
                    formControlName="recommenderName" 
                    placeholder="e.g. Amit Patil"
                    class="form-control"
                    [class.is-invalid]="recommendationForm.get('recommenderName')?.touched && recommendationForm.get('recommenderName')?.invalid"
                  />
                  <small *ngIf="recommendationForm.get('recommenderName')?.touched && recommendationForm.get('recommenderName')?.invalid" class="validation-error">
                    Your name is required.
                  </small>
                </div>

                <div class="form-group">
                  <label for="rc-title"><i class="fa-solid fa-id-badge"></i> Your Role & Title *</label>
                  <input 
                    id="rc-title" 
                    type="text" 
                    formControlName="designation" 
                    placeholder="e.g. Senior Software Architect"
                    class="form-control"
                    [class.is-invalid]="recommendationForm.get('designation')?.touched && recommendationForm.get('designation')?.invalid"
                  />
                  <small *ngIf="recommendationForm.get('designation')?.touched && recommendationForm.get('designation')?.invalid" class="validation-error">
                    Designation is required.
                  </small>
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label for="rc-org"><i class="fa-regular fa-building"></i> Company or Institution *</label>
                  <input 
                    id="rc-org" 
                    type="text" 
                    formControlName="organization" 
                    placeholder="e.g. Tweak Software / SRTMUN"
                    class="form-control"
                    [class.is-invalid]="recommendationForm.get('organization')?.touched && recommendationForm.get('organization')?.invalid"
                  />
                  <small *ngIf="recommendationForm.get('organization')?.touched && recommendationForm.get('organization')?.invalid" class="validation-error">
                    Company/Organization is required.
                  </small>
                </div>

                <div class="form-group">
                  <label for="rc-rel"><i class="fa-solid fa-users"></i> Relationship with Hrithik *</label>
                  <select id="rc-rel" formControlName="relationship" class="form-control">
                    <option value="colleague">Team Member / Colleague</option>
                    <option value="senior-dev">Senior Software Engineer / Tech Lead</option>
                    <option value="manager">Engineering Manager</option>
                    <option value="client">Client / Product Owner</option>
                    <option value="mentor">Academic Mentor / Professor</option>
                  </select>
                </div>
              </div>

              <!-- Star Rating Interactive Selector -->
              <div class="form-group">
                <label><i class="fa-solid fa-star text-amber"></i> Star Rating Endorsement *</label>
                <div class="star-rating-picker">
                  <button 
                    type="button" 
                    *ngFor="let star of [1, 2, 3, 4, 5]" 
                    (click)="setRating(star)" 
                    class="star-btn"
                    [class.active]="star <= currentRating">
                    <i class="fa-solid fa-star"></i>
                  </button>
                  <span class="rating-label">{{ currentRating }} of 5 Stars — {{ getRatingText(currentRating) }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="rc-proj"><i class="fa-solid fa-code-commit"></i> Project or Area Endorsed *</label>
                <input 
                  id="rc-proj" 
                  type="text" 
                  formControlName="projectWorkedOn" 
                  placeholder="e.g. T HomeConnect / SQL Server Performance / ASP.NET MVC"
                  class="form-control"
                  [class.is-invalid]="recommendationForm.get('projectWorkedOn')?.touched && recommendationForm.get('projectWorkedOn')?.invalid"
                />
                <small *ngIf="recommendationForm.get('projectWorkedOn')?.touched && recommendationForm.get('projectWorkedOn')?.invalid" class="validation-error">
                  Please name the skill or project.
                </small>
              </div>

              <div class="form-group">
                <label for="rc-feedback"><i class="fa-regular fa-comment-dots"></i> Endorsement & Testimonial Remarks *</label>
                <textarea 
                  id="rc-feedback" 
                  rows="4" 
                  formControlName="feedbackText" 
                  placeholder="Describe your experience collaborating with Hrithik, technical competencies, work ethic, and results achieved..."
                  class="form-control"
                  [class.is-invalid]="recommendationForm.get('feedbackText')?.touched && recommendationForm.get('feedbackText')?.invalid"
                ></textarea>
                <small *ngIf="recommendationForm.get('feedbackText')?.touched && recommendationForm.get('feedbackText')?.invalid" class="validation-error">
                  Endorsement text must be at least 15 characters long.
                </small>
              </div>

              <div class="form-actions">
                <button type="submit" [disabled]="recommendationForm.invalid || submitting" class="btn btn-primary btn-lg">
                  <i class="fa-solid fa-award"></i>
                  <span>Publish Recommendation</span>
                </button>
                <button type="button" (click)="resetRecommendationForm()" class="btn btn-secondary">
                  <i class="fa-solid fa-rotate-left"></i> Reset
                </button>
              </div>

            </form>
          </div>

          <!-- ================= TAB 5: SUBMISSIONS & ACTIVITY WALL ================= -->
          <div *ngIf="activeFormTab === 'activity'" class="form-pane">
            <div class="activity-header">
              <div>
                <h3>Submissions & Endorsement Wall</h3>
                <p>Real-time log of inquiries, quote proposals, scheduled interviews, and community recommendations.</p>
              </div>
              <button (click)="portfolioService.clearSubmissions()" class="btn btn-outline btn-sm">
                <i class="fa-solid fa-trash-can"></i> Clear History
              </button>
            </div>

            <div class="submissions-list" *ngIf="(portfolioService.submissions$ | async) as list">
              <div *ngIf="list.length === 0" class="empty-state">
                <i class="fa-regular fa-folder-open empty-icon"></i>
                <h4>No Submissions Yet</h4>
                <p>Try submitting any of the 4 forms above to see live updates recorded here!</p>
              </div>

              <div *ngFor="let item of list" class="submission-card">
                <div class="sub-card-top">
                  <div class="sub-type-badge" [style.borderColor]="item.badgeColor" [style.color]="item.badgeColor">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>{{ item.formType }}</span>
                  </div>
                  <span class="sub-date">{{ item.date | date:'medium' }}</span>
                </div>

                <div class="sub-card-body">
                  <h4 class="sub-author">{{ item.name }}</h4>
                  <span class="sub-meta">{{ item.email }}</span>
                  <p class="sub-summary">{{ item.summary }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .forms-hub-section {
      padding: 95px 0;
      position: relative;
      background: #121212;
    }
    .form-navigation-tabs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-bottom: 30px;
      width: 100%;
    }
    .tab-nav-btn {
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-sm);
      padding: 16px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      text-align: left;
      transition: all 0.25s ease;
      color: #A3A3A3;
      user-select: none;
    }
    .tab-nav-btn * {
      pointer-events: none;
    }
    .tab-nav-btn:hover {
      border-color: var(--primary-orange);
      background: #252525;
      color: #FFFFFF;
      transform: translateY(-2px);
    }
    .tab-nav-btn.active {
      background: var(--primary-orange);
      border-color: var(--primary-orange);
      color: #FFFFFF;
      box-shadow: 0 4px 16px rgba(253, 111, 0, 0.35);
    }
    .tab-btn-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
    }
    .tab-nav-btn.active .tab-btn-icon {
      background: rgba(0, 0, 0, 0.2);
      color: #FFFFFF;
    }
    .tab-btn-text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .tab-title {
      font-weight: 700;
      font-size: 0.94rem;
      color: inherit;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .tab-desc {
      font-size: 0.74rem;
      opacity: 0.8;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .form-display-card {
      padding: 42px 48px;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
    }
    .form-pane {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .form-header-bar {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 20px;
    }
    .form-header-bar h3 {
      font-size: 1.65rem;
      color: #FFFFFF;
      margin: 10px 0 6px 0;
    }
    .form-header-bar p {
      font-size: 0.95rem;
      color: #A3A3A3;
    }

    .styled-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .form-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .form-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-group label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .form-group label i {
      color: var(--primary-orange);
      font-size: 0.9rem;
    }
    .form-control {
      width: 100%;
      padding: 13px 18px;
      background: #262626;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-sm);
      color: #FFFFFF;
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;
    }
    .form-control:focus {
      border-color: var(--primary-orange);
      box-shadow: 0 0 12px rgba(253, 111, 0, 0.3);
      background: #2a2a2a;
    }
    .form-control.is-invalid {
      border-color: #f43f5e;
      background: rgba(244, 63, 94, 0.05);
    }
    select.form-control {
      cursor: pointer;
    }
    select.form-control option {
      background: #1E1E1E;
      color: #FFFFFF;
    }
    textarea.form-control {
      resize: vertical;
      min-height: 90px;
    }
    .validation-error {
      color: #fb7185;
      font-size: 0.78rem;
    }

    /* Checkbox Grid */
    .checkbox-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      padding: 16px;
      background: #252525;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: #A3A3A3;
      cursor: pointer;
      user-select: none;
    }
    .custom-checkbox input {
      display: none;
    }
    .chk-box {
      width: 18px;
      height: 18px;
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      background: #1E1E1E;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .custom-checkbox input:checked + .chk-box {
      background: var(--primary-orange);
      border-color: var(--primary-orange);
    }
    .custom-checkbox input:checked + .chk-box::after {
      content: '✓';
      color: #FFFFFF;
      font-weight: 900;
      font-size: 0.75rem;
    }

    /* Calculator Box */
    .quote-calculator-box {
      background: rgba(253, 111, 0, 0.08);
      border: 1px solid rgba(253, 111, 0, 0.25);
      border-radius: var(--radius-sm);
      padding: 18px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .calc-header {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      gap: 8px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .calc-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .calc-metric {
      display: flex;
      flex-direction: column;
    }
    .cm-label {
      font-size: 0.75rem;
      color: #A3A3A3;
    }
    .cm-val {
      font-size: 1.1rem;
      font-weight: 700;
      color: #FFFFFF;
      font-family: var(--font-heading);
    }
    .text-cyan { color: var(--primary-orange); }
    .text-purple { color: #FFA552; }
    .text-green { color: #34d399; }
    .text-amber { color: var(--primary-orange); }

    /* Star rating */
    .star-rating-picker {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #252525;
      padding: 12px 18px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .star-btn {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.15s ease;
      padding: 0 3px;
    }
    .star-btn:hover,
    .star-btn.active {
      color: var(--primary-orange);
      transform: scale(1.15);
    }
    .rating-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #FFFFFF;
      margin-left: 8px;
    }

    .form-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 10px;
    }

    /* Activity Wall */
    .activity-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 16px;
    }
    .activity-header h3 {
      font-size: 1.5rem;
      margin-bottom: 4px;
      color: #FFFFFF;
    }
    .submissions-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .submission-card {
      background: #252525;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-sm);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sub-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sub-type-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 1px solid var(--primary-orange);
      color: var(--primary-orange);
      padding: 3px 12px;
      border-radius: var(--radius-full);
      background: var(--primary-orange-light);
    }
    .sub-date {
      font-size: 0.78rem;
      color: #737373;
      font-family: var(--font-mono);
    }
    .sub-author {
      font-size: 1.1rem;
      color: #FFFFFF;
    }
    .sub-meta {
      font-size: 0.82rem;
      color: #A3A3A3;
    }
    .sub-summary {
      font-size: 0.92rem;
      line-height: 1.5;
      color: #CCCCCC;
      margin-top: 4px;
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #737373;
    }
    .empty-icon {
      font-size: 3rem;
      margin-bottom: 12px;
      opacity: 0.4;
    }

    @media (max-width: 1024px) {
      .form-navigation-tabs {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 768px) {
      .form-navigation-tabs {
        grid-template-columns: 1fr;
      }
      .form-display-card {
        padding: 26px 20px;
      }
      .form-grid-2,
      .form-grid-3,
      .checkbox-grid,
      .calc-metrics {
        grid-template-columns: 1fr;
      }
      .form-actions {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class FormsHubComponent implements OnInit {
  @Input() set initialTab(val: string | undefined) {
    if (val && ['contact', 'quote', 'consultation', 'recommendation', 'activity'].includes(val)) {
      this.activeFormTab = val;
    }
  }

  activeFormTab: string = 'contact';
  submitting = false;

  // Form Groups
  contactForm!: FormGroup;
  quoteForm!: FormGroup;
  consultationForm!: FormGroup;
  recommendationForm!: FormGroup;

  // Quote Feature Checklist
  availableFeatures: string[] = [
    'Role-Based Access Control (RBAC)',
    'Normalized SQL Server Architecture',
    'High-Performance Stored Procedures & Views',
    'Responsive HTML5/Bootstrap Frontend',
    'Automated IIS Deployment Setup',
    'Data Validation & Security Auditing'
  ];
  selectedFeatures: string[] = [
    'Role-Based Access Control (RBAC)',
    'Normalized SQL Server Architecture',
    'High-Performance Stored Procedures & Views'
  ];

  // Live Calculator State
  estimatedComplexity: string = 'High Enterprise';
  estimatedDays: number = 18;

  // Star Rating for Endorsements
  currentRating = 5;

  constructor(
    private fb: FormBuilder,
    public portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.initContactForm();
    this.initQuoteForm();
    this.initConsultationForm();
    this.initRecommendationForm();
    this.recalculateEstimate();
  }

  setTab(tab: string): void {
    this.activeFormTab = tab;
  }

  // Initializers
  private initContactForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      preferredContact: ['email', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private initQuoteForm(): void {
    this.quoteForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(2)]],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      projectType: ['web-mvc', Validators.required],
      budgetRange: ['Tier 2 (₹50,000 - ₹1,50,000)', Validators.required],
      timeline: ['1 Month', Validators.required],
      projectBrief: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  private initConsultationForm(): void {
    // Tomorrow as default date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    this.consultationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      organization: ['', [Validators.required, Validators.minLength(2)]],
      purpose: ['technical-interview', Validators.required],
      preferredDate: [dateStr, Validators.required],
      timeSlot: ['afternoon', Validators.required],
      meetingPlatform: ['google-meet', Validators.required],
      agendaNotes: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private initRecommendationForm(): void {
    this.recommendationForm = this.fb.group({
      recommenderName: ['', [Validators.required, Validators.minLength(2)]],
      designation: ['', [Validators.required, Validators.minLength(2)]],
      organization: ['', [Validators.required, Validators.minLength(2)]],
      relationship: ['colleague', Validators.required],
      projectWorkedOn: ['ASP.NET MVC & SQL Server Modules', [Validators.required, Validators.minLength(3)]],
      feedbackText: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  // Quote Feature Checklist & Live Estimate
  toggleFeature(feature: string): void {
    const idx = this.selectedFeatures.indexOf(feature);
    if (idx > -1) {
      this.selectedFeatures.splice(idx, 1);
    } else {
      this.selectedFeatures.push(feature);
    }
    this.recalculateEstimate();
  }

  recalculateEstimate(): void {
    let baseDays = 10;
    const type = this.quoteForm?.get('projectType')?.value;
    if (type === 'fullstack-net') baseDays = 22;
    else if (type === 'web-mvc') baseDays = 15;
    else if (type === 'desktop-winforms') baseDays = 14;
    else if (type === 'database-arch') baseDays = 10;

    const addedDays = this.selectedFeatures.length * 2;
    this.estimatedDays = baseDays + addedDays;

    if (this.estimatedDays > 20) {
      this.estimatedComplexity = 'High Enterprise Level';
    } else if (this.estimatedDays > 14) {
      this.estimatedComplexity = 'Medium-High Business Tier';
    } else {
      this.estimatedComplexity = 'Agile Sprint Scope';
    }
  }

  resetQuoteForm(): void {
    this.quoteForm.reset({
      projectType: 'web-mvc',
      budgetRange: 'Tier 2 (₹50,000 - ₹1,50,000)',
      timeline: '1 Month'
    });
    this.selectedFeatures = [
      'Role-Based Access Control (RBAC)',
      'Normalized SQL Server Architecture'
    ];
    this.recalculateEstimate();
  }

  // Star Rating
  setRating(rating: number): void {
    this.currentRating = rating;
  }

  getRatingText(rating: number): string {
    switch (rating) {
      case 5: return 'Outstanding / Exceptional Proficiency';
      case 4: return 'Very Strong / Highly Recommended';
      case 3: return 'Good / Reliable Delivery';
      case 2: return 'Fair';
      default: return 'Adequate';
    }
  }

  resetRecommendationForm(): void {
    this.currentRating = 5;
    this.recommendationForm.reset({
      relationship: 'colleague',
      projectWorkedOn: 'ASP.NET MVC & SQL Server Modules'
    });
  }

  // Form Submissions
  onContactSubmit(): void {
    if (this.contactForm.invalid) return;
    this.submitting = true;
    setTimeout(() => {
      this.portfolioService.submitContact(this.contactForm.value);
      this.contactForm.reset({ preferredContact: 'email' });
      this.submitting = false;
      this.activeFormTab = 'activity';
    }, 600);
  }

  onQuoteSubmit(): void {
    if (this.quoteForm.invalid) return;
    this.submitting = true;
    setTimeout(() => {
      const data = {
        ...this.quoteForm.value,
        requiredFeatures: [...this.selectedFeatures],
        estimatedEstimate: {
          estDays: this.estimatedDays,
          complexityLevel: this.estimatedComplexity
        }
      };
      this.portfolioService.submitProjectQuote(data);
      this.resetQuoteForm();
      this.submitting = false;
      this.activeFormTab = 'activity';
    }, 600);
  }

  onConsultationSubmit(): void {
    if (this.consultationForm.invalid) return;
    this.submitting = true;
    setTimeout(() => {
      this.portfolioService.submitConsultation(this.consultationForm.value);
      this.consultationForm.reset({
        purpose: 'technical-interview',
        timeSlot: 'afternoon',
        meetingPlatform: 'google-meet'
      });
      this.submitting = false;
      this.activeFormTab = 'activity';
    }, 600);
  }

  onRecommendationSubmit(): void {
    if (this.recommendationForm.invalid) return;
    this.submitting = true;
    setTimeout(() => {
      const data = {
        ...this.recommendationForm.value,
        rating: this.currentRating
      };
      this.portfolioService.submitRecommendation(data);
      this.resetRecommendationForm();
      this.submitting = false;
      this.activeFormTab = 'activity';
    }, 600);
  }
}
