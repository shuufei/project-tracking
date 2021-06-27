import { ComponentHarness } from '@angular/cdk/testing';

export class ProjectListPageComponentHarness extends ComponentHarness {
  static hostSelector = 'bis-project-list-page';

  private projects = this.locatorForAll('ui-project-card');

  async getProjectElements() {
    return this.projects();
  }
}
