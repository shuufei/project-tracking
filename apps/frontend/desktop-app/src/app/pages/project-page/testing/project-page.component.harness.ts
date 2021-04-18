import { ComponentHarness } from '@angular/cdk/testing';

export class ProjectPageComponentHarness extends ComponentHarness {
  static hostSelector = 'bis-project-page';

  private projects = this.locatorForAll('li');

  async getProjectElements() {
    return this.projects();
  }
}
