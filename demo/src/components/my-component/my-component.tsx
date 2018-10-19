import { Component, Prop } from '@stencil/core';
import { Config } from '../../interface';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  @Prop({ context: 'config' }) config!: Config;
  
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  componentWillLoad() {
    console.log(this.config.get('color'));
  }

  format(): string {
    return (
      (this.first || '') +
      (this.middle ? ` ${this.middle}` : '') +
      (this.last ? ` ${this.last}` : '')
    );
  }

  render() {
    return <div>Hello, World! I'm {this.format()}</div>;
  }
}
