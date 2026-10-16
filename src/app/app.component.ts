import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FormsHubComponent } from './components/forms-hub/forms-hub.component';
import { ResumeViewerComponent } from './components/resume-viewer/resume-viewer.component';
import { ToastComponent } from './components/toast/toast.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    FormsHubComponent,
    ResumeViewerComponent,
    ToastComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hrithik Apsingekar - Full Stack .NET Developer Portfolio';
  selectedFormTab: string = 'contact';

  @ViewChild(FormsHubComponent) formsHub!: FormsHubComponent;

  onFormSelect(formType: string): void {
    this.selectedFormTab = formType;
    if (this.formsHub) {
      this.formsHub.setTab(formType);
    }
    const target = document.getElementById('forms-hub');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onProjectFormSelect(event: { formType: string; context?: any }): void {
    this.selectedFormTab = event.formType;
    if (this.formsHub) {
      this.formsHub.setTab(event.formType);
      if (event.context && this.formsHub.quoteForm) {
        if (event.context.projectType) {
          this.formsHub.quoteForm.patchValue({
            projectType: event.context.projectType,
            projectBrief: event.context.notes
          });
          this.formsHub.recalculateEstimate();
        }
      }
    }
    const target = document.getElementById('forms-hub');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
