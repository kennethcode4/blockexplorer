import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ethereum } from '../../services/ethereum';
import { CommonModule } from '@angular/common';
import { Block } from 'alchemy-sdk';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { MinerNamePipe } from '../../pipes/miner-name-pipe';

@Component({
  selector: 'app-last-block',
  imports: [CommonModule, TimeAgoPipe, MinerNamePipe],
  templateUrl: './latest-block.html',
  styleUrl: './latest-block.scss',
})
export class LatestBlock implements AfterViewInit {
  @Output() loaded = new EventEmitter<void>();

  blocks: Block[] = [];
  loading = true;
  error: string | null = null;

  constructor(private eth: Ethereum) {}

  async ngAfterViewInit() {
    try {
      this.blocks = await this.eth.getLatestBlocks(10);
      this.loading = false;
      this.loaded.emit();
    } catch (err: any) {
      this.error = err.message;
      this.loading = false;
    }
  }

  // loadBlocks() {
  //   try {
  //     this.blocks = await this.eth.getLatestBlocks();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
