import { CalendarModule } from './calendar.module';

export default {
  title: 'Calendar'
}

const moduleMetadata = {
  imports: [CalendarModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <ui-calendar></ui-calendar>
  `,
  props: {
  }
})
