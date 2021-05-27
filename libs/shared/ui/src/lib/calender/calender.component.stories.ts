import { CalenderModule } from './calender.module';

export default {
  title: 'Calender'
}

const moduleMetadata = {
  imports: [CalenderModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <ui-calender></ui-calender>
  `,
  props: {
  }
})
