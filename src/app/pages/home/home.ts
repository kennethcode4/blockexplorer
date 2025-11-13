import { Component } from '@angular/core';
import { LatestBlock } from '../../components/latest-block/latest-block';

@Component({
  selector: 'app-home',
  imports: [LatestBlock],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
