import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { LatestBlock } from './components/latest-block/latest-block';

@Component({
  selector: 'app-root',
  imports: [LatestBlock],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  onBlocksLoaded() {
    console.log('🎉 Los bloques se cargaron correctamente al entrar en el viewport');
  }
}
