import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './';

const pipes = [SafeHtmlPipe];

@NgModule({
  declarations: pipes,
  imports: [],
  exports: pipes,
})
export class PipesModule {}
