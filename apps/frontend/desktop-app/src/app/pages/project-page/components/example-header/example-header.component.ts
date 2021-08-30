import { Component } from '@angular/core';

@Component({
  selector: 'bis-example-header',
  template: `
    <ui-header>
      <div left class="font-medium">TODO</div>
      <h1
        center
        class="text-center text-s1 text-black-default font-medium m-0 leading-normal"
      >
        EXAMPLE
      </h1>
      <div right class="flex items-center justify-end">RIGHT</div>
    </ui-header>
  `,
})
export class ExampleHeaderComponent {}
